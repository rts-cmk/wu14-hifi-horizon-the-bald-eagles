import React from 'react';
import '../styles/_CartRoute.scss';
import cartIcon from '../assets/icons/cart.svg';
import cartDarkIcon from '../assets/icons/cart-dark.svg';
import creditCardIcon from '../assets/icons/credit-card.svg';
import creditCardDarkIcon from '../assets/icons/credit-card-dark.svg';
import receiptIcon from '../assets/icons/receipt.svg';
import receiptDarkIcon from '../assets/icons/receipt-dark.svg';
import { NavLink, useLocation } from 'react-router';

export default function CartRoute() {
	const location = useLocation();
	const isCartPage =
		location.pathname === '/cart/' || location.pathname.startsWith('/cart/');
	const isPaymentPage =
		location.pathname === '/payment/' ||
		location.pathname.startsWith('/payment/');
	const isInvoicePage =
		location.pathname === '/invoice/' ||
		location.pathname.startsWith('/invoice/');

	return (
		<div className="container">
			<div className="checkout-route">
				<ul className="checkout-route__ul">
					<li
						className="checkout-route__li"
						style={{ backgroundColor: isCartPage ? '#495464' : '#E8E8E8' }}>
						<NavLink to="/cart/">
							<img
								src={isCartPage ? cartIcon : cartDarkIcon}
								alt="cart icon"
								className="checkout-route__image"
							/>
						</NavLink>
					</li>
					<li
						className="checkout-route__li"
						style={{ backgroundColor: isPaymentPage ? '#495464' : '#E8E8E8' }}>
						<NavLink to="/payment/">
							<img
								src={isPaymentPage ? creditCardIcon : creditCardDarkIcon}
								alt="credit card icon"
								className="checkout-route__image"
							/>
						</NavLink>
					</li>
					<li
						className="checkout-route__li"
						style={{ backgroundColor: isInvoicePage ? '#495464' : '#E8E8E8' }}>
						<NavLink to="/invoice/">
							<img
								src={isInvoicePage ? receiptIcon : receiptDarkIcon}
								alt="receipt icon"
								className="checkout-route__image"
							/>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
}
