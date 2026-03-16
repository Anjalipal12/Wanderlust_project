# WanderLust – Travel Listing Web Application

## 1. Project Overview

WanderLust is a full-stack web application where users can explore travel destinations and create their own listings.
Users can view different places, add new listings and manage travel information.

This project helped me understand **CRUD operations, MVC architecture, server-side rendering, and database integration using Node.js and MongoDB.**

---

## 2. Problem the Project Solves

Many travel websites only allow users to view destinations but not add their own.

WanderLust solves this by allowing users to:

* Create new travel listings
* View all travel listings
* Store travel data in a database

This helps in building a platform where users can share travel places.

---

## 3. Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Tools

* Git
* GitHub
* VS Code

---

## 4. Features Implemented

✔ Display all listings
✔ Create a new listing
✔ Server-side rendering using EJS
✔ Responsive design using Bootstrap
✔ Data stored in MongoDB

---

## 5. Project Structure

wanderlust
│
├── models
│   └── listing.js

├── views
│   ├── layouts
│   │   └── boilerplate.ejs
│   ├── listings
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   │
│   └── includes
│       ├── navbar.ejs
│       └── footer.ejs

├── public
│   └── css
│       └── style.css

├── app.js
└── package.json

---

## 6. How the Project Works

1. Express server handles routes.
2. When a user opens the website, the server fetches data from MongoDB.
3. EJS templates render the UI.
4. Users can submit forms to create new listings.
5. Data is stored in MongoDB using Mongoose models.

---

## 7. Important Routes

GET /listings
Displays all listings.

GET /listings/new
Shows the form to create a new listing.

POST /listings
Creates a new listing and stores it in the database.

---

## 8. Possible Interview Questions

Q1: What is Express.js?
Express.js is a lightweight Node.js framework used to build web servers and APIs.

Q2: What is EJS?
EJS is a templating engine that allows embedding JavaScript inside HTML to generate dynamic web pages.

Q3: What is MongoDB?
MongoDB is a NoSQL database that stores data in JSON-like documents.

Q4: What is MVC architecture?
MVC stands for Model-View-Controller.
Model handles data, View handles UI, and Controller manages application logic.

Q5: What are CRUD operations?
CRUD stands for Create, Read, Update, and Delete operations performed on a database.

---

## 9. Future Improvements

* User authentication (login/signup)
* Image upload for listings
* Map integration for locations
* Reviews and ratings for places
* Edit and delete listing functionality

---

## 10. What I Learned

* Building RESTful routes
* Connecting MongoDB with Node.js
* Using Mongoose schemas
* Implementing MVC structure
* Creating responsive UI with Bootstrap
