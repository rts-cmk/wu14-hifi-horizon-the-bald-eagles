import React from 'react';
import '../styles/_product.scss';

export default function ProductDetail({ product }) {
    if (!product) {
        return null;
    }

    const isAvailable = product['in-stock'];
    const stockStatusText = isAvailable ? 'In Stock' : 'Out of Stock';
    const imagePath = product.image.startsWith('/')
        ? product.image
        : `/${product.image}`;

    const specificationsExist = product.specifications && Object.keys(product.specifications).length > 0;

    return (
        <div className='product-detail'>

            <div className='product-detail__product-content'>
                <img
                    src={imagePath}
                    alt={product.model}
                    className='product-detail__image'
                />
                <div className='product-detail__info'>
                    <h2 className='product-detail__model'>{product.model}</h2>
                    <p className='product-detail__description'>{product.description}</p>
                    <p className='product-detail__brand'>{product.color}</p>
                    <p className='product-detail__price'>£ {product.price},-</p>

                    <div className="product-detail__actions">
                        <div className='product-detail__amount'>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                max="10"
                                defaultValue="1"
                            />
                        </div>
                        <button
                            className="add-to-cart-btn"
                            disabled={!isAvailable}
                        >
                            {isAvailable ? 'Add to cart' : 'Out of Stock'}
                        </button>

                        {stockStatusText}

                        <span className={`product-detail__stock-status
                            product-detail__stock-status--${isAvailable ? 'true' : 'false'}`}>
                        </span>

                    </div>
                </div>
            </div>

            {specificationsExist && (
                <div className="product-detail__specifications">
                    <h2>PRODUCT SPECIFICATION</h2>
                    <table>
                        <tbody>
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}