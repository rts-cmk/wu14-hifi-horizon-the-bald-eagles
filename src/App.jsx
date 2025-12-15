// App.jsx (Updated)

import React from 'react'
// Make sure to create this file: src/context/ProductContext.jsx
import { ProductProvider } from './context/ProductContext.jsx' 
// NOTE: Your imports are fine, but in standard React Router v6 it would be 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router' 
import '/src/styles/App.scss'
import FrontPage from './pages/FrontPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import CreatePage from './pages/CreateAccountPage'


function App() {

  return (
    // STEP 1: Wrap the entire application (everything inside the router) 
    // with the ProductProvider. This ensures all pages have access to the data.
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  )
}

export default App