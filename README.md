# ShareSphere – Smart Community Resource Sharing Platform

## Project Overview

ShareSphere is a full-stack MERN web application that enables users to share and request community resources. The platform connects Sellers who provide resources and Buyers who request them, promoting efficient resource utilization and community collaboration.

## Features

* User Authentication using JWT
* Seller Registration and Login
* Buyer Registration and Login
* Add, Edit, Delete Resources
* View Available Resources
* Resource Request System
* Role-Based Access Control
* MongoDB Atlas Database Integration
* Responsive User Interface
* REST API Backend

## Technologies Used

### Frontend

* React.js (Vite)
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* CORS

### Database

* MongoDB Atlas
* Mongoose

## Project Structure

frontend/

* src/
* public/
* package.json

backend/

* controllers/
* models/
* routes/
* middleware/
* server.js
* package.json

## Installation

### Backend

1. Navigate to backend folder
2. Install dependencies

npm install

3. Create .env file

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

4. Run server

npm run dev

### Frontend

1. Navigate to frontend folder
2. Install dependencies

npm install

3. Create .env file

VITE_API_URL=http://localhost
