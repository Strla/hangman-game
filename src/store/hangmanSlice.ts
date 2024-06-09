import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface HangmanState {
    wordToGuess: string;
    guessedLetters: string[];
    loading: boolean;
    error: string | null;
}

const initialState: HangmanState = {
    wordToGuess: '',
    guessedLetters: [],
    loading: false,
    error: null,
};

export const fetchWord = createAsyncThunk('hangman/fetchWord', async () => {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content.toLowerCase();
});

const hangmanSlice = createSlice({
    name: 'hangman',
    initialState,
    reducers: {
        addGuessedLetter: (state, action) => {
            state.guessedLetters.push(action.payload);
        },
        resetGame: (state) => {
            state.guessedLetters = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWord.fulfilled, (state, action) => {
                state.loading = false;
                state.wordToGuess = action.payload;
            })
            .addCase(fetchWord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch word';
            });
    },
});

export const {addGuessedLetter, resetGame} = hangmanSlice.actions;

export default hangmanSlice.reducer;
