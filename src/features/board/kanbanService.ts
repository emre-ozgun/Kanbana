import axios from 'axios';
import { List, UpdatePositionParamTypes } from './kanbanSlice';
import { BoardMember, Card } from './kanbanSlice';

const baseUrl = process.env.REACT_APP_URL;

const getBoard = async (
	boardId: string | undefined,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${baseUrl}/board/${boardId}`, config);

	const listsState = data.lists.map((list: any) => {
		return {
			id: list.id,
			order: list.order,
			title: list.title,
			boardId: list.boardId,
			cards:
				list.cards.length > 0
					? list.cards.map((card: any) => {
							return {
								id: card.id,
								title: card.title,
								description: card.description,
								order: card.order,
								listId: card.listId,
								labels: card.labels,
								checklists: card.checklists,
								comments: card.comments,
								duedate: card.duedate,
							};
					  })
					: [],
		};
	});

	const boardState = {
		id: data.id,
		title: data.title,
		ownerId: data.ownerId,
		lists: listsState,
		members:
			data.members.length > 0
				? data.members.map((member: any) => ({
						username: member.username,
						boardMemberId: member.BoardMember.id,
				  }))
				: [],
	};

	return boardState;
	// id from params
	// token from user
	// baseUrl/board/id <== URL
};

const deleteBoard = async (boardId: number, token: string | undefined) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.delete(`${baseUrl}/board/${boardId}`, config);
};

const leaveBoard = async (boardMemberId: number, token: string | undefined) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.delete(`${baseUrl}/board-member/${boardMemberId}`, config);

	return boardMemberId;
};

const editBoardTitle = async (
	boardId: string | number,
	newTitle: string,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		`${baseUrl}/board/${boardId}`,
		{ title: newTitle },
		config
	);

	return data.title;
};

const inviteMembersToBoard = async (
	boardId: string | number | undefined,
	members: BoardMember[],
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const invitedMembers: BoardMember[] = [];

	for (let member of members) {
		const memberComposed = {
			username: member.username,
			boardMemberId: Infinity,
		};

		const { data } = await axios.post(
			`${baseUrl}/board-member`,
			{ username: member.username, boardId: Number(boardId) },
			config
		);

		memberComposed.boardMemberId = data.id;

		invitedMembers.push(memberComposed);
	}

	return invitedMembers;
};

// ! kanban List and Card => CRUD Operations

const addCard = async (
	listId: number,
	cardTitle: string,
	token: string | undefined,
	position: number
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${baseUrl}/card`,
		{ listId, title: cardTitle, order: position },
		config
	);

	// TODO: ORDER CALCULATION !!!!!!!!
	// * Proposed solution: calculate max order and double that while creating a new card since it shall be inserted at last position...
	// * How do i calcualate max order ? must get all cards and return Math.max(order) ?
	// * IF it's the first card then I can initialize this with a huge arbitary number (position algorithm)
	// * How to check if it's the first card ? Math.max(order) === null && first card

	const cardState: Card = {
		id: data.id,
		title: data.title,
		duedate: null,
		description: null,
		order: data.order,
		listId: data.listId,
		labels: [],
		checklists: [],
		comments: [],
	};

	return cardState;
};
const addList = async (
	boardId: number | string | undefined,
	listTitle: string,
	token: string | undefined,
	position: number
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${baseUrl}/list`,
		{ boardId: Number(boardId), title: listTitle, order: position },
		config
	);

	const listState: List = {
		id: data.id,
		order: data.order,
		title: data.title,
		boardId: data.boardId,
		cards: [],
	};

	return listState;
};

const updatePositionDB = async (
	{ updateType, newPosition, cardId, listId }: UpdatePositionParamTypes,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	if (updateType === 'within') {
		await axios.put(
			`${baseUrl}/card/${cardId}`,
			{ order: newPosition },
			config
		);
		return;
	}

	if (updateType === 'list') {
		// moving lists -> TO BE DISCUSSED
	}
};
const updatePositionBetweenListsDB = async (
	currentCard: Card | undefined,
	position: number,
	targetListId: number,
	cardId: number,
	sourceListId: number,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	console.log('card to be deleted', currentCard);

	await axios.delete(`${baseUrl}/card/${cardId}`, config);

	const { data } = await axios.post(
		`${baseUrl}/card`,
		{
			listId: targetListId,
			order: position,
			title: currentCard?.title,
		},
		config
	);

	console.log('card created', data);

	// * unfortunately I can't update card fields with neither card/post nor card/put. (Results in loss of data)

	return {
		replacedCard: data,
		targetList: data.listId,
		oldCardId: cardId,
		sourceListId,
	};
};

const deleteListBoard = async (listId: number, token: string | undefined) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	// delete card

	await axios.delete(`${baseUrl}/list/${listId}`, config);

	return listId;
};

export const editListTitle = async (
	boardId: string | undefined,
	title: string,
	listId: number,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		`${baseUrl}/list/${listId}`,
		{ boardId: Number(boardId), title },
		config
	);

	return { id: data.id, title: data.title };
};

// ! kanban List and Card => CRUD Operations

const boardService = {
	getBoard,
	deleteBoard,
	leaveBoard,
	inviteMembersToBoard,
	editBoardTitle,
	addCard,
	addList,
	updatePositionDB,
	updatePositionBetweenListsDB,
	deleteListBoard,
	editListTitle,
};

export default boardService;
