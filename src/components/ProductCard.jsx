import React, { useState } from 'react';
import '../styles/_ProductCard.scss';

export default function ProductCard(props) {
	const { id, name, price, image, decription, color, stock } = props.data;
	const [count, setCount] = useState(0);

	return (
		<div className="product-card">
			<img src={image} alt="product image" className="product-card__image" />
			<h2 className="product-card__name">{name}</h2>
			<div className="product-card__stock">
				<span></span>
				<p>In stock</p>
			</div>

			<div className="product-card__counter">
				<button onClick={() => setCount((count) => count + 1)}>+</button>
				<span>{count}</span>
				<button onClick={() => setCount((count) => count - 1)}>-</button>
			</div>

			<p className="product-card__price">{price}</p>

			<div className="product-card__remove">
				<button>X</button>
			</div>
		</div>
	);
}
