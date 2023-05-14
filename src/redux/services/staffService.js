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
                url: `staffs/${postBody.storeID}`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ storeID }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data }) => {
                    dispatch(
                        apiService.util.updateQueryData('staffList', storeID, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),
        staffUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `staffs/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { storeID } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data }) => {
                    dispatch(
                        apiService.util.updateQueryData('staffList', storeID, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                        })
                    );
                });
            },
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
export const { useStaffListQuery, useStaffCreateMutation, useStaffUpdateMutation, useStaffDeleteMutation } =
    staffService;
