# CodeAlpha E-commerce Store

A full-stack e-commerce application built with Express.js, MongoDB, and vanilla JavaScript.

## Features

- ✅ User Registration and Login with JWT authentication
- ✅ Product listing with search and category filters
- ✅ Product details page
- ✅ Shopping cart functionality (add, update, remove items)
- ✅ Order processing
- ✅ Responsive design
- ✅ User profile management

## Technologies Used

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- Express Validator for input validation

### Frontend
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+)

## Project structure 

CodeAlpha_EcommerceStore
│
├── backend
├── frontend
├── images
├── README.md

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local Installation or MongoDB Atlas)
- Git

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/nikhad28/CodeAlpha_EcommerceStore.git
cd CodeAlpha_EcommerceStore
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Create a `.env` file inside the backend folder**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Start the backend server**

```bash
npm start
```

or (if using nodemon)

```bash
npm run dev
```

5. **Run the frontend**

Open the `frontend` folder and launch `index.html` using Live Server in VS Code, or simply open it in your browser.

6. **Open the application**

```
http://localhost:5000
```

## Default Features

- User Registration
- User Login
- Product Listing
- Product Search
- Shopping Cart
- Order Placement
- User Profile