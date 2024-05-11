import { date } from 'joi';
import { apiService } from '../api/apiService';
import Warranty from './../../pages/products/warranty/Warranty';

export const WarrantyService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        warrantyList: builder.query({
            query: (storeId) => ({
                url: `warranty/allWarranty`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        warrantyCreate: builder.mutation({
            query: (postBody) => {
                return {
                    url: `warranty/create`,
                    method: 'POST',
                    body: postBody,
                };
            },
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),
        warrantyUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `warranty/update/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                            return draft;
                        })
                    );
                });
            },
        }),
        warrantyDelete: builder.mutation({
            query: (id) => ({
                url: `warranty/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);
                        return draft;
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

export const { useWarrantyListQuery, useWarrantyCreateMutation, useWarrantyUpdateMutation, useWarrantyDeleteMutation } =
    WarrantyService;
