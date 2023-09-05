# Event Management System

## Overview

This is an Event Management System built using Express.js, Node.js, and MySQL. It allows users to create and manage events, register for events, and make payments. The system also has user authentication and authorization features.

## Installation

1. Clone the repository to your local machine.

```bash
git clone https://github.com/PH3NOMON/Venue-Booking.git
```
## Install dependencies:

cd event-management-system
npm install

## env
 PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=eventdb
SECRET_KEY=your_secret_key

## START YOUR SERVER
npm start / npm run "nodemon script"

The server will be running on http://localhost:3000.

##Database Setup (MySQL Workbench)

##TODO List
Create the Database:

## Open MySQL Workbench.
Connect to your MySQL Server.

## Execute the following SQL query to create the database:

CREATE DATABASE eventdb;

## Create Tables:
Inside the eventdb database, create the following tables:
users table: Contains user information.

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);

and many more as you choose.

## Seed Initial Data (Optional):

If you want to seed initial data, you can insert sample records into the tables.
Configure .env File:

## Update your .env file with the correct database configuration:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=eventdb

##Run the Application:

Restart your Express.js application.
Migrations and ORM (Optional):

Consider using a migration tool or an ORM like Sequelize or Knex.js for database management and migrations in the future.

## Usage
Once the server is running, you can access the application by visiting http://localhost:3000 in your web browser.
Contributing
Contributions are welcome! Please follow our Contributing Guidelines.

## License
This project is licensed under the MIT License.

This README provides an overview of the project, installation instructions, and a TODO list for setting up the MySQL database using MySQL Workbench. You can further customize it to include additional details about your system, dependencies, and usage instructions as needed.



