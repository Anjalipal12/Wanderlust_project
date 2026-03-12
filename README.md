# Wanderlust Project
Travel listing web application

# Wanderlust - Travel Listing Web Application

## Project Overview
Wanderlust ek travel listing web application hai jisme users
different travel destinations ki listings dekh sakte hain.
Admin ya user naye listings add kar sakte hain aur existing
listings ko edit ya delete bhi kar sakte hain.

Ye project mainly CRUD operations aur RESTful routing
samajhne ke liye banaya gaya hai.

---

## Tech Stack Used

Frontend
- HTML
- CSS
- Bootstrap
- EJS

Backend
- Node.js
- Express.js

Database
- MongoDB
- Mongoose

---

## Features Implemented (Abhi Tak)

### 1. Basic Server Setup
- Express server setup kiya
- Routes create kiye
- Middleware use kiya

### 2. MongoDB Connection
- MongoDB database connect kiya
- Mongoose ka use karke schema banaya

### 3. Listing Model
Ek listing model create kiya jisme travel destination ki
information store hoti hai.

Example fields:
- title
- description
- image
- price
- location
- country

### 4. CRUD Operations

Create
User new travel listing add kar sakta hai.

Read
User saari listings dekh sakta hai.

Update
Existing listing edit ki ja sakti hai.

Delete
Listing delete ki ja sakti hai.

### 5. RESTful Routes

Routes follow kiye gaye:

GET /listings  
All listings show karne ke liye

GET /listings/new  
New listing form show karne ke liye

POST /listings  
Database mein new listing add karne ke liye

GET /listings/:id  
Single listing details show karne ke liye

PUT /listings/:id  
Listing update karne ke liye

DELETE /listings/:id  
Listing delete karne ke liye

### 6. EJS Templates
Frontend render karne ke liye EJS template engine use kiya.

Views create kiye:
- index.ejs
- show.ejs
- new.ejs
- edit.ejs

### 7. MVC Structure
Project ko organize karne ke liye MVC pattern follow kiya.

Models  
Database schema define karne ke liye.

Views  
Frontend pages render karne ke liye.

Controllers / Routes  
Application logic handle karne ke liye.

---

## What I Learned From This Project

- Express server setup
- MongoDB database connection
- Mongoose schemas
- CRUD operations
- RESTful routing
- MVC architecture
- EJS template rendering

---

## Future Improvements

- User Authentication (Login / Signup)
- Image upload using Cloudinary
- Map integration using Mapbox
- Review and rating system
