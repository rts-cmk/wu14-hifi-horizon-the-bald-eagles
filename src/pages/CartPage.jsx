import React, { useEffect, useState } from 'react';
import '../styles/_cart.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import CartRoute from '../components/CartRoute.jsx';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage() {
	const navigate = useNavigate();
	const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

	function handleButtonClick() {
		navigate('/payment/');
	}

	return (
		<div className="cart-page">
			<HeaderComponent />
			<main>
				<CartRoute />
				<h1 className="cart-page__title">Cart</h1>

				{cartItems.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					<>
						{cartItems.map((item) => (
							<div key={item.id} className="cart-item">
								<button
									onClick={() => removeFromCart(item.id)}
									className="cart-item__remove">
									×
								</button>
								<img
									src={item.image}
									alt={item.model}
									className="cart-item__image"
								/>
								<div className="cart-item__details">
									<h2>{item.model}</h2>
									<p className="cart-item__stock">
										<span className="cart-item__stock-indicator"></span>
										In stock
									</p>
								</div>
								<div className="cart-item__quantity">
									<button
										onClick={() => updateQuantity(item.id, item.quantity - 1)}>
										−
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() => updateQuantity(item.id, item.quantity + 1)}>
										+
									</button>
								</div>
								<p className="cart-item__price">
									£ {item.price.toLocaleString()}
								</p>
							</div>
						))}

						<div className="cart-page__payment">
							<div className="cart-page__payment-total">
								<p>Sub total </p>
								<p> £{getCartTotal().toLocaleString()}</p>
							</div>
							<Button
								label="Go to payment"
								variant="primary"
								size="medium"
								onClick={handleButtonClick}
							/>
						</div>
					</>
				)}
			</main>
			<FooterComponent />
		</div>
	);
}
