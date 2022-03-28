import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from '../board/kanbanSlice';

import type { RootState } from '../../store';
import cardService from './cardService';

type CardStateType = {
	card: Card;
	isLoading: boolean;
	isSuccess: boolean;
};

const initialCardState: Card = {
	id: 0,
	title: '',
	duedate: null,
	description: null,
	order: null,
	listId: 0,
	labels: [],
	checklists: [],
	comments: [],
};

const initialState: CardStateType = {
	card: initialCardState,
	isLoading: false,
	isSuccess: false,
};

export const getCard = createAsyncThunk(
	'card/getCard',
	async (cardId: string | number | undefined, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.getCard(cardId, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);
export const updateCardTitle = createAsyncThunk(
	'card/updateCardTitle',
	async (
		{ cardId, newTitle }: { cardId: number; newTitle: string },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.updateCardTitle(cardId, newTitle, token);
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
			state.card = initialCardState;
			state.isLoading = false;

			state.isSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCard.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCard.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;

			if (action.payload !== null) {
				state.card = action.payload;
			}
		});
		builder.addCase(updateCardTitle.fulfilled, (state, action) => {
			if (action.payload) {
				state.card.title = action.payload;
			}
		});
	},
});

export const { clearCard } = card.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (state: RootState) => state.card;

export default card.reducer;
