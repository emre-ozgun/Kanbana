import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import kanbanService from './kanbanService';

type BoardMember = {
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
	},
});

export const { clear } = board.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board;

export default board.reducer;
