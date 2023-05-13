//Internal Lib Import

import { apiService } from '../api/apiService';

export const suppliersService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        supplierList: builder.query({
            query: () => ({
                url: `suppliers`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        supplierCreate: builder.mutation({
            query: (postBody) => ({
                url: `suppliers`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getSuppliers', undefined, (draft) => {
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

        supplierUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `suppliers/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getSuppliers', undefined, (draft) => {
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
        supplierDelete: builder.mutation({
            query: (id) => ({
                url: `suppliers/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getSuppliers', undefined, (draft) => {
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
export const { useSupplierListQuery, useSupplierDeleteMutation, useSupplierCreateMutation, useSupplierUpdateMutation } =
    suppliersService;
