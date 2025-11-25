import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
	reducer: {
		form: formReducer,
		auth: authSlice.reducer,
		cart: cartSlice.reducer,
		buyNow: buyNowSlice.reducer,
		[mainApi.reducerPath]: mainApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mainApi.middleware),
});

// store.js
import { authSlice } from '../store/slices/authSlice';
import authApi from '../store/services/authApi';
import mainApi from '../store/services/mainApi';
import { cartSlice } from '../store/slices/cartSlice';
import { buyNowSlice } from '../store/slices/buyNowSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
