# HiFi Horizons Backend Documentation

This document serves as the official technical documentation for the HiFi Horizons backend API.
- Made by Christian Reed and Sebastian Køster.
- checkout the website live from here: https://kosterseb.github.io/HiFiHorizon

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

## Deployment & Hosting Architecture

The HiFi Horizons platform is architected as a **Decoupled Application**, separating the static frontend from the dynamic logic of the backend.

### 1. Frontend: GitHub Pages

* **Hosting Model:** Static Site Hosting.
* **Build Process:** React source code is bundled using **Vite** into minified assets.
* **Deployment Workflow:**
* The `gh-pages` package automates the deployment.
* Running `npm run deploy` triggers a build and pushes the `dist` folder to a dedicated `gh-pages` branch.


* **Routing Strategy:** Uses a `basename="/HiFiHorizon"` configuration within `BrowserRouter` to ensure path resolution matches the GitHub repository subdirectory.

### 2. Backend: Render

* **Hosting Model:** Web Service (Node.js).
* **Lifecycle:** The server remains in "sleep" mode during inactivity and spins up automatically upon the first API request.
* **Static Asset Serving:** The Express server is configured to serve physical product images via the `/images` route, which are accessed by the frontend using absolute URLs (`https://hifihorizon.onrender.com/images/...`).

### 3. Cross-Origin Resource Sharing (CORS)

To allow the frontend (hosted on `github.io`) to safely request data from the backend (hosted on `onrender.com`), the backend utilizes the `cors` middleware. This "handshake" ensures that only authorized domains can access the product catalog and user data.

### 4. Continuous Integration Checklist

When updating the project, follow these steps:

1. **Backend Changes:** Push code to the main branch; Render will auto-deploy. Ensure environment variables (`MONGO_URI`) are set in the Render Dashboard.
2. **Frontend Changes:** Update the code locally and run `npm run deploy` to refresh the GitHub Pages site.
3. **Environment Sync:** Ensure the frontend `VITE_API_URL` (or hardcoded fetch URLs) always points to the live Render address, not `localhost`.

---