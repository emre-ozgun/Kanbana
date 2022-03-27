import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL;

const getCard = async (
	cardId: number | string | undefined,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${baseUrl}/card/${cardId}`, config);

	console.log('DATA FROM GET CARD (CARD SERVICE)');
};

const cardService = {
	getCard,
};

export default cardService;
