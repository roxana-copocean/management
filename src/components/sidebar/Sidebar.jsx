import React from 'react';
import { NavLink } from 'react-router-dom';
import dashboard from '../../assets/dashboard-tile-setting-svgrepo-com.svg';
import add from '../../assets/add-svgrepo-com.svg';
import './Sidebar.css';
export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					{/* avatar and username */}
					<p>Hi user!</p>
				</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
								<img src={dashboard} alt="dashboard" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create" className={({ isActive }) => (isActive ? 'active' : '')}>
								<img src={add} alt="add" />
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
