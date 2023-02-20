// Use Collection Hook

import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
	const [ documents, setDocuments ] = useState(null);
	const [ error, setError ] = useState(null);

	// I am using a ref so I can excape an inifinte loop as _query is an array, so with every calll is seen as "different"
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	useEffect(
		() => {
			let ref = projectFirestore.collection(collection);
			if (query) {
				ref = ref.where(...query);
			}
			if (orderBy) {
				ref = ref.where(...orderBy);
			}

			const unsubscribe = ref.onSnapshot(
				(snapshot) => {
					let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ ...doc.data(), id: doc.id });
					});
					setDocuments(results);
					setError(null);
				},
				(error) => {
					console.log(error);
					setError('Could not fetch data!');
				}
			);
			return () => unsubscribe();
		},
		[ collection, query, orderBy ]
	);
	return {
		error,
		documents
	};
};
