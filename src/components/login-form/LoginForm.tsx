import React, { useState } from 'react';

type LoginFormState = {
	username: string;
	password: string;
};

type LoginFormProps = {
	setFormType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
};

const LoginForm = ({ setFormType }: LoginFormProps) => {
	const initialLoginState: LoginFormState = {
		username: '',
		password: '',
	};

	const [formFields, setFormFields] = useState(initialLoginState);

	return (
		<form className='form form-register'>
			<h1 className='form-title'>Login</h1>
			<div className='form-control'>
				<label htmlFor='username'>username</label>
				<input
					type='text'
					name='username'
					id='username'
					placeholder='Your username'
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='password'>password</label>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Your password'
				/>
			</div>

			<small onClick={() => setFormType('register')}>
				Don't have an account ? - Register
			</small>
			<button type='submit' className='form-btn'>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
