//internal lib import
import { apiService } from '../api/apiService';

export const authService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (postBody) => ({
                url: 'auth/register',
                method: 'POST',
                body: postBody,
            }),
        }),
        login: builder.mutation({
            query: (postBody) => ({
                url: 'auth/login',
                method: 'POST',
                body: postBody,
            }),
        }),
        logout: builder.mutation({
            query: (postBody) => ({
                url: 'auth/logout',
                method: 'POST',
                body: postBody,
            }),
        }),
        fotgetPassword: builder.mutation({
            query: (email) => ({
                url: `auth/fotgetPassword`,
                method: 'POST',
                body: email,
            }),
        }),
        verifyForgetToken: builder.query({
            query: (email, token) => ({
                url: `auth/verifyForgetToken/${email}/${token}`,
                method: 'GET',
            }),
        }),
        resetPasswordToken: builder.mutation({
            query: (email, token, postBody) => ({
                url: `auth/resetPasswordToken/${email}/${token}`,
                method: 'POST',
                body: postBody,
            }),
        }),
    }),
});
export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useFotgetPasswordMutation,
    useVerifyForgetTokenQuery,
    useResetPasswordTokenQuery,
} = authService;
