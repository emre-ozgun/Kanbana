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

const updateCardTitle = async (
	cardId: number,
	newTitle: string,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		`${baseUrl}/card/${cardId}`,
		{ title: newTitle },
		config
	);

	return data.title;
};

const updateCardDescription = async (
	cardId: number,
	newDescription: string | null,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		`${baseUrl}/card/${cardId}`,
		{ description: newDescription || '' },
		config
	);

	return data.description || null;
};

const addCardComment = async (
	cardId: number,
	comment: string,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${baseUrl}/comment`,
		{ cardId, message: comment },
		config
	);

	// * username of the  commenter is unreachable via comment/POST, so this is an additional request to get the username... (GET/cardId => comments => author => username)
	const response = await axios.get(`${baseUrl}/card/${cardId}`, config);

	const cardComment = response.data.comments.find((c: any) => c.id === data.id);

	return cardComment;
};

const deleteCardComment = async ({
	commentId,
	token,
}: {
	commentId: number;
	token: string | undefined;
}) => {};

const cardService = {
	getCard,
	updateCardTitle,
	updateCardDescription,
	addCardComment,
	deleteCardComment,
};

export default cardService;
