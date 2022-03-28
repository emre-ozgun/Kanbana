import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import kanbanService from './kanbanService';

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

type Board = {
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
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.addCard(listId, cardTitle, token);
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
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await kanbanService.addList(boardId, listTitle, token);
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

export const { clear, updateBoardCardTitle } = board.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board;

export default board.reducer;
