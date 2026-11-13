'use strict';
// Node.js backend only. Never import this module from index.html.
const { randomBytes, scrypt, timingSafeEqual } = require('node:crypto');
const { promisify } = require('node:util');
const scryptAsync = promisify(scrypt);

const PREFIX = 'scrypt';
const KEY_LENGTH = 64;
const SALT_BYTES = 16;
const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_BYTES = 1024;

function validPassword(password) {
  return typeof password === 'string' &&
    password.length >= MIN_PASSWORD_LENGTH &&
    Buffer.byteLength(password, 'utf8') <= MAX_PASSWORD_BYTES;
}

async function hashPassword(password) {
  if (!validPassword(password)) {
    throw new TypeError('Password must be at least 12 characters and at most 1024 bytes.');
  }
  const salt = randomBytes(SALT_BYTES);
  const derived = await scryptAsync(password, salt, KEY_LENGTH);
  return `${PREFIX}$${salt.toString('hex')}$${derived.toString('hex')}`;
}

async function verifyPassword(password, storedHash) {
  if (typeof password !== 'string' || Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES ||
      typeof storedHash !== 'string') return false;
  const parts = storedHash.split('$');
  if (parts.length !== 3 || parts[0] !== PREFIX ||
      !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[a-f0-9]{128}$/.test(parts[2])) return false;
  const expected = Buffer.from(parts[2], 'hex');
  const actual = await scryptAsync(password, Buffer.from(parts[1], 'hex'), KEY_LENGTH);
  return timingSafeEqual(expected, actual);
}

module.exports = { hashPassword, verifyPassword, validPassword };
