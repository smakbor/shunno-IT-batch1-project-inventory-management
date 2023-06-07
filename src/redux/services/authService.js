//Internal Lib Import
import { apiService } from '../api/apiService';
import { userLogin, userLogout } from '../features/authReducer';

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
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: { data } } = await queryFulfilled;
                    console.log(data)
                    const {
                        data: { accessToken, user },
                    } = data || {};

                    dispatch(userLogin({ accessToken, user }));
                } catch (error) {
                    dispatch(userLogout());
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'GET',
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLogout());
                } catch (error) { }
            },
        }),
        forgetPassword: builder.mutation({
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
    useForgetPasswordMutation,
    useVerifyForgetTokenQuery,
    useResetPasswordTokenMutation,
} = authService;
