import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginUser, selectAuth, clear } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export type LoginFormState = {
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

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { isError, isLoading, isSuccess, user, message } =
		useAppSelector(selectAuth);

	const [formFields, setFormFields] = useState(initialLoginState);
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

	useEffect(() => {
		if (!formFields.username || formFields.username.length < 2) {
			setDisabled(true);
		} else if (!formFields.password) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [formFields.username, formFields.password]);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(loginUser(formFields));
		dispatch(clear());

		setFormFields(initialLoginState);
	};

	return (
		<form className='form form-register' onSubmit={(e) => handleFormSubmit(e)}>
			<h1 className='form-title'>Login</h1>
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
					value={formFields.password}
					autoComplete='off'
					onChange={(e) => {
						setFormFields({
							...formFields,
							[e.target.name]: e.target.value,
						});
					}}
				/>
			</div>

			<small onClick={() => setFormType('register')}>
				Don't have an account ? - Register
			</small>

			{isLoading ? (
				<button type='submit' className='form-btn' disabled={disabled}>
					Loading
				</button>
			) : (
				<button type='submit' className='form-btn' disabled={disabled}>
					Login
				</button>
			)}
		</form>
	);
};

export default LoginForm;
