import { useState } from 'react';
import LoginForm from '../components/login-form/LoginForm';
import RegisterForm from '../components/register-form/RegisterForm';

const AuthPage = () => {
	const [formType, setFormType] = useState<'login' | 'register'>('register');

	return (
		<>
			<header>
				<nav className='nav'>
					<div className='nav__logo'>KANBANA</div>
					<div className='nav__cta'>
						<button
							type='button'
							className='btn'
							onClick={() => setFormType('login')}
						>
							login
						</button>
						<button
							type='button'
							className='btn'
							onClick={() => setFormType('register')}
						>
							register
						</button>
					</div>
				</nav>
			</header>
			<section>
				{formType === 'login' ? <LoginForm /> : <RegisterForm />}
			</section>
		</>
	);
};

export default AuthPage;
