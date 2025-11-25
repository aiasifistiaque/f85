import mainApi from './mainApi';
import { LoginBodyType, LoginPayloadType } from './types';

export const authApi = mainApi.injectEndpoints({
	endpoints: builder => ({
		// ✅ Existing
		login: builder.mutation<LoginPayloadType, any>({
			query: ({ email, password, lead, from }) => ({
				url: `user-api/auth/login`,
				method: 'POST',
				body: { email, password, lead, from },
			}),
			invalidatesTags: ['self'],
		}),

		register: builder.mutation<any, any>({
			query: body => ({
				url: `auth/register`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['self'],
		}),

		updatePassword: builder.mutation<any, any>({
			query: body => ({
				url: `user-api/auth/update/password`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['self'],
		}),

		getSelf: builder.query({
			query: () => ({
				url: `/user-api/auth/self`,
			}),
			providesTags: ['self'],
		}),

		updateSelf: builder.mutation<any, any>({
			query: body => ({
				url: `user-api/auth/self`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['self'],
		}),

		updatePreferences: builder.mutation<any, any>({
			query: ({ field, preferences }) => ({
				url: `auth/update/preferences`,
				method: 'PUT',
				body: { field, preferences },
			}),
			invalidatesTags: (result, error, { field, preferences }) => [field, 'self'],
		}),

		// ✅ Added from first file
		getMyOrders: builder.query<any, any>({
			query: () => ({
				url: `/user-api/orders`,
			}),
			providesTags: ['self'],
		}),

		getSingleOrder: builder.query<any, string>({
			query: orderId => ({
				url: `/user-api/orders/${orderId}`,
			}),
			providesTags: ['self'],
		}),

		placeOrder: builder.mutation<any, any>({
			query: body => ({
				url: `auth/order`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['self'],
		}),

		updatePassord: builder.mutation<any, any>({
			query: ({ field, preferences }) => ({
				url: `auth/update/password`,
				method: 'PUT',
				body: { field, preferences },
			}),
			invalidatesTags: (result, error, { field, preferences }) => [field, 'self'],
		}),

		requestPasswordChange: builder.mutation({
			query: ({ email }) => ({
				url: `auth/request-password-change`,
				method: 'POST',
				body: { email },
			}),
		}),

		verifyToken: builder.query({
			query: ({ token }) => ({
				url: `auth/verify-reset-token/${token}`,
				method: 'GET',
			}),
		}),

		verifyCoupon: builder.mutation<any, any>({
			query: body => ({
				url: `user-api/orders/verify/coupon`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['self'],
		}),

		resetPassword: builder.mutation({
			query: ({ token, password }) => ({
				url: `auth/reset`,
				method: 'POST',
				body: { token, password },
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLoginMutation,
	useGetSelfQuery,
	useLazyGetSelfQuery,
	useUpdatePreferencesMutation,
	useRegisterMutation,
	useUpdatePasswordMutation,
	useUpdateSelfMutation,

	// ✅ Newly added hooks
	useGetMyOrdersQuery,
	useGetSingleOrderQuery,
	usePlaceOrderMutation,
	useUpdatePassordMutation,
	useRequestPasswordChangeMutation,
	useVerifyTokenQuery,
	useResetPasswordMutation,
	useVerifyCouponMutation,
} = authApi;

export default authApi;
