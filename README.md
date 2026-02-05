# Project Title: 
Pro-Tasker Full-Stack MERN Application

# Date Completed: 
February 4, 2026

# Project Description: 
This is a full-stack project management application built with the MERN stack. The MERN state includes MongoDB, Express, React and Node.js. Pro-Tasker is designed to help users organize their projects and tasks with features like activity tracking, dynamic filtering and visual due date warnings.

 # Project Features:
User Authentication     - Secure registration and login with JWT tokens
Project Management      - Create, read, update, and delete projects
Task Management         - Organize tasks within projects with full CRUD operations
Activity Tracking       - Real-time feed of all user actions
Dynamic Filtering       - Filter projects and tasks by status and due dates
Visual Indicators       - Red pulsing light for tasks due within 3 days
Dark/Light Mode         - Toggle between themes with persistent preference
Dashboard Customization - Personalized dashboard nickname
Responsive Navigation** - Back/forward buttons and breadcrumb navigation

# Technologies Used
Frontend application:
-React 19.2.0
-React Router DOM 7.13.0
-Axios
-Vite 

Backend application:
-Node.js
-Express.js
-MongoDB with Mongoose
-JSON Web Tokens (JWT)
-Bcrypt (password hashing)
-CORS

# Prerequisites
Before running this application, make sure you have the following installed:

- Node.js - (https://nodejs.org/) (v16 or higher)
- MongoDB - (https://www.mongodb.com/) (running locally or MongoDB Atlas account)
- npm package manager

# Authentication

This application uses **JWT (JSON Web Tokens)** for authentication. After logging in, the token is stored in `localStorage` and automatically included in all API requests via axios interceptors.

# Links, Usage, and Instructions:
1. Clone the repository
git clone 
-cd 

2. Backend Setup
Navigate to the backend folder
- cd backend
3. Install the dependencies
- npm install
4. Create a .env file
- touch .env
5. Add the following to your `frontend/.env` file: VITE_API_URL=http://localhost:3000
6. Start the frontend server
-npm run dev
7.Access the frontend application
-Open your browser and navigate to http://local:3001
8. Register a new account and start managing your projects.


# My process:
My process for this project started with thinking about all of the prior task managers that I had created earlier in the course and the features that I know I could easily incorporate because I had previous knowledge of them. I pretty much had a sold backend application to start with but I knew my frontend would take the most work based on the features I wanted to incorporate. I got some inspiration from the Slack application that we use for class. I thought about how a person like me who is a procrastinator, could benefit from a task manager. That helped me think about adding the alert indicator, activity tracker, and the dynamic filtering. I only had to add one more model, one more controller, and one more route to my backend. I started with the backend and I'm glad that I did. I did not do a great job of structuring out my frontend application. I underestimated how many components I would need to accomplish the user interface that I wanted. I intially planned out 6 components but I had forgot about the editing, the activity tracking, and the navigation bar for the application. This was extremely frustrating with the time constrainsts that I already had. 

# Author    
Jai Jones


# Snippets
-Bryan Santos's CSS reset
/* CSS RESET */
*::before,
*::after {
  box-sizing: border-box;
}
-Stackoverflo solutions
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
  }
  /* ... */
}
-Veljko llic
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`; }
  
# Ackowledgments and Resources:
CSS RESET-Bryan Santos
https://stackoverflow.com/questions/47437562/using-css-box-shadow-for-pulse-animation-eats-considerable-cpu
https://www.geeksforgeeks.org/javascript/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
https://react.dev/reference/react/useState
https://react.dev/reference/react/useCallback
https://react.dev/reference/react/useEffect
https://react.dev/reference/react/apis
https://www.geeksforgeeks.org/reactjs/how-to-create-a-food-recipe-app-using-reactjs/
https://matthieubertrand5.medium.com/build-a-recipe-app-fetching-api-using-react-443658f38064
https://devhints.io/reac
stackoverflow.com/sort-an-array
Discord group discussion 

# Troubleshooting:
Frontend Issues
Problem: "Network Error" when trying to login/register
- Verify backend is running on http://localhost:3000
- Check frontend/.env has correct API URL: VITE_API_URL=http://localhost:3000
- Restart frontend dev server after changing .env
- Check browser console for CORS errors

Problem: CORS Error
Access to XMLHttpRequest blocked by CORS policy
- Ensure cors package is installed in backend: npm install cors
- Verify app.use(cors()) is in backend/server.js BEFORE routes
- Restart backend server

Backend Issues
Problem: "Cannot connect to MongoDB"

Error: MongooseServerSelectionError: connect ECONNREFUSED

- Ensure MongoDB is running locally: mongod or brew services start mongodb-community
- Check your MONGO_URI in .env is correct
- For MongoDB Atlas, verify IP whitelist includes your current IP