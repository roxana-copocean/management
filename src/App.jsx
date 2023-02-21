import './App.css';
import React from 'react';

import { Route, Routes } from 'react-router-dom';
// Pages
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Create from './pages/create/Create';

// Components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
	return (
		<div className="App">
			<Sidebar />
			<div className="container">
				<React.Fragment>
					<Navbar />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/create" element={<Create />} />
						<Route path="/project/:id" element={<Project />} />
					</Routes>
				</React.Fragment>
			</div>
		</div>
	);
}

export default App;
