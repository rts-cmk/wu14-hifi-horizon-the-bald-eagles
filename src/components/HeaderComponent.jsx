// HeaderComponent.jsx

import React, { useState } from 'react';
import '../styles/_header.scss';
// IMPORTS UPDATED: Using 'react-router' as specified
import { Link, NavLink } from 'react-router'; 
import logo from '../assets/logo/nav-logo.svg';
import cart from '../assets/icons/cart.svg';
import profile from '../assets/icons/profile.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import Dropdown from './Dropdown'; // Assuming this component exists

// Component now accepts props for search and category filtering
export default function HeaderComponent({ setSearchTerm, setSelectedCategory, allCategories }) {
    
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    // Handle typing in the search bar (updates filter state in ShopPage)
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setLocalSearchTerm(value);
        setSearchTerm(value); 
        setSelectedCategory(''); // Optional: Clear category filter on new search
    };

    // Prevent the form from performing a default HTML submission (page reload)
    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };
    
    // Function to handle category click from the dropdown
    const handleCategoryClick = (categorySlug) => {
        setSelectedCategory(categorySlug);
        setSearchTerm(''); // Clear search filter when selecting a category
        setLocalSearchTerm(''); // Clear local search state
    }
    
    // Helper to clean up category slugs for display
    const formatCategoryForDisplay = (slug) => {
        if (!slug) return 'ALL PRODUCTS';
        
        const translations = {
            'cdafspillere': 'CD PLAYERS',
            'dvdafspillere': 'DVD PLAYERS',
            'forforstærkere': 'PREAMPS',
            'højtalere': 'SPEAKERS',
            'pladespillere': 'TURNTABLES',
            'intforstærker': 'INTEGRATED AMPLIFIERS',
            'effektforstærkere': 'POWER AMPLIFIERS',
            'rørforstærkere': 'TUBE AMPLIFIERS'
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
                                    
                                    {/* Link for All Products (Clears filter) */}
                                    <Dropdown.Item 
                                        to="/shop" 
                                        onClick={() => handleCategoryClick('')}
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