import React from 'react';
import '../styles/_InvoicePage.scss';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CartRoute from '../components/CartRoute';
import InvoiceComponent from '../components/InvoiceComponent';
import printIcon from '../assets/icons/printer.svg';
import html2pdf from 'html2pdf.js';

export default function InvoicePage() {
	function handlePrintClick() {
		const invoiceElement = document.getElementById('invoice');
		html2pdf(invoiceElement);
	}
	return (
		<div className="invoice-page">
			<HeaderComponent />
			<main>
				<CartRoute />
				<h1>Thank you for your order!</h1>
				<div className="print-container">
					<button onClick={handlePrintClick} className="print-button">
						<img src={printIcon} alt="print icon" className="print-icon" />
					</button>
				</div>
				<InvoiceComponent />
			</main>
			<FooterComponent />
		</div>
	);
}
