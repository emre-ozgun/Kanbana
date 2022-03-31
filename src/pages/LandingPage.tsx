import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectAuth } from '../features/auth/authSlice';

const LandingPage = () => {
	const { user } = useAppSelector(selectAuth);

	return (
		<main className='landing-main'>
			<div className='landing-title'>KANBANA</div>
			<Link to={`${user ? '/boards' : '/auth'}`} className='landing-cta'>
				GET STARTED
			</Link>
		</main>
	);
};

export default LandingPage;
