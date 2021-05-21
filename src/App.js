import './App.css';
import Post from './components/Post';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { Modal, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './components/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);
	const classes = useStyles();
	const [username, setUsername] = useState('enter');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const handleSignIn = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((err) => alert(err.message));
		setOpenSignIn(false);
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((err) => {
				alert(err.message);
				return;
			});
		setOpenSignUp(false);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//logged in compo
				console.log(authUser);
				setUser(authUser);
			} else {
				//logged out compo
				setUser(null);
			}
		});

		return () => {
			//perform cleanup actions
			unsubscribe();
		};
	});
	//getting the posts from firebase
	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
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
			<Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form>
						<center>
							<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/320px-Instagram_logo.svg.png' />
							<Input
								fullWidth
								type='text'
								placeholder='Username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<Input
								fullWidth
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								fullWidth
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type='submit' onClick={handleSignUp}>
								Sign Up
							</Button>
						</center>
					</form>
				</div>
			</Modal>
			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form>
						<center>
							<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/320px-Instagram_logo.svg.png' />

							<Input
								fullWidth
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								fullWidth
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type='submit' onClick={handleSignIn}>
								Sign In
							</Button>
						</center>
					</form>
				</div>
			</Modal>

			<div className='app__header'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/320px-Instagram_logo.svg.png'
					alt='header image'
					className='app__headerImg'
				/>
				{user ? (
					<Button onClick={() => auth.signOut()}>Sign Out</Button>
				) : (
					<div>
						<Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
						<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
					</div>
				)}
			</div>
			<div className='app_posts'>
				<div className='app_postsLeft'>
					{posts.map(({ id, post }) => (
						<Post
							key={id}
							username={post.username}
							caption={post.caption}
							imageUrl={post.imgUrl}
							postId={id}
							user={user}
						/>
					))}
				</div>
				<div className='app_postsRight'>
					<InstagramEmbed
						url='https://www.instagram/p/B_uf9dmAGPw/'
						maxWidth={320}
						hideCaption={false}
						containerTagName='div'
						protocol=''
						injectScript
						onLoading={() => {}}
						onSuccess={() => {}}
						onAfterRender={() => {}}
						onFailure={() => {}}
					/>
				</div>
			</div>

			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Please log in first to add posts</h3>
			)}
		</div>
	);
}

export default App;
