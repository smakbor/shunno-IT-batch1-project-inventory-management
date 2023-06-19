//Internal Lib Import
import { apiService } from '../api/apiService';

export const staffService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        staffList: builder.query({
            query: (storeID) => ({
                url: `staffs/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        staffCreate: builder.mutation({
            query: (postBody) => ({
                url: `staffs`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('staffList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        staffUpdate: builder.mutation({
            query: (postBody) => ({
                url: `staffs/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;
                console.log(data);
                const response = dispatch(
                    apiService.util.updateQueryData('staffList', data.store, (draft) => {
                        const findIndex = draft.findIndex((item) => item._id === data._id);
                        draft[findIndex] = data;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
        staffResetPassword: builder.mutation({
            query: (password) => ({
                url: `auth/reset-password`,
                method: 'PATCH',
                body: { password },
            }),
        }),
        staffDelete: builder.mutation({
            query: ({ id, storeID }) => ({
                url: `staffs/${id}`,
                method: 'DELETE',
            }),
            onQueryStarted({ id, storeID }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(() => {
                    dispatch(
                        apiService.util.updateQueryData(
                            'staffList',
                            storeID,
                            (draft) => (draft = draft.filter((item) => item._id !== id))
                        )
                    );
                });
            },
        }),
    }),
});
export const {
    useStaffListQuery,
    useStaffCreateMutation,
    useStaffUpdateMutation,
    useStaffDeleteMutation,
    useStaffResetPasswordMutation,
} = staffService;
