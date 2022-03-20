import { useState } from 'react';
import LoginForm from '../components/login-form/LoginForm';
import RegisterForm from '../components/register-form/RegisterForm';

const AuthPage = () => {
	const [formType, setFormType] = useState<'login' | 'register'>('register');

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
				to collaborate with other users.
			</small>
		</>
	);
};

export default AuthPage;
