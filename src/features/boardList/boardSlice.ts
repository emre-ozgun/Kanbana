import {
	createSlice,
	createAsyncThunk,
	createSelector,
	PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import boardService from './boardService';

export type Member = {
	username: string;
	boardMemberId: number;
};

export type OwnedBoard = {
	id: number;
	ownerId: number;
	title: string;

	members: Member[] | [];
};
export type MemberBoard = {
	id: number;
	ownerId: number;
	title: string;

	members: Member[] | [];
};

type BoardListStateType = {
	boards: {
		ownedBoards: OwnedBoard[];
		memberBoards: MemberBoard[];
	};
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	message: string;
};

const initialState: BoardListStateType = {
	boards: {
		ownedBoards: [],
		memberBoards: [],
	},
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

export const getBoardList = createAsyncThunk(
	'boards/getBoardList',
	async (_, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;
		const ownerId = auth.user?.id;

		try {
			return await boardService.getBoards(token, ownerId);
		} catch (error) {
			return thunkApi.rejectWithValue(
				'There was an error. Please try refreshing the page...'
			);
		}
	}
);

export const createBoard = createAsyncThunk(
	'boards/createBoard',
	async (boardTitle: string, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await boardService.createBoard(boardTitle, token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				'There was an error. Please try refreshing the page...'
			);
		}
	}
);

export const updateBoard = createAsyncThunk('boards/updateBoard', async () => {
	// need id and payload (new title) to update
	// maybe 'update-member' flag ? to handle update as well ?
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async () => {
	// need board id to delete...
});

export const boardList = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		clear: (state) => {
			state.boards = {
				ownedBoards: [],
				memberBoards: [],
			};
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBoardList.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getBoardList.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			if (typeof action.payload === 'string') {
				state.message = action.payload;
			}
		});
		builder.addCase(getBoardList.fulfilled, (state, action) => {
			state.isLoading = false;

			state.isSuccess = true;
			if (action.payload) {
				state.boards = action.payload;
			}
		});
		builder.addCase(createBoard.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createBoard.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			if (typeof action.payload === 'string') {
				state.message = action.payload;
			}
		});
		builder.addCase(createBoard.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSuccess = true;
			if (payload) {
				state.boards.ownedBoards.push(payload);
			}
		});
		builder.addCase(updateBoard.pending, (state) => {});
		builder.addCase(updateBoard.rejected, (state, action) => {});
		builder.addCase(updateBoard.fulfilled, (state, action) => {});
		builder.addCase(deleteBoard.pending, (state) => {});
		builder.addCase(deleteBoard.rejected, (state, action) => {});
		builder.addCase(deleteBoard.fulfilled, (state, action) => {});
	},
});

export const { clear } = boardList.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoardList = (state: RootState) => state.boardList;

export const selectMemoBoard = createSelector(
	(state: RootState) => state.boardList.boards,
	(boards) => boards
);

export default boardList.reducer;
