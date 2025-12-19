import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
	return useContext(CartContext);
}

export function CartProvider({ children }) {
	// setup cart from localstorage or an empty array
	const [cartItems, setCartItems] = useState(() => {
		try {
			const savedCart = localStorage.getItem('cartItems');
			return savedCart ? JSON.parse(savedCart) : [];
		} catch (error) {
			console.error('Error parsing cart from localStorage:', error);
			localStorage.removeItem('cartItems'); // Clear corrupted data
			return [];
		}
	});

	//Save to localStorage whenever cartItems changes
	useEffect(() => {
		try {
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		} catch (error) {
			console.error('Error saving cart to localStorage:', error);
		}
	}, [cartItems]);

	function addToCart(product) {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === product.id);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevItems, { ...product, quantity: 1 }];
		});
	}

	function removeFromCart(productId) {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
	}

	function updateQuantity(productId, quantity) {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		);
	}

	function getCartTotal() {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	}

	function getCartCount() {
		return cartItems.reduce((count, item) => count + item.quantity, 0);
	}

	function clearCart() {
		setCartItems([]);
		localStorage.removeItem('cartItems');
	}

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				getCartTotal,
				getCartCount,
				clearCart
			}}>
			{children}
		</CartContext.Provider>
	);
}
