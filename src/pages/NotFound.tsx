import { useAppSelector } from '../hooks';
import { selectAuth } from '../features/auth/authSlice';
import Spinner from '../components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
	const { user } = useAppSelector(selectAuth);
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (user) {
				navigate('/boards');
			} else {
				navigate('/auth');
			}
		}, 3000);

		return () => clearTimeout(timeout);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className='landing-main'>
			<div className='landing-title not-found'>PAGE NOT FOUND</div>
			<div className='landing-cta landing-cta-not-found'>
				<div className='not-found-text'>REDIRECTING</div>
				<div className='not-found-spinner'>
					<Spinner />
				</div>
			</div>
		</main>
	);
};

export default NotFound;
