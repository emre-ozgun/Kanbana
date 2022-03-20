import React, { useState } from 'react';

type RegisterFormState = {
	username: string;
	password: string;
	passwordConfirm: string;
};

type RegisterFormProps = {
	setFormType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
};

const RegisterForm = ({ setFormType }: RegisterFormProps) => {
	const initialRegisterState: RegisterFormState = {
		username: '',
		password: '',
		passwordConfirm: '',
	};

	const [formFields, setFormFields] = useState(initialRegisterState);

	return (
		<form className='form form-register'>
			<h1 className='form-title'>register</h1>
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
			<div className='form-control'>
				<label htmlFor='passwordConfirm'>confirm password</label>
				<input
					type='password'
					name='passwordConfirm'
					id='passwordConfirm'
					placeholder='Confirm your password'
				/>
			</div>
			<small onClick={() => setFormType('login')}>
				Already have an account ? - Login
			</small>
			<button type='submit' className='form-btn'>
				register
			</button>
		</form>
	);
};

export default RegisterForm;
