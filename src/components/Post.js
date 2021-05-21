import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar, Input, Button } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase';

const Post = ({ username, user, imageUrl, caption, postId }) => {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');
	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.onSnapshot((snapshot) => {
					console.log(snapshot.docs);
					setComments(
						snapshot.docs.map((doc) => {
							doc.data();
						})
					);
				});

			return () => {
				unsubscribe();
			};
		}
	}, [postId]);

	const handlePostComment = (event) => {
		event.preventDefault();
		db.collection('posts').doc(postId).collection('comments').add({
			text: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setComment('');
	};
	console.log(comments);

	return (
		<div className='post'>
			{/* post header: avatar, username */}
			<div className='post__header'>
				<Avatar
					className='post__avatar'
					alt='SonamShrish'
					src='./static/images'
				/>
				<h3>{username}</h3>
			</div>

			{/* image */}
			<img className='post__img' src={imageUrl} alt='' />
			{/* caption */}
			<h4 className='post__text'>
				<strong>{username}</strong>: {caption}
			</h4>
			{comments.map((comments) => {
				<p>
					<strong>{comment.username}</strong>
					{comment.text}
				</p>;
			})}
			<form className='post_commentBox' onSubmit={handlePostComment}>
				<Input
					className='post_commentInput'
					placeholder='Add a comment...'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<Button className='post_submit' type='submit'>
					Post
				</Button>
			</form>
		</div>
	);
};

export default Post;
