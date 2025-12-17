import React, { useState } from 'react';
import '../styles/_header.scss';
import { Link, NavLink, useLocation } from 'react-router';
import logo from '../assets/logo/nav-logo.svg';
import cart from '../assets/icons/cart.svg';
import profile from '../assets/icons/profile.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import Dropdown from './Dropdown';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import Button from './Button.jsx';

export default function HeaderComponent() {
	const {
		cartItems,
		getCartTotal,
		getCartCount,
		updateQuantity,
		removeFromCart
	} = useCart();
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
						<Dropdown type="shop">
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
					<button type="submit" className="side-nav__search-button">
						<img
							src={searchIcon}
							alt="search icon"
							className="side-nav__search-button-icon"
						/>
					</button>
				</form>

				<ul className="side-nav__list">
					<li className="side-nav__nav-item">
						<Dropdown type="cart">
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
									<span className="side-nav__nav-item-cart-counter">
										{getCartCount()}
									</span>
								</div>
							</Dropdown.Button>
							<Dropdown.Content>
								<div className="dropdown-cart">
									<div className="dropdown-cart__header">
										<h2>Cart</h2>
										<p>({cartItems.length} items)</p>
									</div>
									{cartItems.length === 0 ? (
										<p>Your cart is empty</p>
									) : (
										<>
											{cartItems.map((item) => (
												<div key={item.id} className="dropdown-cart__item">
													<div className="dropdown-cart__item-products">
														<button
															onClick={() => removeFromCart(item.id)}
															className="dropdown-cart__item-remove">
															×
														</button>
														<img
															src={item.image}
															alt={item.model}
															className="dropdown-cart__item-image"
														/>
														<div className="dropdown-cart__item-details">
															<p className="dropdown-cart__item-details-title">
																{item.model}
															</p>
															<div className="dropdown-cart__item-details-stock-container">
																<p className="dropdown-cart__item-stock">
																	In stock
																</p>
																<span className="dropdown-cart__item-stock-icon"></span>
															</div>
														</div>
													</div>

													<div className="dropdown-cart__item-quantity-price">
														<div className="dropdown-cart__item-quantity">
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity - 1)
																}>
																−
															</button>
															<span>{item.quantity}</span>
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity + 1)
																}>
																+
															</button>
														</div>
														<p className="dropdown-cart__item-price">
															£ {item.price.toLocaleString()}
														</p>
													</div>
												</div>
											))}
											<div className="dropdown-cart__total">
												<p>Sub total: </p>
												<p>£ {getCartTotal().toLocaleString()}</p>
											</div>
										</>
									)}
									<div className="button-container">
										<Link to="/cart/">
											<Button
												label="Go to cart"
												variant="primary"
												size="medium"
											/>
										</Link>
										<Link to="/payment/">
											<Button
												label="Go to payment"
												variant="primary"
												size="medium"
											/>
										</Link>
									</div>
								</div>
							</Dropdown.Content>
						</Dropdown>
					</li>
				</ul>
			</div>
		</header>
	);
}
