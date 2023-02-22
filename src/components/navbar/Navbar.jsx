import './Navbar.css';

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/capybara.svg';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Navbar() {
	const { user } = useAuthContext();
	const { logout, isPending } = useLogout();
	return (
		<nav className="navbar">
			<ul>
				<li className="logo">
					<Link to="/" className="logo_layout">
						<img src={logo} alt="logo" />
						<span>capybara</span>
					</Link>
				</li>
				{!user && (
					<React.Fragment>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</React.Fragment>
				)}
				{user && (
					<li>
						<button className="btn" onClick={logout}>
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}
