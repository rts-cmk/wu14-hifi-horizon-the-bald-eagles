import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext.jsx';
import ProductDetail from './ProductDetail.jsx';
import '../styles/_product.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ProductPage() {
    const { id } = useParams();

    const { getProductByID, loading: contextLoading, error: contextError } = useContext(ProductContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (contextLoading) {
            setLoading(true);
            return;
        }
        if (contextError) {
            setError(`Global data error: ${contextError}`);
            setLoading(false);
            return;
        }
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedProduct = getProductByID(id);

                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError(`Lookup <E></E>rror: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        console.log('Fetching product with ID:', id);

        fetchProduct();
    }, [id, getProductByID, contextLoading, contextError]);

    if (loading) {
        return (
            <div className="product-page">
                <HeaderComponent />
                <main>
                    <p>
                        Loading Product Details..
                    </p>
                <FooterComponent />
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page">
                <HeaderComponent />
                <main>
                    <p>
                        Error: {error}
                    </p>
                </main>
                <FooterComponent />
            </div>
        );
    }

    return (
        <div className="product-page">
            <HeaderComponent />
            <main>
                <h2 className='product-page__heading'>PRODUCT</h2>
                <ProductDetail product={product} />
            </main>
            <FooterComponent />
        </div>
    );
}