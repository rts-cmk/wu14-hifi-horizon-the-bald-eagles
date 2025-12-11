import React, { useEffect, useState } from 'react';
import '../styles/_cart.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CartRoute from '../components/CartRoute.jsx';

export default function CartPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('/api/products');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setProducts(data);

				console.log('Fetched products:', data);
			} catch (error) {
				console.error('Error fetching products:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="cart-page">
			<HeaderComponent />
			<main>
				<CartRoute />
				{/* <ProductCard id={products.id} name={products.name} /> */}
			</main>
			<FooterComponent />
		</div>
	);
}
