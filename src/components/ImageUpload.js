import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import './ImageUpload.css';

const ImageUpload = ({ username }) => {
	const [caption, setCaption] = useState('');
	const [progress, setProgress] = useState(0);
	const [image, setImage] = useState(null);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
		console.log(e.target.files[0]);
	};
	const handleUpload = () => {
		console.log(image);
		const uploadTask = storage.ref('images/' + image.name).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				//getting the progress

				const currProgress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(currProgress);
			},
			(error) => {
				//error handling
				alert(error.message);
			},
			() => {
				//on completion
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						console.log(url);
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							imgUrl: url,
							caption: caption,
							username: username,
						});
					});
				setProgress(0);
				setCaption('');
				setImage(null);
			}
		);
	};
	return (
		<div className='imageupload'>
			<progress className='imageupload_progress' value={progress} max='100' />
			<input
				type='text'
				placeholder='enter caption'
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>
			<input type='file' onChange={handleChange} />
			<Button onClick={handleUpload}>Upload</Button>
		</div>
	);
};

export default ImageUpload;
