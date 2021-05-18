import './App.css';
import Post from './components/Post';
import { useState } from 'react';

function App() {
	const [posts, setPosts] = useState([
		{
			username: 'Sonam Shrish Magar',
			caption:
				"You've gone thru the finest school alrigh miss lonely but u know u only used to get juiced in it",
			imgUrl:
				'https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/128066231_101825875120995_2278377534081368595_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=5IyAwFgkW7YAX8REgGo&_nc_ht=scontent.fktm8-1.fna&oh=54bc15bfba7199dfccb491cca63e4c6f&oe=60C96976',
		},
		{
			_id: 1,
			username: 'Nirzal Mahat',
			caption: 'I am a django developer.May DJESUS CHRIST! bless yall',
			imgUrl:
				'https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/131981824_1958814704260075_5497502334936332706_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=y8ACx3a-_wUAX8ex2bI&_nc_ht=scontent.fktm8-1.fna&oh=44e80d3aa31629e83fdf6c0d8591bab7&oe=60C83201',
		},
		{
			_id: 2,
			username: 'Mick Jaggaer',
			caption: 'Graceless lady, u know who I am',
			imgUrl:
				'https://upload.wikimedia.org/wikipedia/commons/1/10/The_Rolling_Stones_Summerfest_in_Milwaukee_-_2015.jpg',
		},
	]);

	return (
		<div className='App'>
			<div className='app__header'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/320px-Instagram_logo.svg.png'
					alt='header image'
					className='app__headerImg'
				/>
			</div>
			{posts.map((post) => (
				<Post
					username={post.username}
					caption={post.caption}
					imageUrl={post.imgUrl}
				/>
			))}
			Hello
		</div>
	);
}

export default App;
