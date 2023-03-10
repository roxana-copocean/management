// Logout Hook

import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
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
			// update online status
			const { uid } = projectAuth.currentUser;
			await projectFirestore.collection('users').doc(uid).update({ online: false });

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
				setError(error.message);
				setIsPending(false);
				console.log(error.message);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	});

	return { logout, error, isPending };
};
