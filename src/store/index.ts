import {configureStore} from '@reduxjs/toolkit';
import hangmanReducer from './hangmanSlice';

const store = configureStore({
    reducer: {
        hangman: hangmanReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
