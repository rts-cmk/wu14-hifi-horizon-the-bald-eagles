import React from 'react';
import '../styles/_nav.scss';
import { Link } from 'react-router';

export default function NavComponent() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">HOME</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">ABOUT US</Link>
                </li>
                <li className="nav-item">
                    <Link to="/brands">BRANDS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/blog">BLOG</Link>
                </li>
                <li className="nav-item">
                    <Link to="/events">EVENTS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/shop">SHOP</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact">CONTACT US</Link>
                </li>
            </ul>
        </nav>
    );
}