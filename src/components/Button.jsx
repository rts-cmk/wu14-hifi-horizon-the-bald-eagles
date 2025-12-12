import React from 'react';
import '../styles/_Button.scss';

export default function Button({
	label,
	onClick,
	variant = 'primary',
	size = 'medium',
	type = 'button',
	active = 'false',
	fullWidth = false
}) {
	const classNames = [
		'button',
		`button__${variant}`,
		`button__${size}`,
		fullWidth && 'button__full-width',
		active && 'button__active'
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button className={classNames} onClick={onClick} type={type}>
			<span className="button__label">{label}</span>
		</button>
	);
}
