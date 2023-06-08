//Internal Lib Import

import { apiService } from '../api/apiService';

export const customerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        customerList: builder.query({
            query: (storeID) => ({
                url: `customers/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        customerCreate: builder.mutation({
            query: (postBody) => ({
                url: `customers`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('customerList', undefined, (draft) => {
                        draft.push(postBody);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),

        customerUpdate: builder.mutation({
            query: (postBody) => ({
                url: `customers/${postBody?._id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('customerList', undefined, (draft) => {
                        const findIndex = draft.findIndex((item) => item._id === id);
                        draft[findIndex] = postBody;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
        customerDelete: builder.mutation({
            query: (id) => ({
                url: `customers/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('customerList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
    }),
});
export const { useCustomerListQuery, useCustomerDeleteMutation, useCustomerCreateMutation, useCustomerUpdateMutation } =
    customerService;
