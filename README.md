CHAP eCommerce Website

Overview
--------
CHAP is a simple eCommerce website built using React, Bootstrap, Node.js, Express, and MySQL.
It allows users to browse and purchase phones while managing their cart and purchase history.

Features
--------
- User authentication (Register, Login, Logout)
- View available products
- Manage cart (Add, Increase, Decrease, Remove, Clear)
- Checkout and view purchase history

Technologies Used
-----------------
Frontend: React, Bootstrap, Axios
Backend: Node.js, Express, Express-Session, Express-MySQL-Session
Database: MySQL

Installation
------------
1. Clone the repository:
   git clone https://github.com/your-repo/chap-ecommerce.git
   cd chap-ecommerce

2. Install dependencies:
   - Backend:
     cd backend
     npm install
   - Frontend:
     cd frontend
     npm install

3. Configure the environment file:
   Create a .env file in the backend directory and add:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=chap_ecommerce
   SESSION_SECRET=your_secret_key

4. Set up the database:
   Import the provided `chap_ecommerce.sql` file into MySQL:
   mysql -u root -p chap_ecommerce < chap_ecommerce.sql

5. Run the backend:
   cd backend
   node server.js

6. Run the frontend:
   cd frontend
   npm start

Database Schema
---------------
User Table:
  user_id   (INT, PRIMARY KEY) - Unique user ID
  firstname (VARCHAR) - First name
  lastname  (VARCHAR) - Last name
  email     (VARCHAR) - Email address
  gender    (VARCHAR) - Gender
  phone     (VARCHAR) - Phone number
  password  (VARCHAR) - Hashed password

Product Table:
  prod_id    (INT, PRIMARY KEY) - Unique product ID
  title      (VARCHAR) - Product name
  description(TEXT) - Product details
  price      (DECIMAL) - Product price
  imgUrl     (VARCHAR) - Product image URL

Cart Table:
  cart_id   (INT, PRIMARY KEY) - Unique cart ID
  user_id   (INT, FOREIGN KEY) - User reference
  prod_id   (INT, FOREIGN KEY) - Product reference
  quantity  (INT) - Item quantity
  created_at(TIMESTAMP) - Time of addition

Purchase Table:
  purchase_id (INT, PRIMARY KEY) - Unique purchase ID
  user_id     (INT, FOREIGN KEY) - User reference
  prod_id     (INT, FOREIGN KEY) - Product reference
  quantity    (INT) - Purchased quantity
  total_price (DECIMAL) - Total cost
  created_at  (TIMESTAMP) - Time of purchase

API Routes
----------
User Routes (/user)
  POST  /login      - Logs in a user (No Auth Required)
  POST  /register   - Registers a user (No Auth Required)
  POST  /logout     - Logs out a user (Auth Required)
  GET   /loggedIn   - Checks login status (Auth Required)

Product Routes (/api/product)
  GET   /          - Get all products (Auth Required)
  GET   /:id       - Get single product by ID (Auth Required)

Cart Routes (/cart)
  POST  /add       - Add item to cart (Auth Required)
  POST  /increase  - Increase cart item quantity (Auth Required)
  POST  /decrease  - Decrease cart item quantity (Auth Required)
  GET   /view      - View cart items (Auth Required)
  DELETE /clear    - Clear cart (Auth Required)
  DELETE /remove   - Remove item from cart (Auth Required)

Purchase Routes (/purchase)
  POST  /check     - Checkout items (Auth Required)
  GET   /history   - Get purchase history (Auth Required)

Future Enhancements
-------------------
- Implement an admin dashboard for managing products and orders
- Improve UI with Tailwind CSS
- Add payment gateway integration
- Implement user profile and order tracking

License
-------
This project is licensed under the MIT License.

Notes:
------
- All routes that modify data require authentication.
- The frontend should use Axios to interact with the backend.
- Session-based authentication is used (Express-Session).

