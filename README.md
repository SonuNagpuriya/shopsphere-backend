# ShopSphere – Backend

ShopSphere backend is a RESTful API built for a MERN stack e-commerce application.
It handles authentication, product management, and order processing using secure role-based access.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- dotenv

---

## Features

### Authentication
- User registration
- User login using JWT
- Role-based access control (Admin / User)

### Product Management
- Fetch all products
- Fetch product by ID
- Admin-only product creation

### Order Management
- Create new orders
- View user orders
- Admin can view all orders

---

## Project Structure

src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
└── server.js

yaml
Copy code

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Getting Started (Local Setup)
Clone the repository:

bash
Copy code
git clone https://github.com/SonuNagpuriya/shopsphere-backend.git
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm run dev
Server will run on:

arduino
Copy code
http://localhost:5000
Status
This backend is under active development.
Deployment details will be added after hosting.

Author
Sonu Nagpuriya
MERN Stack Developer
