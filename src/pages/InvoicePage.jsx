import React from 'react';
import '../styles/_InvoicePage.scss';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CartRoute from '../components/CartRoute';
import InvoiceComponent from '../components/InvoiceComponent';

export default function InvoicePage() {
	return (
		<div className="invoice-page">
			<HeaderComponent />
			<main>
				<CartRoute />
				<h1>Thank you for your order!</h1>
				<InvoiceComponent />
			</main>
			<FooterComponent />
		</div>
	);
}
