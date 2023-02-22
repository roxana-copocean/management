import './App.css';
import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
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
	const { authIsReady, user } = useAuthContext();
	return (
		<div className="App">
			{authIsReady && (
				<React.Fragment>
					<Sidebar />
					<div className="container">
						<React.Fragment>
							<Navbar />
							<Routes>
								<Route path="/" element={user ? <Dashboard /> : <Navigate replace to="./login" />} />

								<Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
								<Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/" />} />
								<Route path="/create" element={user ? <Create /> : <Navigate replace to="./login" />} />
								<Route
									path="/project/:id"
									element={user ? <Project /> : <Navigate replace to="./login" />}
								/>
							</Routes>
						</React.Fragment>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default App;
