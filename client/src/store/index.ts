import { configureStore } from '@reduxjs/toolkit';
import mainApi from './mainApi';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        [authReducer.reducerPath]: authReducer.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch