# Users Web List

## Description

Users Web List is a web application designed to manage user profiles on a specific page. This application leverages a modern tech stack including React, TypeScript, DataGrid MUI for the frontend, and Node.js with Inversify, Inversify-Express-Utils, Typegoose, and MongoDB for the backend. It utilizes a Dependency Injection (DI) design pattern across the backend for efficient service management.

## Features

- User profile management (Create, Read, Update, Delete) through a user-friendly interface.
- Integration with an external API for database operations.
- Secure authentication and data handling.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Arad1234/Users-web-list.git
   ```
2. Install dependencies:
   - For the frontend:
     ```
     cd client
     npm install
     ```
   - For the backend:
     ```
     cd server
     npm install
     ```
3. Set up the environment variables:
   - Create a `.env` file in your server directory.
   - Add the following variables:
     ```
     SECRET_KEY=your_secret_key
     AUTH_EMAIL=your_auth_email
     AUTH_PASSWORD=your_auth_password
     DB_URI=your_database_uri
     ```

## Usage

After installation, you can run the application:

- Start the frontend server:
  ```
  npm run dev
  ```
- Start the backend server:
  ```
  npm run dev
  ```
