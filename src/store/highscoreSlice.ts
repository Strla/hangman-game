import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface HighscoreState {
    loading: boolean;
    error: string | null;
}

interface HighscoreData {
    quoteId: string;
    length: number;
    uniqueCharacters: number;
    userName: string;
    errors: number;
    duration: number;
}

const initialState: HighscoreState = {
    loading: false,
    error: null,
};

export const submitHighscore = createAsyncThunk(
    'highscore/submitHighscore',
    async (highscoreData: HighscoreData) => {
        const response = await axios.post(
            'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores',
            highscoreData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }
);

const highscoreSlice = createSlice({
    name: 'highscore',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitHighscore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitHighscore.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(submitHighscore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to submit highscore';
            });
    },
});

export default highscoreSlice.reducer;
