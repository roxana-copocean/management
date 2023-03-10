//  SIGNUP HOOK

import { useState, useEffect } from 'react';
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [ isCancelled, setIsCancelled ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ isPending, setIsPending ] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);

		try {
			// sign up the user
			const res = await projectAuth.createUserWithEmailAndPassword(email, password);
			if (!res) {
				throw new Error('Could not complete the signup!');
			}
			//  upload the user profile image
			// we create a folder in the firebase storage, we name it thumbnails, we go to the user/by usingh his id, and we use the name of the picture he uploaded to store it by its name
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
			const imgUrl = await img.ref.getDownloadURL();

			// add display name to user
			await res.user.updateProfile({ displayName, photoURL: imgUrl });

			// creating a user document
			await projectFirestore.collection('users').doc(res.user.uid).set({
				online: true,
				displayName: displayName,
				photoURL: imgUrl
			});

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user });
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
	return {
		signup,
		error,
		isPending
	};
};
