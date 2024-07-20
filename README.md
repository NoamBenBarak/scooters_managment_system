On-Demand Scooters System
Overview
This project is an admin system for managing a fleet of scooters. It includes both a client-side application built with React.js and TypeScript, and a server-side REST API built with Node.js, Express, and TypeScript. The system uses MongoDB as its database.

Features
Client UI
Login Page: Allows users to log into the system.
Insert New Parking: Form for adding new parking spots.
View Parking Spots: Displays existing parking spots.
REST API
Scooters: CRUD operations for managing scooters.
Users: CRUD operations for managing users.
Parking: CRUD operations for managing parking spots.
Failures: CRUD operations for managing scooter failures.
Filtering
Scooter Filtering: Filter scooters by a polygon or availability.
Parking Spot Availability: View parking availability for each spot.
Failure History: View and manage failure history for each scooter.
Getting Started
Prerequisites
Node.js and npm
MongoDB
Heroku CLI (for deployment)
Installation
Clone the repository

Navigate to the server directory and install dependencies:
cd server
npm install

Navigate to the client directory and install dependencies:
cd ../client
npm install

Set up environment variables. Create a .env file in both the server and client directories with the necessary configurations.

Start the development server:
cd server
npm run dev
cd ../client
npm start
