import { LoginFormState } from '../../components/login-form/LoginForm';
import { RegisterFormState } from '../../components/register-form/RegisterForm';
import { setUserToLocalStorage } from '../../utils/authLocalStorage';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL;

// * login service
const login = async (loginCredentials: LoginFormState) => {
	const response = await axios.post(`${baseUrl}/auth/login`, loginCredentials);

	if (response.data.token) {
		setUserToLocalStorage(response.data);
	}

	return response.data;
};

// * register service
const register = async (registerCredentials: RegisterFormState) => {
	const response = await axios.post(
		`${baseUrl}/auth/register`,
		registerCredentials
	);

	if (response.data.token) {
		setUserToLocalStorage(response.data);
	}

	return response.data;
};

const authService = {
	login,
	register,
};

export default authService;
