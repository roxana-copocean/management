//  SIGNUP HOOK

import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [ isCancelled, setIsCancelled ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ isPending, setIsPending ] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (name, email, password) => {
		setError(null);
		setIsPending(true);

		try {
			// sign up the user
			const res = await projectAuth.createUserWithEmailAndPassword(email, password);
			if (!res) {
				throw new Error('Could not complete the signup!');
			}

			// add display name to user
			await res.user.updateProfile({ displayName: name });

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user });
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
	return {
		signup,
		error,
		isPending
	};
};
