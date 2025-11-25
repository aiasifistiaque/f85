import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN_NAME } from '../slices/authSlice';

const URL = process.env.NEXT_PUBLIC_BACKEND;

const tags = [
	'brand',
	'brands',
	'category',
	'categories',
	'collection',
	'collections',
	'count',
	'coupon',
	'coupons',
	'filter',
	'filters',
	'organizatin',
	'organizations',
	'product',
	'products',
	'role',
	'roles',
	'scan',
	'self',
	'sum',
	'tag',
	'tags',
	'upload',
	'uploads',
	'/user-api/auth/register',
	'/user-api/auth/login',
	'/user-api/auth/self',
	'/user-api/orders',
	'user-api/categories',
	'users',
];

// src/store/types.ts
export interface AuthState {
	// token: string | null;
}

export interface RootState {
	auth: AuthState;
	// other slices of state
}

const token = process.env.NEXT_PUBLIC_TOKEN;

export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token = process.env.NEXT_PUBLIC_TOKEN;
			if (token) {
				headers.set('authorization', token);
			}
			return headers;
		},
	}),
	tagTypes: tags,
	endpoints: builder => ({}),
});

export default mainApi;
