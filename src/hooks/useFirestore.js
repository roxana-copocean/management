// Use Firestore Hook
// Use Firestore Hook

import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

// the response state object
let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { document: null, isPending: true, error: null, success: false };
		case 'ADDED_DOCUMENT':
			return { isPending: false, document: action.payload, success: true, error: null };
		case 'ERROR':
			return {
				document: null,
				isPending: false,
				error: action.payload,
				success: false
			};
		case 'DELETED_DOC':
			return {
				document: null,
				isPending: false,
				error: null,
				success: true
			};
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [ response, dispatch ] = useReducer(firestoreReducer, initialState);
	const [ isCancelled, setIsCancelled ] = useState(false);

	// collection ref
	const ref = projectFirestore.collection(collection);

	// only dispatch if not cancelled
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// add document

	const addDocument = async (doc) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await ref.add({ ...doc, createdAt });
			dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
		} catch (error) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
		}
	};

	// delete document

	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			await ref.doc(id).delete();
			dispatchIfNotCancelled({ type: 'DELETED_DOC' });
		} catch (error) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return {
		addDocument,
		deleteDocument,
		response
	};
};
