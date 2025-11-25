// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../store/slices/authSlice';
import authApi from '../store/services/authApi';
import mainApi from '../store/services/mainApi';
import { cartSlice } from '../store/slices/cartSlice';
import { buyNowSlice } from '../store/slices/buyNowSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		cart: cartSlice.reducer,
		buyNow: buyNowSlice.reducer,
		[mainApi.reducerPath]: mainApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
