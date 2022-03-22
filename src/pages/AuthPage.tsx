import { useEffect, useState } from 'react';
import LoginForm from '../components/login-form/LoginForm';
import RegisterForm from '../components/register-form/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectAuth } from '../features/auth/authSlice';

const AuthPage = () => {
	const [formType, setFormType] = useState<'login' | 'register'>('register');
	const navigate = useNavigate();
	const { user } = useAppSelector(selectAuth);

	useEffect(() => {
		if (user) {
			navigate('/boards');
		}
	}, [user, navigate]);

	return (
		<>
			<header className='header'>
				<nav className='nav'>
					<div className='logo'>KANBANA</div>
					<div className='nav__cta'>
						<button
							type='button'
							className={`btn ${formType === 'login' && 'active'}`}
							onClick={() => setFormType('login')}
						>
							login
						</button>
						<button
							type='button'
							className={`btn ${formType === 'register' && 'active'}`}
							onClick={() => setFormType('register')}
						>
							register
						</button>
					</div>
				</nav>
			</header>
			<section className='section auth-section'>
				{formType === 'login' ? (
					<LoginForm setFormType={setFormType} />
				) : (
					<RegisterForm setFormType={setFormType} />
				)}
			</section>
			<small className='section auth-info auth-section'>
				Once you {`${formType === 'login' ? 'login' : 'register'}`}, you'll be
				navigated to boards page where you can create boards and invite members
				to collaborate with people.
			</small>
		</>
	);
};

export default AuthPage;
