# ShopSphere — Backend

ShopSphere backend is a RESTful API built with Node.js, Express, and MongoDB to support a full-featured e-commerce platform.  
It handles authentication, authorization, product management, and order processing.

---

## API Deployment

The backend API is deployed and used by the frontend application.

*Base API URL:*  
https://shopsphere-backend-vo3y.onrender.com/api

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

---

## Core Features

- User authentication & authorization
- Role-based access control (Admin / User)
- Product CRUD operations (Admin only)
- Order creation and tracking
- Secure middleware-protected routes

---

## API Modules
src/ ├── controllers/    # Route logic ├── middleware/     # Auth & admin middleware ├── models/         # Mongoose schemas ├── routes/         # API route definitions ├── utils/          # Helper utilities (JWT, etc.) └── server.js       # Server entry point
Copy code

---

## Security

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware validation
- Admin privileges enforced server-side

---

## Environment Configuration

Required environment variables:
PORT=5000 MONGO_URI=<mongodb_connection_string> JWT_SECRET=<jwt_secret_key>
Copy code

---

## Status

This backend is designed following scalable REST API practices and deployed for real-world usage.

---

## Author

*Sonu Nagpuriya*  
Backend / MERN Stack Developer