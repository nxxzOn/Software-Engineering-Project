'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../password-security');

const PASSWORD = 'MetroSecure#2026';

test('TC01: password is not stored in plaintext', async () => {
  const hash = await hashPassword(PASSWORD);
  assert.match(hash, /^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/);
  assert.equal(hash.includes(PASSWORD), false);
});
test('TC02: correct password is accepted', async () => {
  const hash = await hashPassword(PASSWORD);
  assert.equal(await verifyPassword(PASSWORD, hash), true);
});
test('TC03: wrong password is rejected', async () => {
  const hash = await hashPassword(PASSWORD);
  assert.equal(await verifyPassword('WrongPassword#2026', hash), false);
});
test('TC04: same password produces different salted hashes', async () => {
  const a = await hashPassword(PASSWORD);
  const b = await hashPassword(PASSWORD);
  assert.notEqual(a, b);
  assert.equal(await verifyPassword(PASSWORD, b), true);
});
test('TC05: altered or malformed stored hash is rejected', async () => {
  const hash = await hashPassword(PASSWORD);
  const parts = hash.split('$');
  parts[2] = (parts[2][0] === 'a' ? 'b' : 'a') + parts[2].slice(1);
  assert.equal(await verifyPassword(PASSWORD, parts.join('$')), false);
  assert.equal(await verifyPassword(PASSWORD, 'not-a-hash'), false);
});
test('TC06: short passwords are rejected during registration', async () => {
  await assert.rejects(hashPassword('123456'), /at least 12/);
});
