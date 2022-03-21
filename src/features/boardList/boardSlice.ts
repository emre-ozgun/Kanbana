import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import boardService from './boardService';

type Board = {
	id: number;
	title: string;
	ownerId: number;
};

type BoardListStateType = {
	boards: Board[];
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	message: string;
};

const initialState: BoardListStateType = {
	boards: [],
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
		} catch (error) {}
	}
);

export const createBoard = createAsyncThunk('boards/createBoard', async () => {
	// boardtitle to create
});

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
			state.boards = [];
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBoardList.pending, (state) => {});
		builder.addCase(getBoardList.rejected, (state, action) => {});
		builder.addCase(getBoardList.fulfilled, (state, action) => {});
		builder.addCase(createBoard.pending, (state) => {});
		builder.addCase(createBoard.rejected, (state, action) => {});
		builder.addCase(createBoard.fulfilled, (state, action) => {});
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

export default boardList.reducer;
