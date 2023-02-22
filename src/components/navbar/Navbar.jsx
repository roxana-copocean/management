import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/capybara.svg';
import { useLogout } from '../../hooks/useLogout';

export default function Navbar() {
	const { logout, error, isPending } = useLogout();
	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={logo} alt="logo" />
					<span>capybara</span>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">Signup</Link>
				</li>
				<li>
					{!isPending && (
						<button className="btn" onClick={logout}>
							Logout
						</button>
					)}
					{isPending && (
						<button className="btn" disabled>
							Logout
						</button>
					)}
				</li>
			</ul>
		</div>
	);
}
