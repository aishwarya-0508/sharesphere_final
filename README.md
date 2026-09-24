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

## Deploying to Render and Vercel

### 1. Deploy the backend on Render

Create a Render Web Service from this repository. The included `render.yaml` can be used as a blueprint, or configure these values manually:

* Root Directory: `backend`
* Build Command: `npm install`
* Start Command: `npm start`

Add these Render environment variables:

* `MONGODB_URI`: your MongoDB Atlas connection string
* `JWT_SECRET`: a long random secret
* `CLIENT_URL`: your final Vercel URL, for example `https://sharesphere.vercel.app`

Copy the Render service URL after deployment, for example `https://sharesphere-api.onrender.com`.

### 2. Deploy the frontend on Vercel

Import the same repository into Vercel and set:

* Root Directory: `frontend`
* Framework Preset: `Vite`
* Build Command: `npm run build`
* Output Directory: `dist`

Before deploying, add this Vercel environment variable:

* `VITE_API_URL`: `https://sharesphere-api.onrender.com/api`

After the first Vercel deployment, update Render's `CLIENT_URL` with the exact Vercel URL and redeploy the backend. This allows browser requests from the deployed frontend.

### 3. Verify production flow

Register one seller and one buyer, add a resource as the seller, request it as the buyer, then use **View Requests** in the seller dashboard to accept or decline it.
