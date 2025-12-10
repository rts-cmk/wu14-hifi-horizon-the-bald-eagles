import React from 'react';
import '../styles/_header.scss';
import { Link } from 'react-router';

export default function HeaderComponent() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/"></Link>
                </li>
                <li className="nav-item">
                    <Link to="/shop">SHOP</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">ABOUT US</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact">CONTACT US</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile"></Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart"></Link>
                </li>
            </ul>
        </nav>
    );
}