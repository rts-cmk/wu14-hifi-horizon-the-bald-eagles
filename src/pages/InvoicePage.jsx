import React from 'react';
import '../styles/_InvoicePage.scss';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CartRoute from '../components/CartRoute';

export default function InvoicePage() {
	return (
		<div className="invoice-page">
			<HeaderComponent />
			<main>
				<CartRoute />
			</main>
			<FooterComponent />
		</div>
	);
}
