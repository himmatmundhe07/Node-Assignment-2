# 🛒 Product Management API

A simple RESTful API built using Express.js for managing products.

This API allows you to:
- Get all products
- Get product by ID
- Filter products by category
- Create new products
- Update full product details
- Update only stock
- Update only price

------------------------------------------------------------

BASE URL

http://localhost:3000

------------------------------------------------------------

TECH STACK

- Node.js
- Express.js
- CORS
- In-memory Array (No Database)

------------------------------------------------------------

PRODUCT SCHEMA

Each product contains:

id        → Number  → Unique product ID  
name      → String  → Product name  
category  → String  → Product category  
price     → Number  → Product price  
stock     → Number  → Available stock  
rating    → Number  → Product rating  

------------------------------------------------------------

API ENDPOINTS

1) Server Status

GET /

Response:
{
  "message": "Sever is Running"
}

------------------------------------------------------------

2) Get All Products

GET /products

Response:
{
  "products": [ ... ]
}

------------------------------------------------------------

3) Get Product By ID

GET /products/:id

Example:
/products/1

Success Response:
{
  "product": { ... }
}

Error 400:
{
  "message": "Invalid Product ID"
}

Error 404:
{
  "message": "Product Not Found"
}

------------------------------------------------------------

4) Get Products By Category

GET /products/category/:categoryname

Example:
/products/category/Electronics

Category matching is case-insensitive.

Success Response:
{
  "product": [ ... ]
}

Error:
{
  "message": "Product Not Found"
}

------------------------------------------------------------

5) Create New Product

POST /products

Request Body:
{
  "name": "Keyboard",
  "category": "Electronics",
  "price": 1299,
  "stock": 20,
  "rating": 4.2
}

Success Response (201):
{
  "product": { ... }
}

Error:
{
  "message": "All fields are required"
}

------------------------------------------------------------

6) Update Full Product

PUT /products/:id

Request Body:
{
  "name": "Gaming Mouse",
  "category": "Electronics",
  "price": 1499,
  "stock": 15,
  "rating": 4.6
}

Success Response:
{
  "product": { ... }
}

Possible Errors:
- Invalid Product ID
- Product Not Found
- All fields are required

------------------------------------------------------------

7) Update Product Stock

PUT /products/:id/stock

Request Body:
{
  "stock": 100
}

Success Response:
{
  "product": { ... }
}

Error:
{
  "message": "Stock must be a number"
}

------------------------------------------------------------

8) Update Product Price

PUT /products/:id/price

Request Body:
{
  "price": 1999
}

Success Response:
{
  "product": { ... }
}

Error:
{
  "message": "Price must be a valid number"
}

------------------------------------------------------------

IMPORTANT NOTES

- Data is stored in memory (array).
- Restarting the server resets all data.
- IDs auto-increment.
- Category search is case-insensitive.
- Proper HTTP status codes are used.

------------------------------------------------------------

HOW TO RUN

npm install
node index.js

Server runs on:
http://localhost:3000
