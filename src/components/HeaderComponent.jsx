import React, { useState } from 'react';
import '../styles/_header.scss';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../assets/logo/nav-logo.svg';
import cart from '../assets/icons/cart.svg';
import profile from '../assets/icons/profile.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import Dropdown from './Dropdown';
import { useProducts } from '../context/ProductContext.jsx';

// Component now accepts props for search and category filtering
export default function HeaderComponent() {

	const { allCategories } = useProducts();
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem('user'));

	const [localSearchTerm, setLocalSearchTerm] = useState('');

	// Handle typing in the search bar (updates filter state in ShopPage)
	const handleSearchChange = (event) => {
		setLocalSearchTerm(event.target.value);
	};

	// Prevent the form from performing a default HTML submission (page reload)
	const handleSearchSubmit = (event) => {
		event.preventDefault();
		if (localSearchTerm.trim()) {
			navigate(`/shop?q=${encodeURIComponent(localSearchTerm.trim())}`);
		} else {
			navigate('/shop');
		};
	};

	// Function to handle category click from the dropdown
	const handleCategoryClick = () => {
		setLocalSearchTerm('');
	}

	// Helper to clean up category slugs for display
	const formatCategoryForDisplay = (slug) => {
		if (!slug) return 'ALL PRODUCTS';

		const translations = {
			'cdafspillere': 'CD PLAYERS',
			'dvdafspillere': 'DVD PLAYERS',
			'forforstaerkere': 'PREAMPS',
			'hoejtalere': 'SPEAKERS',
			'pladespillere': 'TURNTABLES',
			'intforstaerker': 'INTEGRATED AMPLIFIERS',
			'effektforstaerkere': 'POWER AMPLIFIERS',
			'roerforstaerkere': 'TUBE AMPLIFIERS'
		};

		if (translations[slug]) {
			return translations[slug];
		}

		return slug.replace(/([A-Z])/g, ' $1').toUpperCase();
	}


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
						<Dropdown>
							<Dropdown.Button>SHOP</Dropdown.Button>
							<Dropdown.Content>
								<Dropdown.List>
									<h2 className="dropdown-content-heading">
										Browse Categories
									</h2>

									{/* Link for All Products */}
									<Dropdown.Item
										to="/shop"
										onClick={handleCategoryClick}
									>
										{formatCategoryForDisplay('')}
									</Dropdown.Item>

									{/* Dynamically generated categories from normalized data */}
									{allCategories && allCategories.map(category => (
										<Dropdown.Item
											key={category}
											to={`/shop?category=${category}`}
											onClick={() => handleCategoryClick(category)}
										>
											{formatCategoryForDisplay(category)}
										</Dropdown.Item>
									))}

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
				<form className="side-nav__form" onSubmit={handleSearchSubmit}>
					<input
						type="search"
						name="search"
						className="side-nav__site-search"
						placeholder="Search product..."
						value={localSearchTerm}
						onChange={handleSearchChange}
					/>
					<button className="side-nav__search-button" type="submit">
						<img
							src={searchIcon}
							alt="search icon"
							className="side-nav__search-button-icon"
						/>
					</button>
				</form>
				<ul className="side-nav__ul">
					<li className="side-nav__nav-item">
						{user ? (
							<Dropdown>
								<span>Welcome, {user.fullName}</span>
								<Dropdown.Button>
									<img
										src={profile}
										alt=""
										className="side-nav__nav-item-profile-icon"
									/>
								</Dropdown.Button>
								<Dropdown.Content>
									<Dropdown.List>
										<Dropdown.Item to="/profile">Profile</Dropdown.Item>
										<Dropdown.Item to="/login" onClick={() => {
											localStorage.removeItem('user');
											window.location.href = '/';
										}}>Logout</Dropdown.Item>
									</Dropdown.List>
								</Dropdown.Content>
							</Dropdown>
						) : (
							<Link to="/login">
								<img
									src={profile}
									alt=""
									className="side-nav__nav-item-profile-icon"
								/>
							</Link>
						)}
					</li>
					<li className="side-nav__nav-item">
						<Dropdown>
							<Dropdown.Button>
								<img
									src={cart}
									alt="cart"
									className="side-nav__nav-item-cart-icon"
								/>
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
