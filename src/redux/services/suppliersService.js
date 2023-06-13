//Internal Lib Import

import { apiService } from '../api/apiService';

export const suppliersService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        supplierList: builder.query({
            query: (store) => ({
                url: `suppliers/${store}`,
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
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('supplierList', data.supplier.store, (draft) => {
                            draft.push(data?.supplier);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        supplierUpdate: builder.mutation({
            query: (postBody) => ({
                url: `suppliers/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;

                const response = dispatch(
                    apiService.util.updateQueryData('supplierList', data.store, (draft) => {
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
