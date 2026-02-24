const express = require("express");
const cors = require("cors");

const app = express();   

app.use(express.json());
app.use(cors());
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];



app.get("/", (req, res) => {
  res.status(200).json({ message: "Sever is Running" })
});

app.get("/products", (req, res) => {
  res.status(200).json({ products });
});

app.get("/products/:id", (req, res) => {
  const ProductId = Number(req.params.id);

  if (isNaN(ProductId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const product = products.find(p => p.id === ProductId);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.status(200).json({ product });
})

app.get("/products/category/:categoryname", (req, res) => {
  const categoryName = req.params.categoryname;

  const product = products.filter(
    (category) =>
      category.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (product.length === 0) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.status(200).json({ product });
});

app.post("/products", (req, res) => {
  const { name, category, price, stock, rating } = req.body;

  if (
    name == null ||
    category == null ||
    price == null ||
    stock == null ||
    rating == null
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    name,
    category,
    price,
    stock,
    rating
  };

  products.push(newProduct);
  res.status(201).json({ product: newProduct });
});

app.put("/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const index = products.findIndex(u => u.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  const { name, category, price, stock, rating } = req.body;

  if (!name || !category || !price || !stock || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updatedProduct = {
    id: productId,
    name,
    category,
    price,
    stock,
    rating
  };

  products[index] = updatedProduct;

  res.status(200).json({ product: updatedProduct });
});

app.put("/products/:id/stock", (req, res) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  const { stock } = req.body;

  if (typeof stock !== "number") {
    return res.status(400).json({ message: "Stock must be a number" });
  }

  products[index].stock = stock;

  res.status(200).json({ product: products[index] });
});

app.put("/products/:id/price", (req, res) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  const { price } = req.body;

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ message: "Price must be a valid number" });
  }

  products[index].price = price;

  res.status(200).json({ product: products[index] });
});

app.listen(3000, () => {
  console.log("Server Started on port 3000")
});