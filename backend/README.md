# HiringBooth_Backend

Here’s a **backend-specific README** for your project:

---

# Backend for Secure Web Application

This repository contains the **backend** code for a secure and scalable web application. The backend is designed to handle user authentication, authorization, and other essential functionalities while ensuring a systematic and secure implementation.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [Folder Structure](#folder-structure)
5. [Endpoints](#endpoints)
6. [License](#license)

---

## Features

- **User Authentication**:
  - Email OTP-based login and signup.
  - Secure password hashing and validation.
  - Password reset functionality.
- **Scalability**: Designed to support multiple users and global clients.
- **Secure Code Practices**: Follows industry best practices for secure backend development.

---

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (or any other DB used, e.g., PostgreSQL/MySQL)
- **Authentication**: JWT (JSON Web Tokens) for session management.
- **Security**:
  - bcrypt for password hashing.
  - CORS and rate-limiting for API protection.
- **Email Service**: Integration with a service like Nodemailer or SendGrid for OTP delivery.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB (or other database) running and accessible.
- Environment variables set up for sensitive credentials.

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the root directory with the following:

   ```env
   PORT=5000
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-secret-key>
   EMAIL_USER=<your-email-user>
   EMAIL_PASS=<your-email-password>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Folder Structure

```
src
├── controllers         # API request handlers
├── models              # Database schemas and models
├── routes              # API routes
├── middlewares         # Authentication and validation middlewares
├── services            # Business logic and helper functions
├── utils               # Utility functions and configurations
├── app.js              # Main Express application
└── server.js           # Entry point of the server
```

---

## Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login using email and OTP.
- **POST /api/auth/request-otp**: Send OTP to email.
- **POST /api/auth/reset-password**: Reset password for a user.

### User

- **GET /api/user/profile**: Fetch user profile details (requires authentication).

---

## Security Highlights

- **Password Security**: bcrypt is used for hashing passwords before storing them in the database.
- **Email Verification**: Email OTP system ensures secure account creation and login.
- **Token-Based Authentication**: JWT tokens are used to manage user sessions securely.
