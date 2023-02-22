import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

export default function Signup() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ displayName, setDisplayName ] = useState('');
	const [ thumbnail, setThumbnail ] = useState(null);
	const [ uploadFileError, setUploadFileError ] = useState(null);

	const { error, isPending, signup } = useSignup();

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		signup(email, password, displayName, thumbnail);
		setEmail('');
		setPassword('');
		setThumbnail(null);
		setDisplayName('');
	};

	// upload file(profile picture)
	const handleFileChange = (e) => {
		setThumbnail(null);

		// e.target.files returns a array, so I select the first item of the array
		let selected = e.target.files[0];
		if (!selected) {
			setUploadFileError('Please select a file!');
			return;
		}
		if (!selected.type.includes('image')) {
			setUploadFileError('Selected file must be an image!');
			return;
		}
		if (selected.size > 100000) {
			setUploadFileError('File size must be less than 100kb');
			return;
		}
		setUploadFileError(null);
		setThumbnail(selected);
		console.log('Thumbnail updated');
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign up</h2>
			<label>
				<span>name</span>
				<input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
			</label>
			<label>
				<span>email</span>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			</label>
			<label>
				<span>password</span>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			</label>
			<label>
				<span>profile picture</span>
				<input type="file" required onChange={handleFileChange} />
				{uploadFileError && <p className="error">{uploadFileError}</p>}
			</label>
			{!isPending && <button className="btn">Sign Up</button>}
			{isPending && (
				<button className="btn" disabled>
					Sign Up
				</button>
			)}

			{error && <div className="error">{error}</div>}
		</form>
	);
}
