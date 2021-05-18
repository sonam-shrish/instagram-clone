import './App.css';
import Post from './components/Post';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const [modalStyle, setModalStyle] = useState(getModalStyle);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		db.collection('posts').onSnapshot((snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}))
			);
		});
	}, []);
	return (
		<div className='App'>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<h2 id='simple-modal-title'>Text in a modal</h2>
					<p id='simple-modal-description'>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</p>
				</div>
			</Modal>
			<Button onClick={() => setOpen(true)}>Sign Up</Button>

			<div className='app__header'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/320px-Instagram_logo.svg.png'
					alt='header image'
					className='app__headerImg'
				/>
			</div>
			{posts.map(({ id, post }) => (
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imageUrl={post.imgUrl}
				/>
			))}
		</div>
	);
}

export default App;
