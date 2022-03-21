import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL;

const getBoards = async (
	token: string | undefined,
	ownerId: number | undefined
) => {
	// get/board
};

const createBoard = async (
	title: string,
	token: string | undefined,
	ownerId: number | undefined
) => {
	// post/board
};

const deleteBoard = async (boardId: number, token: string) => {
	//delete/board
};

const editBoard = async (
	newBoardTitle: string,
	token: string | undefined,
	ownerId: number | undefined
) => {
	//edit/board
};

const addMemberToBoard = async (memberId: number, boardId: number) => {
	// add member to boardd
};

const getAvailableMembers = async () => {
	// get user list to invite to board
	// filter out current authenticated user because you shouldn't be able to add yourself as  a member...
};

const boardService = {
	getBoards,
	createBoard,
	editBoard,
	deleteBoard,
};

export default boardService;
