# React.js Project with Tailwind CSS and Enhanced Security Features

This project is a modern web application built with **React.js** and **Tailwind CSS**. The project focuses on creating a responsive, secure, and user-friendly interface, incorporating best practices in web development.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [Folder Structure](#folder-structure)
5. [License](#license)

---

## Features

### Core Functionality

- **Frontend Framework:** React.js for building reusable components.
- **Styling:** Tailwind CSS for efficient and modern UI design.
- **Responsiveness:** Fully optimized for mobile and desktop users.

### Security Enhancements

- **Email OTP Login/Signup:** Secures user authentication through one-time passwords sent via email.
- **Reset Password Feature:** Enables users to securely reset their password.

### Customization

- **Theme:**
  - **Light Mode**: White and Blue (#004aad).
  - **Dark Mode**: Premium color palette complementing the light mode.

---

## Tech Stack

- **Frontend**: React.js with Vite as the development server.
- **Styling**: Tailwind CSS.
- **State Management**: React State/Context API.
- **Authentication**: Custom OTP-based authentication and password reset features.

---

## Setup Instructions

### Prerequisites

- Node.js installed on your system.
- Basic understanding of JavaScript, React, and Tailwind CSS.

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

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be running at [http://127.0.0.1:5173](http://127.0.0.1:5173).

---

## Folder Structure

```
src
├── components         # Reusable UI components
├── pages              # Main application pages
├── hooks              # Custom React hooks
├── utils              # Utility functions
├── services           # API and authentication services
├── styles             # Tailwind configurations and global styles
├── App.jsx            # Root React component
└── index.js           # Application entry point
```

---

## License

This project is licensed under the [MIT License](LICENSE).
