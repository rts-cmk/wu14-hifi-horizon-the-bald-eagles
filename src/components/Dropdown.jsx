import React from 'react';
import { Link } from 'react-router';
import '../styles/_dropdown.scss';

//context
const DropdownContext = React.createContext({
	open: false,
	setOpen: () => {}
});

//dropdown component
export default function Dropdown({ children, ...props }) {
	const [open, setOpen] = React.useState(false);

	//click listeners for closing dropdown
	React.useEffect(() => {
		//close dropdown
		function close() {
			setOpen(false);
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
			<div className="dropdown">{children}</div>
		</DropdownContext.Provider>
	);
}

//dropdown button
function DropdownButton({ children, ...props }) {
	const { open, setOpen } = React.useContext(DropdownContext);

	//open and close dropdown
	function toggleOpen() {
		setOpen(!open);
	}

	return (
		<button onClick={toggleOpen} className="dropdown-button">
			{children}
		</button>
	);
}

Dropdown.Button = DropdownButton;

//dropdown content

function DropdownContent({ children }) {
	const { open } = React.useContext(DropdownContext);

	return <div className="dropdown-content">{children}</div>;
}

Dropdown.Content = DropdownContent;

//dropdown list for dropdown menu
function DropdownList({ children, ...props }) {
	const { setOpen } = React.useContext(DropdownContext);

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
