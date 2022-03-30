import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import kanbanService from './kanbanService';
import cardLS from '../../utils/cardPositionLS';

export type BoardMember = {
	username: string;
	boardMemberId: number;
};

export type Card = {
	id: number;
	title: string;
	duedate: null | string;
	description: string | null;
	order: number | null;
	listId: number;
	labels: any[];
	checklists: any[];
	comments: any[];
};

export type List = {
	id: number;
	order: number | null;
	title: string;
	boardId: number;
	cards: Card[];
};

export type Board = {
	id: number;
	title: string;
	ownerId: number;
	lists: List[];
	members: BoardMember[];
};

type StateType = {
	board: Board;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
};

const initialBoardState = {
	id: Infinity,
	title: '',
	ownerId: Infinity,
	lists: [],
	members: [],
};

const initialState: StateType = {
	board: initialBoardState,
	isLoading: false,
	isError: false,
	isSuccess: false,
};

export const getBoard = createAsyncThunk(
	'board/getBoard',
	async (boardId: string | undefined, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.getBoard(boardId, token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);

export const deleteBoard = createAsyncThunk(
	'board/deleteBoard',
	async (boardId: number, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.deleteBoard(boardId, token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);

export const leaveBoard = createAsyncThunk(
	'board/leaveBoard',
	async (boardMemberId: number, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.leaveBoard(boardMemberId, token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);

export const editBoardTitle = createAsyncThunk(
	'board/editBoardTitle',
	async (
		{ boardTitle, boardId }: { boardTitle: string; boardId: string | number },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.editBoardTitle(boardId, boardTitle, token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);
export const inviteMembersToBoard = createAsyncThunk(
	'board/inviteMembersToBoard',
	async (
		{
			boardId,
			payload,
		}: { boardId: string | number | undefined; payload: BoardMember[] },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.inviteMembersToBoard(boardId, payload, token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);

// ! List and Card -> CRUD OPERATIONS

export const addCard = createAsyncThunk(
	'board/addCard',
	async (
		{ listId, cardTitle }: { listId: number; cardTitle: string },
		thunkApi
	) => {
		const { auth, board } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		const targetList = board.board.lists.find((l: List) => l.id === listId);
		console.log({ targetList });

		let position;

		const cardPos = cardLS.getCardPositionFromLS();

		if (Number(cardPos)) {
			position = Number(cardPos) * 1.23277297;
		} else {
			position = 1.122274927;
		}

		cardLS.setCardPositionLS(position);

		try {
			return await kanbanService.addCard(listId, cardTitle, token, position);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);
export const addList = createAsyncThunk(
	'board/addList',
	async (
		{
			boardId,
			listTitle,
		}: { boardId: number | string | undefined; listTitle: string },
		thunkApi
	) => {
		const { auth, board } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		let position = 0;
		let max = 0;

		if (board.board.lists.length < 1) {
			position = 2 * 4;
		} else {
			for (let i = 0; i < board.board.lists.length; i++) {
				const order = board.board.lists[i].order;
				if (typeof order === 'number') {
					if (order >= max) {
						max = order;
					}
				}
			}

			position = max * 2;
		}

		try {
			return await kanbanService.addList(boardId, listTitle, token, position);
		} catch (error) {
			return thunkApi.rejectWithValue(
				`There was an error, could not fetch board...`
			);
		}
	}
);

// ! List and Card -> CRUD OPERATIONS

export const board = createSlice({
	name: 'board',
	initialState,
	reducers: {
		clear: (state) => {
			state = initialState;
		},
		updateBoardCardTitle: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);

			const kCard = kList?.cards.find(
				(c: Card) => c.id === action.payload.cardId
			);

			if (kCard) {
				kCard.title = action.payload.titleEdit;
			}
		},
		updateBoardCardDescription: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);

			const kCard = kList?.cards.find(
				(c: Card) => c.id === action.payload.cardId
			);

			if (kCard) {
				kCard.description = action.payload.descriptionText;
			}
		},
		addBoardCardComment: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);
			const kCard = kList?.cards.find(
				(c: Card) => c.id === action.payload.cardId
			);
			if (kCard) {
				kCard.comments.push(true);
			}
		},
		deleteBoardCardComment: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);
			const kCard = kList?.cards.find(
				(c: Card) => c.id === action.payload.cardId
			);
			if (kCard) {
				kCard.comments.pop();
			}
		},
		addBoardCardLabel: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);
			const kCard = kList?.cards.find(
				(c: Card) => c.id === action.payload.cardId
			);
			kCard?.labels.push({
				id: action.payload.labelId,
				color: action.payload.color,
			});
		},
		removeBoardCardLabel: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);
			const kCard = kList?.cards.find(
				(c: Card) => c.id === action.payload.cardId
			);
			const labelIndex = kCard?.labels.findIndex(
				(l: any) => l.id === action.payload.labelId
			);
			console.log(labelIndex);
			if (typeof labelIndex === 'number' && labelIndex >= 0) {
				kCard?.labels.splice(labelIndex, 1);
			}
		},
		deleteBoardCard: (state, action) => {
			const kList = state.board.lists.find(
				(l: List) => l.id === Number(action.payload.listId)
			);
			const cardToBeRemoved = kList?.cards.findIndex(
				(c: Card) => c.id === action.payload.cardId
			);
			if (typeof cardToBeRemoved === 'number') {
				kList?.cards.splice(cardToBeRemoved, 1);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBoard.pending, (state) => {});
		builder.addCase(getBoard.rejected, (state, action) => {});
		builder.addCase(getBoard.fulfilled, (state, action) => {
			state.isSuccess = true;
			if (action.payload) {
				state.board = action.payload;
			}
		});

		builder.addCase(leaveBoard.fulfilled, (state, action) => {
			if (action.payload) {
				const newstate = {
					...state,
					board: {
						...state.board,
						members: state.board.members.filter(
							(member: BoardMember) => member.boardMemberId !== action.payload
						),
					},
				};

				return newstate;
			}
		});

		builder.addCase(editBoardTitle.fulfilled, (state, action) => {
			if (action.payload) {
				state.board.title = action.payload;
			}
		});
		builder.addCase(inviteMembersToBoard.fulfilled, (state, action) => {
			if (action.payload) {
				action.payload.forEach((member: BoardMember) => {
					state.board.members.push(member);
				});
			}
		});

		// * Kanban Card and List => CRUD

		builder.addCase(addCard.fulfilled, (state, action) => {
			if (action.payload) {
				const foundList = state.board.lists.find(
					(l: List) => l.id === action.payload.listId
				);

				if (foundList) {
					foundList.cards.push(action.payload);
				}
			}
		});
		builder.addCase(addList.fulfilled, (state, action) => {
			if (action.payload) {
				state.board.lists.push(action.payload);
			}
		});
	},
});

export const {
	clear,
	updateBoardCardTitle,
	updateBoardCardDescription,
	addBoardCardComment,
	deleteBoardCardComment,
	addBoardCardLabel,
	removeBoardCardLabel,
	deleteBoardCard,
} = board.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board;

export default board.reducer;
