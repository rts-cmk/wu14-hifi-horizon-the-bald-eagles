# HiFi Horizons Backend Documentation

This document serves as the official technical documentation for the HiFi Horizons backend API.
- Made by Christian Reed and Sebastian Køster.

## 1. Project Overview

HiFi Horizons is a full-stack e-commerce platform for high-end audio equipment. This backend handles data persistence, product catalog management, user authentication, and customer engagement.

### Deployment & Hosting

* **Frontend**: Hosted on **GitHub Pages**, serving the React-based user interface.
* **Backend**: Hosted on **Render**, running the Node.js/Express server.
* **Database**: **MongoDB Atlas**, a cloud-managed NoSQL database.

---

## 2. Core Architecture

### Server Entry Point (`server.js`)

The server uses **Express** and **CORS** to handle requests. It serves static images and registers all API routes.

```javascript
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

// Connect to MongoDB
connectDB();
const app = express();

app.use(cors());
app.use(express.json()); 

// Static folder for assets and product images
app.use(express.static('public'));
app.use('/images', express.static('images'));

// API Routes
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```

### Database Connection (`db.js`)

Uses **Mongoose** to establish a secure connection to MongoDB Atlas using environment variables.

```javascript
import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGO_URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); 
    }
};

export default connectDB;

```

---

## 3. API Route Documentation

### Products (`/api/products`)

Manages the retrieval of the audio equipment catalog.

* **GET `/**`: Returns the entire catalog document.
* **GET `/random**`: Fetches the catalog document to allow for frontend-side product randomization.

### Users (`/api/users`)

Handles customer accounts and authentication.

* **POST `/register**`: Registers a new user with full profile details.
* **POST `/login**`: Authenticates a user and returns a profile (password excluded).
* **PUT `/update/:id**`: Updates existing user profile information.

### Customer Engagement

* **Newsletter (`/api/newsletter`)**: **POST `/**` saves a unique email address for subscriptions.
* **Contact (`/api/contact`)**: **POST `/**` records customer inquiries into the database.

---

## 4. Data Models

### Catalog Schema (`Product.js`)

The catalog is optimized for a nested structure: **Category > Brand > Model**.

```javascript
const productDetailSchema = mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    'in-stock': { type: Boolean, required: true },
    price: { type: Number, required: true },
    color: [{ type: String }], 
    specifications: { type: Map, of: String }, 
}, { _id: false }); 

```

### User Schema (`User.js`)

Stores comprehensive shipping and contact information.

---

## 5. Environment Configuration

Create a `.env` file in the root directory with the following variables:

| Variable | Description |
| --- | --- |
| `MONGO_URI` | Your MongoDB Atlas connection string. |
| `PORT` | The port for the server to run on (default 3000). |

---