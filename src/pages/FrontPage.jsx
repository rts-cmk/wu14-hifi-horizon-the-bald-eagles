import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_front.scss';

export default function FrontPage() {
	const [popularProducts, setPopularProducts] = useState([]);
	const [newsletterEmail, setNewsletterEmail] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/api/products/random')
			.then(res => res.json())
			.then(data => {

				const source = Array.isArray(data) ? data[0] : data;

				if (!source) return;

				const flattenedProducts = [];

				Object.keys(source).forEach(category => {
					if (category !== '_id' && category !== '__v' && typeof source[category] === 'object') {
						const brands = source[category];

						Object.keys(brands).forEach(brandName => {
							const productsInBrand = brands[brandName];

							Object.keys(productsInBrand).forEach(productKey => {
								const details = productsInBrand[productKey];

								flattenedProducts.push({
									id: `${category}-${brandName}-${productKey}`.replace(/\s+/g, '-').toLowerCase(),
									brand: brandName,
									category: category,
									name: productKey,
									price: details.price,
									imageUrl: details.image
										? `http://localhost:3000/${details.image}`
										: 'https://via.placeholder.com/150',
								});
							});
						});
					}
				});

				const shuffled = flattenedProducts.sort(() => 0.5 - Math.random());
				setPopularProducts(shuffled.slice(0, 4));
			})
			.catch(err => console.error('Error fetching popular products:', err));
	}, []);

	const handleNewsletterSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: newsletterEmail })
			});
			if (response.ok) {
				alert('Subscribed successfully!');
				setNewsletterEmail('');
			}
		} catch (err) {
			alert('Something went wrong. Please try again later');
		}
	};

	return (
		<div className="front-page">
			<HeaderComponent />
			<section className="hero-section">
				<video
					autoPlay
					muted
					loop
					playsInline={true}
					className="hero-video">
					<source src="https://cdn.pixabay.com/video/2022/06/20/121112-724685793_large.mp4" />
				</video>
			</section>

			<section className="popular-products-section">
				<h2>POPULAR PRODUCTS</h2>
				<Link to="/shop" className="popular-products-section__see-all-products-btn">
					See all products
				</Link>
				<div className="products-grid">
					{popularProducts.length > 0 ? (
						popularProducts.map((product, index) => (
							<div key={`${product.brand}-${product.name}-${index}`} className="product-card">
								<div className="product-card__image-container">
									<img src={product.imageUrl} alt={product.name} />
								</div>
								<div className="product-card__info">
									<h3>{product.brand}</h3>
									<h4>{product.name}</h4>
									<p className="price">£ {product.price},-</p>
									<Link
										to={`/product/${product.id}`}
										className="view-btn">Read more</Link>
								</div>
							</div>
						))
					) : (
						<p>Loading popular products...</p>
					)}
				</div>
			</section>

			<section className="info-section">
				<div className="info-box">
					<div className="info-box__left-side">
						<h2>What we do</h2>
						<p>We look forward to customising a system to meet your needs.</p>
						<p>We don’t favour one manufacturer over another – the only thing we do favour is making sure our customers get the right product that suits their needs and listening preferences. We will ask many questions in order to ensure that what you buy from us is tailored to you and you alone.</p>
						<p>If you are looking for a product not found in our demonstration showrooms or our online site, don’t fret as we have access to hundreds of brands.</p>
						<p>One of our biggest pleasures of working in this industry is to see the smile on our customers’ faces when they finally hear and see the system of their dreams.</p>
					</div>
					<div className="info-box__right-side">
						<h2>Opening hours</h2>
						<p><strong>Edinburgh</strong></p>
						<p>2 Joppa Rd,Edinburgh, EH15 2EU</p>
						<p>Monday to Friday: 10:00am - 5:30pm</p>
						<p>Saturday: 10:00am - 5:30pm</p>
						<p>Sunday: Closed</p>

						<p><strong>Falkirk</strong></p>
						<p>44 Cow Wynd, Falkirk, Central Region, FK1 1PU</p>
						<p>Monday to Friday: 10:00am - 5:30pm</p>
						<p>Saturday - By appointment only</p>
						<p>Sunday: Closed</p>

					</div>
				</div>
			</section>

			<section className="newsletter-section">
				<h2>SIGN UP FOR OUR NEWSLETTER</h2>
				<p>Subscribing to our newsletter secures you up to date information about HiFi Horizons latest updater and offers.</p>
				<div className="newsletter-container">
					<form onSubmit={handleNewsletterSubmit}>
						<input
							type="email"
							required value={newsletterEmail}
							onChange={(e) => setNewsletterEmail(e.target.value)}
						/>
						<button type="submit">Sign Up</button>
					</form>
				</div>
			</section>
			<FooterComponent />
		</div>
	);
}
