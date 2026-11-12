# Train Reservation System

## Project Description

A web-based train reservation system developed as part of our Software Engineering course. The application allows passengers to view train schedules, create accounts, and book tickets. It also provides staff and administrators with tools to manage reservations, train schedules, and passenger records.

This repository contains the application source code, database setup, automated tests, and supporting documentation.

## Team Members

- Turki Al-Khalifah
- Omar Al-Muqhim
- Yazed Al-Harbi
- Khaled Al-Jweser
- Faisal Haddadi

## Why We Use GitHub

We use GitHub to collaborate on development, manage source code, track changes, and document team contributions. It also provides a shared location for testing resources and project documentation.

## Project Files

- `index.html` — User interface for passengers, staff, and administrators.
- `server.js` — Express server, authentication, and booking API.
- `train-schedules.js` — Train schedule retrieval and temporary connection failure handling.
- `package.json` — Project dependencies and commands.
- `package-lock.json` — Locked dependency versions for consistent installation.
- `.env.example` — Example environment variable configuration.
- `.gitignore` — Excludes dependencies and local environment files from Git.
- `database/002-simple-app.sql` — Database updates and functions for registration, booking, cancellation, and train management.
- `test/auth.test.js` — Authentication and authorization tests.
- `test/schedule-ui.test.js` — Schedule interface behavior tests.
- `test/train-schedules.test.js` — Schedule service and booking availability tests.
- `test-support/database.cjs` — Simulated database helper used by automated tests.
- `docs/LOCAL-SETUP.md` — Local installation and configuration instructions.
- `docs/R1-contingency.md` — Contingency plan for schedule connection failures.
- `docs/R1-rollback.md` — Rollback instructions for the schedule contingency changes.

## Installation and Testing

Install the required dependencies:

    npm ci

Run the automated tests:

    npm test

See `docs/LOCAL-SETUP.md` for environment configuration and application startup instructions.

## Project Link

https://train-reservation-system-6xaq.onrender.com
