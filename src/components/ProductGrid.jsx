import React from 'react';
import { Link } from 'react-router';

export default function ProductGrid({ products }) {
    if (products.length === 0) {
        return <p>No products found</p>
    }
    return (
        <div className="product-grid">
            {products.map((product) => (
                    <Link
                        to={'/product/${product.id}'}
                        key={product.id}
                        className="product-grid__item">
                        <img src={product.image} alt="{product.model}" className='product-grid__image' />
                        <h3 className='product-grid__model'>{product.model}</h3>
                        <p className='product-grid__brand'>{product.brand}</p>
                        <p className='product-grid__price'>£ {product.price},-</p>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </Link>
            ))}
        </div>
    );
}