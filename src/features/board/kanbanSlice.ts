import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import kanbanService from './kanbanService';

export type BoardMember = {
	username: string;
	boardMemberId: number;
};

type Board = {
	id: number;
	title: string;
	ownerId: number;
	lists: any[];
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

export const board = createSlice({
	name: 'board',
	initialState,
	reducers: {
		clear: (state) => {
			state = initialState;
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
	},
});

export const { clear } = board.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board;

export default board.reducer;
