import React from 'react';
import '../styles/_PaymentPage.scss';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CartRoute from '../components/CartRoute';

export default function PaymentPage() {
	return (
		<div className="payment-page">
			<HeaderComponent />
			<main>
				<CartRoute />
				<h1 className="payment-page__title">Your info</h1>
				<form></form>
			</main>
			<FooterComponent />
		</div>
	);
}
