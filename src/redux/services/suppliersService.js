//Internal Lib Import

import { apiService } from '../api/apiService';

export const suppliersService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        supplierList: builder.query({
            query: (storeID) => ({
                url: `suppliers/${storeID}`,
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdSupplier } = await queryFulfilled;
                    console.log(apiService.util.updateQueryData());

                    dispatch(
                        apiService.util.updateQueryData('supplierList', undefined, (draft) => {
                            draft.push(createdSupplier.data?.supplier);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }

                // try {
                //     await queryFulfilled;
                // } catch {
                //     response.undo();
                // }
            },
        }),

        supplierUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `suppliers/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('supplierList', undefined, (draft) => {
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
                    apiService.util.updateQueryData('supplierList', undefined, (draft) => {
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
