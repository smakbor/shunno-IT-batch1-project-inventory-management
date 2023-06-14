//Internal Lib Import
import { apiService } from '../api/apiService';

export const warrantyService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        warrantyList: builder.query({
            query: (store) => ({
                url: `warranties/${store}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        warrantyCreate: builder.mutation({
            query: (postBody) => ({
                url: `warranties`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(
                    ({ data: { data } }) => {
                        dispatch(
                            apiService.util.updateQueryData("warrantyList", postBody.store, (draft) => {
                                draft.unshift(data);
                            })
                        )
                    }
                )
            },
        }),

        warrantyUpdate: builder.mutation({
            query: (postBody) => ({
                url: `warranties/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(
                    ({ data: { data } }) => {
                        console.log(data)
                        dispatch(
                            apiService.util.updateQueryData("warrantyList", store, (draft) => {
                                const findIndex = draft.findIndex(item => item._id === id);

                                draft[findIndex] = data;
                            })
                        )
                    }
                )
            },
        }),
        warrantyDelete: builder.mutation({
            query: (id) => ({
                url: `warranties/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
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
export const { useWarrantyListQuery, useWarrantyDeleteMutation, useWarrantyCreateMutation, useWarrantyUpdateMutation } =
    warrantyService;
