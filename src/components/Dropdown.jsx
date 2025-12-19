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
export default function Dropdown({ children, type, ...props }) {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		}

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	return (
		<DropdownContext.Provider value={{ open, setOpen }}>
			<div
				ref={dropdownRef}
				className={`dropdown ${type ? `dropdown--${type}` : ''}`}
				{...props}>
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
