import {TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector} from 'react-redux';
import type {AppDispatch, RootState} from './index';

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
