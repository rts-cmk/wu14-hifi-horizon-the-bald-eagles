import React, {
	useState,
	useEffect,
	useRef,
	createContext,
	useContext
} from 'react';
import { Link, useLocation } from 'react-router';
import '../styles/_dropdown.scss';

//context
const DropdownContext = createContext({
	open: false,
	setOpen: () => {}
});

//dropdown component
export default function Dropdown({ children, ...props }) {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	//click listeners for closing dropdown
	useEffect(() => {
		//close dropdown
		function close(event) {
			if (!dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		}

		//add / remove event listener
		if (open) {
			window.addEventListener('click', close);
		}

		//cleanup
		return function removeListener() {
			window.removeEventListener('click', close);
		};
	}, [open]); // only runs if the open state changes

	return (
		<DropdownContext.Provider value={{ open, setOpen }}>
			<div ref={dropdownRef} className="dropdown">
				{children}
			</div>
		</DropdownContext.Provider>
	);
}

//dropdown button
function DropdownButton({ children, ...props }) {
	const { open, setOpen } = useContext(DropdownContext);
	const location = useLocation();
	const isShopPage =
		location.pathname === '/shop' || location.pathname.startsWith('/shop/');

	//open and close dropdown
	function toggleOpen() {
		setOpen(!open);
	}

	return (
		<button
			onClick={toggleOpen}
			className="dropdown-button"
			style={{ fontWeight: isShopPage ? 'bold' : 'normal' }}>
			{children}
		</button>
	);
}

Dropdown.Button = DropdownButton;

//dropdown content

function DropdownContent({ children }) {
	const { open } = useContext(DropdownContext);

	if (!open) return null;

	return <div className="dropdown-content">{children}</div>;
}

Dropdown.Content = DropdownContent;

//dropdown list for dropdown menu
function DropdownList({ children, ...props }) {
	const { setOpen } = useContext(DropdownContext);

	return (
		<ul onClick={() => setOpen(false)} className="dropdown-list" {...props}>
			{children}
		</ul>
	);
}
Dropdown.List = DropdownList;

//dropdown items
function DropdownItem({ children, ...props }) {
	return (
		<li>
			<Link id="dropdown-item" {...props}>
				{children}
			</Link>
		</li>
	);
}

Dropdown.Item = DropdownItem;
