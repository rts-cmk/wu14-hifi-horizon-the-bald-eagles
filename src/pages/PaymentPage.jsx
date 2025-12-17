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

export default function PaymentPage() {
	// Track which button is active: 'home', 'collect', or 'postoffice'
	const [activeButton, setActiveButton] = useState(null);

	const [formData, setFormData] = useState({
		fullName: '',
		zipCode: '',
		city: '',
		address: '',
		email: '',
		phone: ''
	});

	const [displayAddress, setDisplayAddress] = useState('');
	const [displayShipStores, setDisplayShipStores] = useState([]);
	const [displayPostoffice, setDisplayPostoffice] = useState(false);

	function handleClick(buttonType) {
		setActiveButton(buttonType);

		if (buttonType === 'home') {
			const addressString = `${formData.fullName}, ${formData.address}, ${formData.zipCode} ${formData.city}, Email: ${formData.email}, Phone: ${formData.phone}`;
			setDisplayAddress(addressString);
			setDisplayShipStores([]);
			setDisplayPostoffice(false);
		} else if (buttonType === 'collect') {
			const shipToStoreInputs = [
				{
					id: 'edinburgh',
					name: 'Edinburgh - 2 Joppa Rd, Edinburgh, EH15 2EU',
					hours:
						'Monday to Friday: 10:00am - 5:30pm, Saturday: 10:00am - 5:30pm, Sunday: Closed'
				},
				{
					id: 'falkirk',
					name: 'Falkirk - 44 Cow Wynd, Falkirk, Central Region, FK1 1PU',
					hours:
						'Monday to Friday: 10:00am - 5:30pm, Saturday - By appointment only, Sunday: Closed'
				}
			];

			setDisplayShipStores(shipToStoreInputs);
			setDisplayAddress('');
			setDisplayPostoffice(false);
		} else if (buttonType === 'postoffice') {
			setDisplayPostoffice(true);
			setDisplayAddress('');
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
				<h1 className="payment-page__title">Your info</h1>
				<div className="payment-page__info-container">
					<form>
						<label htmlFor="fullName">
							Full Name <span className="asterisk">*</span>:
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
						<label htmlFor="zipCode">
							Zip-code <span className="asterisk">*</span>:
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
							City <span className="asterisk">*</span>:
							<input
								type="text"
								name="city"
								id="city"
								autoComplete="address-level2"
								value={formData.city}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label htmlFor="address">
							Address <span className="asterisk">*</span>:
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
							E-mail <span className="asterisk">*</span>:
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
							Phone number <span className="asterisk">*</span>:
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

				<div className="payment-page__delivery-container">
					<h2 className="payment-page__delivery-title">
						Select your preferred delivery method
					</h2>
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
					<div className="input-address">
						{displayAddress && <h2>Your order will be shipped to</h2>}
						{displayAddress}
					</div>

					{/* Click and collect */}
					<div className="input-collect">
						{displayShipStores.length > 0 && (
							<h2>Your order will be shipped to</h2>
						)}
						{displayShipStores.length > 0 && (
							<ul>
								{displayShipStores.map((store) => (
									<li key={store.id}>
										<label>
											<input type="radio" name="store" value={store.id} />
											<div>
												<strong>{store.name}</strong>
												<p>{store.hours}</p>
											</div>
										</label>
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Postoffice */}
					<div className="input-postoffice">
						{displayPostoffice && (
							<h2>
								Your order will be shipped with a FedEx selected postoffice
							</h2>
						)}

						{displayPostoffice && (
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d39741.57337230748!2d-0.1591507!3d51.4976506!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603f2e45a7c63%3A0x5c44f6cd164c4832!2sFedEx!5e0!3m2!1sen!2sdk!4v1765800967279!5m2!1sen!2sdk"
								width="600"
								height="450"
								style={{ border: 0 }}
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
												Postoffice - 7 The Old School House, Edinburgh, United
												Kingdom
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
												Postoffice - 28 Thwaites Oak Close, Edinburgh, United
												Kingdom
											</p>
										</div>
									</label>
									<hr />
								</li>
							</ul>
						)}
					</div>
				</div>
				<div className="payment-page__payment-method-container">
					<h2 className="payment-page__payment-method-title">
						Choose payment method
					</h2>
					<ul>
						<li>
							<input type="radio" />
							<div>
								<img src={stripeIcon} alt="stripe icon" />
								<img src={visaIcon} alt="visa icon" />
								<img src={masterCardIcon} alt="mastercard icon" />
								Pay with credit card
								<hr />
							</div>
						</li>
						<li>
							<input type="radio" />
							<img src={paypalIcon} alt="paypal icon" />
							Pay with Paypal
							<hr />
						</li>
						<li>
							<input type="radio" />
							<img src={applepayIcon} alt="applepay icon" />
							Pay with Apple pay
						</li>
					</ul>
				</div>
				<div className="payment-page__payment-overview-container"></div>
			</main>
			<FooterComponent />
		</div>
	);
}
