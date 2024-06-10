import {configureStore} from '@reduxjs/toolkit';
import hangmanReducer from './hangmanSlice';
import userReducer from './userSlice';
import highscoreReducer from './highscoreSlice';

const store = configureStore({
    reducer: {
        hangman: hangmanReducer,
        user: userReducer,
        highscore: highscoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
