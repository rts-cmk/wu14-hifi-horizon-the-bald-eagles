import React from 'react';
import '../styles/_header.scss';
import { Link } from 'react-router';
import logo from '../assets/logo/nav-logo.svg';
import cart from '../assets/icons/cart.svg';
import profile from '../assets/icons/profile.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import Dropdown from './Dropdown';

export default function HeaderComponent() {
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
									<h2 className="dropdown-content-heading">Browse Categories</h2>
									<Dropdown.Item>CD Players</Dropdown.Item>
									<Dropdown.Item>DVD Players</Dropdown.Item>
									<Dropdown.Item>Preamps</Dropdown.Item>
									<Dropdown.Item>Speakers</Dropdown.Item>
									<Dropdown.Item>Turntables</Dropdown.Item>
									<Dropdown.Item>Integrated Amplifiers</Dropdown.Item>
									<Dropdown.Item>Power Amplifiers</Dropdown.Item>
									<Dropdown.Item>Tube Amplifiers</Dropdown.Item>
								</Dropdown.List>
							</Dropdown.Content>
						</Dropdown>
					</li>
					<li className="nav__nav-item">
						<Link to="/about">ABOUT US</Link>
					</li>
					<li className="nav__nav-item">
						<Link to="/contact">CONTACT US</Link>
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
						<Link to="/cart">
							<img
								src={cart}
								alt="cart"
								className="side-nav__nav-item-cart-icon"
							/>
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}
