import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface HangmanState {
    wordToGuess: string;
    guessedLetters: string[];
    loading: boolean;
    error: string | null;
    startTime: number | null;
    endTime: number | null;
    errors: number;
    quoteId: string | null;
    quoteLength: number | null;
}

const initialState: HangmanState = {
    wordToGuess: '',
    guessedLetters: [],
    loading: false,
    error: null,
    startTime: null,
    endTime: null,
    errors: 0,
    quoteId: null,
    quoteLength: null,
};

export const fetchWord = createAsyncThunk('hangman/fetchWord', async () => {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data;
});

const hangmanSlice = createSlice({
    name: 'hangman',
    initialState,
    reducers: {
        addGuessedLetter: (state, action) => {
            state.guessedLetters.push(action.payload);
            if (!state.wordToGuess.includes(action.payload)) {
                state.errors += 1;
            }
        },
        resetGame: (state) => {
            state.guessedLetters = [];
            state.startTime = Date.now();
            state.endTime = null;
            state.errors = 0;
        },
        setEndTime: (state) => {
            state.endTime = Date.now();
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
                state.wordToGuess = action.payload.content.toLowerCase();
                state.quoteId = action.payload._id;
                state.quoteLength = action.payload.length;
                state.startTime = Date.now();
            })
            .addCase(fetchWord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch word';
            });
    },
});

export const {addGuessedLetter, resetGame, setEndTime} = hangmanSlice.actions;

export default hangmanSlice.reducer;
