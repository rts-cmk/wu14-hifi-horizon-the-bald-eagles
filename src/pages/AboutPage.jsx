import React from 'react';
import '../styles/_about.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import historyPhotoOne from '../assets/photos/history-photo-1.png';
import historyPhotoTwo from '../assets/photos/history-photo-2.png';
import historyPhotoThree from '../assets/photos/history-photo-3.png';
import historyPhotoFour from '../assets/photos/history-photo-4.png';

export default function AboutPage() {
	return (
		<div className="about-page">
			<HeaderComponent />
			<header className="about-page__header">
				<h1>Our history</h1>
			</header>
			<main>
				<section id="history">
					<figure>
						<img src={historyPhotoOne} alt="founders" />
					</figure>
					<article>
						<h2>History</h2>
						<p className="sub-title">
							Established in the late 1960s, our family owned business is based
							in Edinburgh and Falkirk, but services customers across the UK.
						</p>
						<p>
							Our Edinburgh branch has the longest history as an audio retailer
							in the UK. During recent renovations, receipts were found from
							Nicolson’s Gramophone Saloon dating back to 1926. In the 1950s WG
							Graham took over the shop and renamed it WG Graham’s HiFi Corner.
							Upon his retirement, Graham Tiso bought the business and
							modernized the name to HiFi Horizon.
						</p>
						<p>
							Soon thereafter a young enthusiastic Colin MacKenzie (left), who
							was recommended by Linn’s own Ivor Tiefenbrun, was employed to
							manage the shop; with a knack for business and years of experience
							in the hi-fi industry, Colin would later become the owner of HiFi
							Horizon. Today, Struan MacKenzie carries on the legacy as the
							company’s Managing Director.
						</p>
					</article>
				</section>
				<section id="difference">
					<article>
						<h2>Hear The Difference</h2>
						<p className="sub-title">
							Book a demonstration at our Edinburgh or Falkirk showrooms.
						</p>
						<p>
							Would you choose a quality car without a test drive? If you are
							familiar with the brand and have great trust in it, you might.
							However, our listening preferences are unique to the individual
							and with many of our customers new to the world of high quality
							sound and vision, we encourage everyone to come in to demonstrate
							the products they are interested in. You’ll find a relaxing and
							comfortable environment in both our Edinburgh and Falkirk premises
							where you can decide for yourself if the kit is right for you. We
							also offer home demonstrations on selected products.
						</p>
						<p>It's our aim to get the right product for you.</p>
						<p>
							Our experts are on hand to guide you through the differences
							between speakers, amplifiers and sources and provide simple
							solutions that suit your needs.
						</p>
					</article>
					<figure>
						<img src={historyPhotoTwo} alt="living room" />
					</figure>
				</section>

				<section id="services">
					<figure>
						<img src={historyPhotoThree} alt="workshop" />
					</figure>
					<article>
						<h2>Services</h2>
						<p className="sub-title">
							Our passion for the products we sell and, for our customers’
							satisfaction simply means that we happily offer additional
							services not found on the high-street.
						</p>
						<p>
							Home Setup - We want to ensure that the equipment you’ve purchased
							from us is installed correctly and sounds perfect; and we happily
							provide this service throughout the UK.
						</p>
						<p>
							Part Exchange – To help you upgrade your system, we offer our
							part-exchange program. We can offer a set price, or sell your old
							kit on your behalf.
						</p>
						<p>
							Turntable Doctor – Our turntable experts have been trained by the
							manufacturers for initial setup, long-term maintenance, and
							upgrading your high quality turntables.
						</p>
						<p>
							Record Cleaning Service – Have some old records that need a bit of
							love? We offer Scotland’s very own professional record cleaning
							service with our bespoke Pro-Ject record cleaner.
						</p>
					</article>
				</section>
				<section id="tailored">
					<article>
						<h2>Tailored For You</h2>
						<p className="sub-title">
							We look forward to customising a system to meet your needs.
						</p>
						<p>
							We don’t favour one manufacturer over another – the only thing we
							do favour is making sure our customers get the right product that
							suits their needs and listening preferences. We will ask many
							questions in order to ensure that what you buy from us is tailored
							to you and you alone.{' '}
						</p>
						<p>
							If you are looking for a product not found in our demonstration
							showrooms or our online site, don’t fret as we have access to
							hundreds of brands.
						</p>
						<p>
							One of our biggest pleasures of working in this industry is to see
							the smile on our customers’ faces when they finally hear and see
							the system of their dreams.{' '}
						</p>
					</article>
					<figure>
						<img src={historyPhotoFour} alt="speakers" />
					</figure>
				</section>
			</main>
			<FooterComponent />
		</div>
	);
}
