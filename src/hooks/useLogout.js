// Logout Hook

import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
	const [ isCancelled, setIsCancelled ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ isPending, setIsPending ] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		// sign the user out
		try {
			await projectAuth.signOut();
			// dispatch logout function
			dispatch({ type: 'LOGOUT' });

			// update state
			if (!isCancelled) {
				setError(null);
				setIsPending(false);
			}
		} catch (error) {
			if (!isCancelled) {
				console.log(error.message);
				setError(error.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	});

	return { logout, error, isPending };
};
