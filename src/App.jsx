import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import '/src/styles/App.scss';
import FrontPage from './pages/FrontPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import InvoicePage from './pages/InvoicePage';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<FrontPage />} />
					<Route path="/products/:id" element={<ProductPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/shop" element={<ShopPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="/invoice" element={<InvoicePage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
