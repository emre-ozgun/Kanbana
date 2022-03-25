import axios from 'axios';
import { BoardMember } from './kanbanSlice';

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

	const boardState = {
		id: data.id,
		title: data.title,
		ownerId: data.ownerId,
		lists: data.lists.length > 1 ? data.lists : [],
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

	console.log({ boardId, members });

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

const boardService = {
	getBoard,
	deleteBoard,
	leaveBoard,
	inviteMembersToBoard,
	editBoardTitle,
};

export default boardService;
