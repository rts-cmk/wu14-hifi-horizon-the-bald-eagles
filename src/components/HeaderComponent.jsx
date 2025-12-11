import React from 'react';
import '../styles/_header.scss';
import { Link, NavLink, useLocation } from 'react-router';
import logo from '../assets/logo/nav-logo.svg';
import cart from '../assets/icons/cart.svg';
import profile from '../assets/icons/profile.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import Dropdown from './Dropdown';

export default function HeaderComponent() {
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
		<header className="header">
			<nav className="nav">
				<ul className="nav__nav-list">
					<li className="nav__nav-item">
						<Link to="/">
							<img src={logo} alt="hifi logo" />
						</Link>
					</li>
					<li className="nav__nav-item">
						{/* <Link to="/shop">SHOP</Link> */}
						<Dropdown>
							<Dropdown.Button>SHOP</Dropdown.Button>
							<Dropdown.Content>
								<Dropdown.List>
									<h2 className="dropdown-content-heading">
										Browse Categories
									</h2>
									<Dropdown.Item to="/shop/">CD Players</Dropdown.Item>
									<Dropdown.Item to="/shop/">DVD Players</Dropdown.Item>
									<Dropdown.Item to="/shop/">Preamps</Dropdown.Item>
									<Dropdown.Item to="/shop/">Speakers</Dropdown.Item>
									<Dropdown.Item to="/shop/">Turntables</Dropdown.Item>
									<Dropdown.Item to="/shop/">
										Integrated Amplifiers
									</Dropdown.Item>
									<Dropdown.Item to="/shop/">Power Amplifiers</Dropdown.Item>
									<Dropdown.Item to="/shop/">Tube Amplifiers</Dropdown.Item>
								</Dropdown.List>
							</Dropdown.Content>
						</Dropdown>
					</li>
					<li className="nav__nav-item">
						<NavLink
							to="/about"
							style={({ isActive }) => {
								return {
									fontWeight: isActive ? 'bold' : ''
								};
							}}>
							ABOUT US
						</NavLink>
					</li>
					<li className="nav__nav-item">
						<NavLink
							to="/contact"
							style={({ isActive }) => {
								return {
									fontWeight: isActive ? 'bold' : ''
								};
							}}>
							CONTACT US
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="side-nav">
				<form className="side-nav__form">
					<input
						type="search"
						name="search"
						className="side-nav__site-search"
						placeholder="Search product..."
					/>
					<button className="side-nav__search-button">
						<img
							src={searchIcon}
							alt="search icon"
							className="side-nav__search-button-icon"
						/>
					</button>
				</form>
				<ul className="side-nav__ul">
					{' '}
					<li className="side-nav__nav-item">
						<Link to="/profile">
							<img
								src={profile}
								alt=""
								className="side-nav__nav-item-profile-icon"
							/>
						</Link>
					</li>
					<li className="side-nav__nav-item">
						<Dropdown>
							<Dropdown.Button>
								<div className="side-nav__nav-item-cart-container">
									<img
										src={cart}
										alt="cart"
										className="side-nav__nav-item-cart-icon"
									/>
									<span
										className="side-nav__nav-item-cart-underline"
										style={{
											display:
												isCartPage || isPaymentPage || isInvoicePage
													? 'block'
													: 'none'
										}}></span>
									<span className="side-nav__nav-item-cart-counter">0</span>
								</div>
							</Dropdown.Button>
							<Dropdown.Content>
								<h2>Cart</h2>
								<p>Sub total:</p>
								<Link to="/cart/">
									{' '}
									<input type="button" value="Go to cart" />
								</Link>
								<input type="button" value="Go to payment" />
							</Dropdown.Content>
						</Dropdown>
					</li>
				</ul>
			</div>
		</header>
	);
}
