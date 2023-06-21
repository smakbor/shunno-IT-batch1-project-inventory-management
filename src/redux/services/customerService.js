//Internal Lib Import

import { apiService } from '../api/apiService';

export const customerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        customerList: builder.query({
            query: (store) => ({
                url: `customers/${store}`,
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
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('customerList', data.customer.store, (draft) => {
                            draft.push(data.customer);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        customersImport: builder.mutation({
            query: ({ store, postBody }) => ({
                url: `import-data/${store}/customers`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ store, postBody }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(
                    ({ data: { data } }) => dispatch(
                        apiService.util.updateQueryData("customerList", store, (draft) => draft = data.concat(draft)
                        )
                    ))
            },

        }),

        customerUpdate: builder.mutation({
            query: (postBody) => ({
                url: `customers/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;
                const response = dispatch(
                    apiService.util.updateQueryData('customerList', data.store, (draft) => {
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
export const { useCustomerListQuery, useCustomerDeleteMutation, useCustomerCreateMutation, useCustomerUpdateMutation, useCustomersImportMutation } =
    customerService;
