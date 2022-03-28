import axios from 'axios';
import { Card } from '../board/kanbanSlice';

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

	const composedCard: Card = {
		id: data.id,
		title: data.title,
		duedate: data.duedate,
		description: data.description,
		order: data.order,
		listId: data.listId,
		labels: data.labels,
		checklists: data.checklists,
		comments: data.comments,
	};

	return composedCard;
};

const cardService = {
	getCard,
};

export default cardService;
