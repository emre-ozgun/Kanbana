import { User } from '../features/auth/authTypes';

export const getUserFromLocalStorage = () => {
	try {
		return JSON.parse(localStorage.getItem('user') || '');
	} catch (error) {
		return null;
	}
};

export const setUserToLocalStorage = (user: User) => {
	localStorage.setItem('user', JSON.stringify(user));
};
