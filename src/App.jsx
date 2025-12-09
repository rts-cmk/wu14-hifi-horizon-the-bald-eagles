import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import '/src/styles/App.scss'
import FrontPage from './pages/FrontPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import ShopCategory from './pages/ShopCategory'
import EventsPage from './pages/EventsPage'
import CategoryList from './pages/CategoryList'
import BrandPage from './pages/BrandPage'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/shop/:category" element={<ShopCategory />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/brands/:brandName" element={<BrandPage />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
