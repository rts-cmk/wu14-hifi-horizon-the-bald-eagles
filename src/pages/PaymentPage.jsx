import React, { useState } from 'react';
import '../styles/_PaymentPage.scss';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CartRoute from '../components/CartRoute';
import Button from '../components/Button';
import stripeIcon from '../assets/pay/stripe-dark.svg';
import visaIcon from '../assets/pay/visa-dark.svg';
import masterCardIcon from '../assets/pay/mastercard-dark.svg';
import paypalIcon from '../assets/pay/paypal.svg';
import applepayIcon from '../assets/pay/applepay.svg';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router';

export default function PaymentPage() {
	// Track which button is active: 'home', 'collect', or 'postoffice'
	const [activeButton, setActiveButton] = useState(null);

	//Navigate to other pages
	const navigate = useNavigate();

	//Cart items
	const { cartItems, getCartTotal } = useCart();

	const [formData, setFormData] = useState({
		fullName: '',
		zipCode: '',
		city: '',
		address: '',
		email: '',
		phone: ''
	});

	function handleButtonClick() {
		const terms = document.getElementById('terms');
		const paymentMethods = document.querySelectorAll(
			'input[name="paymentMethod"]'
		);
		const isPaymentMethodSelected = Array.from(paymentMethods).some(
			(method) => method.checked
		);

		if (!terms.checked) {
			alert('Please accept the terms of trade to proceed.');
			return;
		}

		if (!isPaymentMethodSelected) {
			alert('Please select a payment method.');
			return;
		}

		//get payment method
		const selectedPaymentMethod = Array.from(paymentMethods).find(
			(method) => method.checked
		).value;

		//setup order data
		const orderData = {
			customerInfo: formData,
			deliveryMethod: activeButton,
			deliveryAddress: displayAddress,
			selectedStore: displayShipStores.find(
				(store) =>
					document.querySelector(`input[name="store"]:checked`)?.value ===
					store.id
			),
			cartItems: cartItems,
			paymentMethod: selectedPaymentMethod,
			subtotal: getCartTotal(),
			deliveryFee: 4,
			vat: (getCartTotal() / 100) * 25,
			total: getCartTotal() + (getCartTotal() / 100) * 25 + 4,
			orderDate: new Date().toISOString()
		};

		navigate('/invoice/', { state: { orderData } });
	}

	const [displayAddress, setDisplayAddress] = useState([]);
	const [displayShipStores, setDisplayShipStores] = useState([]);
	const [displayPostoffice, setDisplayPostoffice] = useState(false);

	function handleClick(buttonType) {
		setActiveButton(buttonType);

		if (buttonType === 'home') {
			const addressArray = [
				formData.fullName,
				formData.address,
				`${formData.zipCode} ${formData.city}`
			];
			setDisplayAddress(addressArray);
			setDisplayShipStores([]);
			setDisplayPostoffice(false);
		} else if (buttonType === 'collect') {
			const shipToStoreInputs = [
				{
					id: 'Edinburgh',
					name: '2 Joppa Rd, Edinburgh, EH15 2EU',
					hours:
						'Monday to Friday: 10:00am - 5:30pm, Saturday: 10:00am - 5:30pm, Sunday: Closed'
				},
				{
					id: 'Falkirk',
					name: '44 Cow Wynd, Falkirk, Central Region, FK1 1PU',
					hours:
						'Monday to Friday: 10:00am - 5:30pm, Saturday - By appointment only, Sunday: Closed'
				}
			];

			setDisplayShipStores(shipToStoreInputs);
			setDisplayAddress([]);
			setDisplayPostoffice(false);
		} else if (buttonType === 'postoffice') {
			setDisplayPostoffice(true);
			setDisplayAddress([]);
			setDisplayShipStores([]);
		}
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	}

	return (
		<div className="payment-page">
			<HeaderComponent />
			<main>
				<CartRoute />
				<div className="payment-page__wrapper">
					<div className="payment-page__first-column-wrapper">
						<h1 className="payment-page__title">Your info</h1>
						<div className="payment-page__info-container">
							<form>
								<label htmlFor="fullName">
									<p>
										Full Name <span className="asterisk">*</span>
									</p>
									<input
										type="text"
										name="fullName"
										id="fullName"
										autoComplete="name"
										value={formData.fullName}
										onChange={handleInputChange}
										required
									/>
								</label>
								<div className="payment-page__info-zip-city-wrapper">
									<label htmlFor="zipCode">
										<p>
											Zip-code <span className="asterisk">*</span>
										</p>
										<input
											type="number"
											name="zipCode"
											id="zipCode"
											autoComplete="postal-code"
											value={formData.zipCode}
											onChange={handleInputChange}
											required
										/>
									</label>
									<label htmlFor="city">
										<p>
											City <span className="asterisk">*</span>
										</p>
										<input
											type="text"
											name="city"
											id="city"
											autoComplete="city"
											value={formData.city}
											onChange={handleInputChange}
											required
										/>
									</label>
								</div>
								<label htmlFor="address">
									<p>
										Address <span className="asterisk">*</span>
									</p>
									<input
										type="text"
										name="address"
										id="address"
										autoComplete="street-address"
										value={formData.address}
										onChange={handleInputChange}
										required
									/>
								</label>
								<label htmlFor="email">
									<p>
										E-mail <span className="asterisk">*</span>
									</p>
									<input
										type="email"
										name="email"
										id="email"
										autoComplete="email"
										value={formData.email}
										onChange={handleInputChange}
										required
									/>
								</label>
								<label htmlFor="phone">
									<p>
										Phone number <span className="asterisk">*</span>
									</p>
									<input
										type="tel"
										name="phone"
										id="phone"
										autoComplete="tel"
										value={formData.phone}
										onChange={handleInputChange}
										required
									/>
								</label>
							</form>
						</div>
						<h2 className="payment-page__delivery-title">
							Select your preferred delivery method
						</h2>
						<div className="payment-page__delivery-container">
							<div className="payment-page__delivery-button-container">
								<Button
									label="Home delivery"
									variant="secondary"
									size="medium"
									type="button"
									active={activeButton === 'home'}
									onClick={() => handleClick('home')}
								/>
								<Button
									label="Click-and-collect"
									variant="secondary"
									size="medium"
									type="button"
									active={activeButton === 'collect'}
									onClick={() => handleClick('collect')}
								/>
								<Button
									label="Postoffice"
									variant="secondary"
									size="medium"
									type="button"
									active={activeButton === 'postoffice'}
									onClick={() => handleClick('postoffice')}
								/>
							</div>

							{/* Home delivery */}
							<div className="payment-page__input-address">
								{displayAddress.length > 0 && (
									<h2>Your order will be shipped to</h2>
								)}
								<ul>
									{displayAddress.map((address, index) => (
										<li key={index}>{address}</li>
									))}
								</ul>
							</div>

							{/* Click and collect */}
							<div className="payment-page__input-collect">
								{displayShipStores.length > 0 && (
									<h2>Your order will be shipped to</h2>
								)}
								{displayShipStores.length > 0 && (
									<>
										{displayShipStores.map((store) => (
											<div
												key={store.id}
												className="payment-page__input-collect-wrapper">
												<label>
													<input type="radio" name="store" value={store.id} />
													<h3>{store.id}</h3>
												</label>
												<ul>
													<li>
														<p>{store.name}</p>
													</li>
													<li>
														<p>{store.hours}</p>
													</li>
												</ul>
											</div>
										))}
									</>
								)}
							</div>

							{/* Postoffice */}
							<div className="payment-page__input-postoffice">
								{displayPostoffice && (
									<h2>
										Your order will be shipped with a FedEx selected postoffice
									</h2>
								)}

								{displayPostoffice && (
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d39741.57337230748!2d-0.1591507!3d51.4976506!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603f2e45a7c63%3A0x5c44f6cd164c4832!2sFedEx!5e0!3m2!1sen!2sdk!4v1765800967279!5m2!1sen!2sdk"
										className="payment-page__input-postoffice-map"
										allowFullScreen=""
										loading="lazy"
										referrerpolicy="no-referrer-when-downgrade"></iframe>
								)}
								{displayPostoffice && (
									<ul>
										<li>
											<label>
												<input type="radio" name="postoffice" id="postoffice" />
												<div>
													<p>
														Postoffice - 4 Leah Close, Edinburgh, United Kingdom
													</p>
												</div>
											</label>
											<hr />
										</li>
										<li>
											<label>
												<input type="radio" name="postoffice" id="postoffice" />
												<div>
													<p>
														Postoffice - 7 The Old School House, Edinburgh,
														United Kingdom
													</p>
												</div>
											</label>
											<hr />
										</li>
										<li>
											<label>
												<input type="radio" name="postoffice" id="postoffice" />
												<div>
													<p>
														Postoffice - 28 Thwaites Oak Close, Edinburgh,
														United Kingdom
													</p>
												</div>
											</label>
										</li>
									</ul>
								)}
							</div>
						</div>
						<h2 className="payment-page__payment-method-title">
							Choose payment method
						</h2>
						<div className="payment-page__payment-method-container">
							<ul>
								<li>
									<input
										type="radio"
										name="paymentMethod"
										value="credit-card"
									/>
									<div>
										<img src={stripeIcon} alt="stripe icon" />
										<img src={visaIcon} alt="visa icon" />
										<img src={masterCardIcon} alt="mastercard icon" />
									</div>
									Pay with credit card
								</li>
								<li>
									<input type="radio" name="paymentMethod" value="paypal" />
									<img src={paypalIcon} alt="paypal icon" />
									Pay with Paypal
								</li>
								<li>
									<input type="radio" name="paymentMethod" value="applepay" />
									<img src={applepayIcon} alt="applepay icon" />
									Pay with Apple pay
								</li>
							</ul>
						</div>
					</div>
					<div className="payment-page__second-column-wrapper">
						<div className="payment-page__payment-overview-container">
							<div className="payment-page__payment-overview-wrapper">
								<h2 className="payment-page__payment-overview-title">
									Payment overview
								</h2>

								<ul className="payment-page__payment-overview-list">
									{cartItems.map((item) => (
										<li key={item.id}>
											<div className="payment-page__payment-overview-item">
												<p className="payment-page__payment-overview-item-model">
													{item.model}
												</p>
												<p className="payment-page__payment-overview-item-quantity">
													Qty: {item.quantity}
												</p>
												<p className="payment-page__payment-overview-item-price">
													£ {(item.price * item.quantity).toLocaleString()}
												</p>
											</div>
										</li>
									))}
								</ul>

								<div className="payment-page__payment-total">
									<p>Price </p>
									<p>£{getCartTotal().toLocaleString()}</p>
								</div>
								<hr />
								<div className="payment-page__payment-total-vat">
									<ul>
										<li>
											<p>Delivery price </p>
											<p>£4.00</p>
										</li>
										<li>
											<p>VAT</p>
											<p>£{((getCartTotal() / 100) * 25).toLocaleString()}</p>
										</li>
									</ul>

									<div className="payment-page__payment-total-vat-price">
										<p>Total price</p>
										<p>
											£
											{(
												getCartTotal() +
												(getCartTotal() / 100) * 25 +
												4
											).toLocaleString()}
										</p>
									</div>
								</div>
							</div>
							<div className="payment-page__radio-buttons">
								<ul>
									<li>
										<label htmlFor="newsletter">
											<input
												type="checkbox"
												name="newsletter"
												id="newsletter"
											/>
											<p>Subscribe to newsletter</p>
										</label>
									</li>
									<li>
										<label htmlFor="terms">
											<input type="checkbox" name="terms" id="terms" />
											<p>
												I accept the terms of trade{' '}
												<strong>(read in new window)</strong>
											</p>
										</label>
									</li>
								</ul>
							</div>
							<Button
								label="Checkout"
								variant="primary"
								size="medium"
								onClick={handleButtonClick}
							/>
						</div>
					</div>
				</div>
			</main>
			<FooterComponent />
		</div>
	);
}
