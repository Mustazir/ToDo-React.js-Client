# To-Do Website

## Short Description
This is a To-Do website where users can save their tasks, view tasks in progress, and mark them as complete. User authentication is required to access the platform.

## Live Link
[Live Demo](https://your-live-demo-link.com) *(Replace with your actual live link)*

## Dependencies

### Client-Side:
- `@tailwindcss/vite` - Tailwind CSS Vite plugin for styling
- `axios` - Promise-based HTTP client for making API requests
- `firebase` - Firebase SDK for authentication and data management
- `react` - JavaScript library for building user interfaces
- `react-dom` - React package for DOM rendering
- `react-icons` - Library for including icons in React components
- `react-router-dom` - DOM bindings for React Router
- `react-toastify` - Library for notifications in React
- `tailwindcss` - Utility-first CSS framework for styling

### Server-Side:
- `bcryptjs` - Library for hashing passwords
- `body-parser` - Middleware for parsing incoming request bodies
- `cookies-parser` - Middleware for cookie parsing
- `cors` - Cross-Origin Resource Sharing middleware
- `dotenv` - Loads environment variables from `.env` file
- `express` - Fast, unopinionated web framework for Node.js
- `jsonwebtoken` - For creating and verifying JWT tokens
- `mongodb` - MongoDB client for interacting with the database
- `nodemon` - Tool for automatically restarting server during development

## Installation Steps

### 1. Clone the repository
```bash
git clone https://github.com/your-username/to-do-website.git
```

2. Install dependencies
Navigate to both the client-side and server-side directories and run the following commands:
For the client:
```bash
cd client
npm install
```
For the server:
```bash
cd server
npm install
```
3. Set up environment variables
Create a .env file in the server directory and add the required environment variables like your Firebase credentials and MongoDB connection string.

4. Run the development server
For the client-side:
```bash
cd client
npm run dev
```
For the server-side:
```bash
cd server
npm start
```
Now, open your browser and visit http://localhost:3000 to view the To-Do website.
###Technologies Used
Frontend: React.js, Tailwind CSS, Firebase, Axios, React Router, React Toastify
Backend: Node.js, Express.js, MongoDB, JWT Authentication, Bcrypt.js