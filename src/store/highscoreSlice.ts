import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface Highscore {
    userName: string;
    score: number;
}

interface HighscoreState {
    highscores: Highscore[];
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
    highscores: [],
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

export const fetchHighscores = createAsyncThunk(
    'highscore/fetchHighscores',
    async () => {
        const response = await axios.get(
            'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'
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
            })
            .addCase(fetchHighscores.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHighscores.fulfilled, (state, action) => {
                state.loading = false;
                state.highscores = action.payload
                    .map((score: HighscoreData) => ({
                        userName: score.userName,
                        score: 100 / (1 + score.errors),
                    }))
                    .sort((a: Highscore, b: Highscore) => b.score - a.score);
            })
            .addCase(fetchHighscores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch highscores';
            });
    },
});

export default highscoreSlice.reducer;
