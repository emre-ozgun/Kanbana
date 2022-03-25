import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL;

const getUsers = async (token: string | undefined) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${baseUrl}/user`, config);

	const userData = data.map((user: any) => {
		return {
			id: user.id,
			username: user.username,
		};
	});

	return userData;
};

const userListService = {
	getUsers,
};

export default userListService;
