import React from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext.jsx';

export default function ProductGrid({ products }) {
	const { addToCart } = useCart();

	if (products.length === 0) {
		return <p>No products found</p>;
	}

	function handleAddToCart(e, product) {
		e.preventDefault(); // Prevent Link navigation
		addToCart(product);
	}

	return (
		<div className="product-grid">
			{products.map((product) => {
				const isAvailable = product['in-stock'];
				const stockStatusText = isAvailable ? 'In Stock' : 'Out of Stock';

				return (
					<Link
						to={`/product/${product.id}`}
						key={product.id}
						className="product-grid__item">
						<img
							src={product.image}
							alt={product.model}
							className="product-grid__image"
						/>
						<h3 className="product-grid__model">{product.model}</h3>
						<p className="product-grid__brand">{product.brand}</p>
						<p className="product-grid__price">£ {product.price},-</p>

						<div className="product-grid__info-bar">
							<button
								className="add-to-cart-btn"
								disabled={!isAvailable}
								onClick={(e) =>
									isAvailable ? handleAddToCart(e, product) : null
								}>
								{isAvailable ? 'Add to cart' : 'View details'}
							</button>

							<span
								className={`product-grid__stock-status product-grid__stock-status--${
									isAvailable ? 'true' : 'false'
								}`}>
								{stockStatusText}
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
