import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { registerUser, selectAuth, clear } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export type RegisterFormState = {
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

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { isError, isLoading, isSuccess, user, message } =
		useAppSelector(selectAuth);

	const [formFields, setFormFields] = useState(initialRegisterState);
	// conditionally disabling the button
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (isSuccess && user) {
			navigate('/boards');
			dispatch(clear());
			return;
		}

		if (isError) {
			const timeout = setTimeout(() => {
				dispatch(clear());
			}, 5000);

			return () => clearTimeout(timeout);
		}
	}, [isSuccess, isError, user, dispatch, navigate]);

	// Validation
	useEffect(() => {
		if (!formFields.username || formFields.username.length < 2) {
			setDisabled(true);
		} else if (
			formFields.password !== formFields.passwordConfirm ||
			!formFields.password ||
			!formFields.passwordConfirm
		) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [formFields.username, formFields.password, formFields.passwordConfirm]);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(registerUser(formFields));

		setFormFields(initialRegisterState);
	};

	return (
		<form className='form form-register' onSubmit={(e) => handleFormSubmit(e)}>
			<h1 className='form-title'>register</h1>
			{isError && message && (
				<p style={{ color: 'red', opacity: '0.5', fontSize: '12px' }}>
					{message}
				</p>
			)}
			<div className='form-control'>
				<label htmlFor='username'>name</label>
				<input
					type='text'
					name='username'
					id='username'
					placeholder='Your username'
					autoComplete='off'
					value={formFields.username}
					onChange={(e) => {
						setFormFields({
							...formFields,
							[e.target.name]: e.target.value,
						});
					}}
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='password'>password</label>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Your password'
					autoComplete='off'
					value={formFields.password}
					onChange={(e) => {
						setFormFields({
							...formFields,
							[e.target.name]: e.target.value,
						});
					}}
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='passwordConfirm'>confirm password</label>
				<input
					type='password'
					name='passwordConfirm'
					id='passwordConfirm'
					placeholder='Confirm your password'
					autoComplete='off'
					value={formFields.passwordConfirm}
					onChange={(e) => {
						setFormFields({
							...formFields,
							[e.target.name]: e.target.value,
						});
					}}
				/>
			</div>
			<small onClick={() => setFormType('login')}>
				Already have an account ? - Login
			</small>

			{isLoading ? (
				<button type='submit' className='form-btn' disabled={disabled}>
					loading
				</button>
			) : (
				<button type='submit' className='form-btn' disabled={disabled}>
					register
				</button>
			)}
		</form>
	);
};

export default RegisterForm;
