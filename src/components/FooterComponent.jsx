import React from 'react';
import '../styles/_footer.scss';
import { Link } from 'react-router';
import phoneIcon from '../assets/icons/phone.svg';
import facbookIcon from '../assets/social/facebook.svg';
import twitterIcon from '../assets/social/twitter.svg';
import instagramIcon from '../assets/social/ig.svg';
import youtubeIcon from '../assets/social/youtube.svg';
import stripeIcon from '../assets/pay/stripe.svg';
import visaIcon from '../assets/pay/visa.svg';
import mastercardIcon from '../assets/pay/mastercard.svg';

export default function FooterComponent() {
	return (
		<footer className="footer">
			<div className="footer__footer-content">
				<ul className="footer__nav">
					<li className="footer__nav-item">
						<Link to="/">Home</Link>
					</li>
					<li className="footer__nav-item">
						<Link to="/shop">SHOP</Link>
					</li>
					<li className="footer__nav-item">
						<Link to="/about">ABOUT US</Link>
					</li>
				</ul>

				<ul className="footer__tc">
					<li className="footer__tc-item">
						<Link to="#">Returns & Refunds</Link>
					</li>
					<li className="footer__tc-item">
						<Link to="#">Delivery</Link>
					</li>
					<li className="footer__tc-item">
						<Link to="#">Privacy Policy</Link>
					</li>
					<li className="footer__tc-item">
						<Link to="#">Terms & Conditions</Link>
					</li>
				</ul>

				<ul className="footer__contact">
					<li className="footer__contact-item">Contact</li>
					<li className="footer__contact-item">
						2 Joppa Rd, Edinburgh, EH15 2EU
					</li>
					<li className="footer__contact-item">
						<img
							src={phoneIcon}
							alt="phone icon"
							className="footer__contact-item-phone"
						/>{' '}
						0131 556 7901
					</li>
					<li className="footer__contact-item">
						44 Cow Wynd, Falkirk, Central Region, FK1 1PU
					</li>
					<li className="footer__contact-item">
						<img
							src={phoneIcon}
							alt="phone icon"
							className="footer__contact-item-phone"
						/>{' '}
						01324 629 011
					</li>
					<li className="footer__contact-item">
						<ul className="footer__contact-item-socials-ul">
							<li>
								<Link to="https://facebook.com">
									<img
										src={facbookIcon}
										alt="facebook icon"
										className="footer__contact-item-socials-icon"
									/>{' '}
								</Link>
							</li>
							<li>
								<Link to="https://twitter.com">
									<img
										src={twitterIcon}
										alt="twitter icon"
										className="footer__contact-item-socials-icon"
									/>{' '}
								</Link>
							</li>
							<li>
								<Link to="https://instagram.com">
									<img
										src={instagramIcon}
										alt="instagram icon"
										className="footer__contact-item-socials-icon"
									/>{' '}
								</Link>
							</li>
							<li>
								<Link to="https://youtube.com">
									<img
										src={youtubeIcon}
										alt="youtube icon"
										className="footer__contact-item-socials-icon"
									/>{' '}
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div className="footer__horizontal-line"></div>
			<div className="footer__payment-methods">
				<ul className="footer__payment-methods-ul">
					<li>
						<img
							src={stripeIcon}
							alt="stripe icon"
							className="footer__payment-methods-icon"
						/>{' '}
					</li>
					<li>
						<img
							src={visaIcon}
							alt="visa icon"
							className="footer__payment-methods-icon"
						/>{' '}
					</li>
					<li>
						<img
							src={mastercardIcon}
							alt="mastercard icon"
							className="footer__payment-methods-icon"
						/>{' '}
					</li>
				</ul>

				<ul className="footer__payment-methods-ul-business-details">
					<li className="footer__payment-methods-li-business-details">
						HiFi Horizon (Edinburgh) Ltd is registered in Scotland. No:
						SC049298. Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
					</li>
					<li className="footer__payment-methods-li-business-details">
						Designed by WU07 :)
					</li>
				</ul>
			</div>
		</footer>
	);
}
