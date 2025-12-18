import React from 'react'
import { ProductProvider } from './context/ProductContext.jsx' 
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
import FAQPage from './pages/FAQPage'

function App() {

  return (
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
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  )
}

export default App
