import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL;

const getBoards = async (
	token: string | undefined,
	ownerId: number | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${baseUrl}/board`, config);

	if (data.length < 1) {
		return {
			ownedBoards: [],
			memberBoards: [],
		};
	}

	//! composing two different states in order to map separately both created boards and member boards
	const boards = data.reduce(
		(acc: any, curr: any) => {
			const composedBoard = {
				id: curr.id,
				ownerId: curr.ownerId,
				title: curr.title,
				members: curr.members.length
					? curr.members.map((m: any) => {
							return {
								username: m.username,
								boardMemberId: m.BoardMember.id,
							};
					  })
					: [],
			};

			if (composedBoard.ownerId === ownerId) {
				return {
					...acc,
					ownedBoards: [...acc.ownedBoards, composedBoard],
				};
			} else {
				return {
					...acc,
					memberBoards: [...acc.memberBoards, composedBoard],
				};
			}
		},
		{ ownedBoards: [], memberBoards: [] }
	);

	return boards;
};

const createBoard = async (
	newBoardTitle: string,
	token: string | undefined
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${baseUrl}/board`,
		{ title: newBoardTitle },
		config
	);

	return {
		id: data.id,
		ownerId: data.ownerId,
		title: data.title,
		members: [],
	};
};

const boardService = {
	getBoards,
	createBoard,
};

export default boardService;
