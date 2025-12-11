import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_front.scss';

export default function FrontPage() {
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
		<div className="front-page">
			<HeaderComponent />
			<main></main>
			<FooterComponent />
		</div>
	);
}
