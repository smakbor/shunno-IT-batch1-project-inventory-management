//Internal Lib Import

import { apiService } from '../api/apiService';

export const suppliersService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getSuppliers: builder.query({
            query: () => ({
                url: `suppliers`,
                method: 'GET',
            }),
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
                        draft.data.push(postBody);
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
                    apiService.util.updateQueryData('manufacturers', undefined, (draft) => {
                        const findIndex = draft.data.findIndex((item) => item._id === id);
                        draft.data[findIndex] = postBody;
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
                    apiService.util.updateQueryData('manufacturers', undefined, (draft) => {
                        draft.data = draft.data.filter((item) => item._id !== id);
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
export const { useGetSuppliersQuery, useSupplierDeleteMutation, useSupplierCreateMutation, useSupplierUpdateMutation } =
    suppliersService;
