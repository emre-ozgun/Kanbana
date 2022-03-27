import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import cardService from './cardService';

// TYPE CARD!

const initialState = {
	card: {},
	isLoading: false,
	isSuccess: false,
};

export const getCard = createAsyncThunk(
	'card/getCard',
	async (boardTitle: string, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.getCard();
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);

export const card = createSlice({
	name: 'card',
	initialState,
	reducers: {
		clearCard: (state) => {
			state.card = {};
			state.isLoading = false;

			state.isSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCard.pending, (state) => {
			state.isLoading = true;
		});
	},
});

export const { clearCard } = card.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (state: RootState) => state.card;

export default card.reducer;
