import { User } from '../features/auth/authTypes';

export const getUserFromLocalStorage = () => {
	const user = JSON.parse(localStorage.getItem('user') || '');
	return user || null;
};

export const setUserToLocalStorage = (user: User) => {
	localStorage.setItem('user', JSON.stringify(user));
};
