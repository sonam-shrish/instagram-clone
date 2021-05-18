import React from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';

const Post = ({ username, imageUrl, caption }) => {
	console.log('Im rendering');
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
		</div>
	);
};

export default Post;
