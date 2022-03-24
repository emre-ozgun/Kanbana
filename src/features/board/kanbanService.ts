import axios from 'axios';

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

// const inviteMemberToBoard = async (POST w/ boardId, username) => {};
// const removeMemberFromBoard = async (DELETE w/ boardMemberId) => {};

const boardService = {
	getBoard,
};

export default boardService;
