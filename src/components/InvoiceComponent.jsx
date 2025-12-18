import React from 'react';
import { useLocation } from 'react-router';
import '../styles/_InvoiceComponent.scss';
import hifiLogo from '../assets/logo/hifi-logo2.svg';
import phoneIcon from '../assets/icons/phone-dark.svg';
import mailIcon from '../assets/icons/mail.svg';

export default function InvoiceComponent() {
	const location = useLocation();
	const { orderData } = location.state || {};

	if (!orderData) {
		return (
			<div className="invoice-page">
				<h1>No order data found</h1>
				<p>Please complete your order first.</p>
			</div>
		);
	}

	const {
		customerInfo,
		deliveryMethod,
		deliveryAddress,
		selectedStore,
		cartItems,
		subtotal,
		deliveryFee,
		vat,
		total,
		orderDate
	} = orderData;
	return (
		<div className="invoice-component">
			<div className="invoice-component__invoice">
				<header className="invoice-component__invoice-header">
					<div className="column-one">
						<div className="invoice-section">
							<ul>
								<li>
									<strong>{customerInfo.fullName}</strong>
								</li>
								<li>
									{customerInfo.address}, {customerInfo.zipCode}{' '}
									{customerInfo.city}
								</li>
								<li>M: {customerInfo.email}</li>
								<li>P: {customerInfo.phone}</li>
							</ul>
						</div>

						<div className="invoice-section">
							<h2>Delivery Address</h2>
							{deliveryMethod === 'home' && deliveryAddress.length > 0 && (
								<ul>
									<li>
										<strong>{customerInfo.fullName}</strong>
									</li>
									<li>
										{customerInfo.address}, {customerInfo.zipCode}{' '}
										{customerInfo.city}
									</li>
									<li>M: {customerInfo.email}</li>
									<li>P: {customerInfo.phone}</li>
								</ul>
							)}
							{deliveryMethod === 'collect' && selectedStore && (
								<div>
									<p>
										<strong>{selectedStore.id}</strong>
									</p>
									<p>{selectedStore.name}</p>
									<p>{selectedStore.hours}</p>
								</div>
							)}
						</div>
					</div>

					<div className="invoice-section column-two">
						<ul>
							<li>
								<img src={hifiLogo} alt="hifi logo" />
							</li>
							<li>
								<p>44 Cow Wynd, Falkirk</p>
							</li>
							<li>
								<p>Central Region, FK1 1PU</p>
							</li>
							<li>
								<p>0131 556 7901 </p>
								<img src={phoneIcon} alt="phone icon" className="icon" />{' '}
							</li>
							<li>
								<p>sales@hifi-horizon.com</p>
								<img src={mailIcon} alt="mail icon" className="icon" />{' '}
							</li>
						</ul>
					</div>
				</header>

				<div className="invoice-component__invoice-order-details">
					<header className="invoice-component__invoice-order-details-header">
						<h2>Invoice</h2>
					</header>
					<div>
						<ul>
							<li>
								<p>Order number</p>
								<p>238475691</p>
							</li>
							<li>
								<p>Date</p>
								<p>{new Date(orderDate).toLocaleDateString()}</p>
							</li>
							<li>
								<p>Shop</p>
								<p>342 HIFI Horizon - Falkirk</p>
							</li>
							<li>
								<p>Currency</p>
								<p>GBP</p>
							</li>
						</ul>
					</div>
				</div>

				<div className="invoice-component__invoice-order-details-table">
					<table>
						<thead>
							<tr>
								<th>Item description</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr key={item.id}>
									<td>{item.model}</td>
									<td>£ {item.price.toLocaleString()}</td>
									<td>{item.quantity}</td>
									<td>£ {(item.price * item.quantity).toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="invoice-component__invoice-order-totals">
					<div className="invoice-total-row">
						<ul>
							<li>
								<p>Subtotal:</p>
								<p>£ {subtotal.toLocaleString()}</p>
							</li>
							<li>
								<p>Delivery Fee:</p>
								<p>£ {deliveryFee.toLocaleString()}</p>
							</li>
							<li>
								<p>VAT:</p>
								<p>£ {vat.toLocaleString()}</p>
							</li>
						</ul>
					</div>

					<div className="invoice-order-grand-total">
						<p>
							<strong>Total:</strong>
						</p>
						<p>
							<strong>£ {total.toLocaleString()}</strong>
						</p>
					</div>
				</div>
			</div>
			<footer className="invoice-component__invoice-footer">
				<p>
					<strong>Address:</strong> 44 Cow Wynd, Falkirk, Central Region, FK1
					1PU | <strong>Phone:</strong> 0131 556 7901 | <strong>Mail:</strong>
					sales@hifi-horizon.com{' '}
				</p>
			</footer>
		</div>
	);
}
