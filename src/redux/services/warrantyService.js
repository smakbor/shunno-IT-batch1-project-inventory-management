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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('warrantyList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        warrantyUpdate: builder.mutation({
            query: (postBody) => ({
                url: `warranties/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;
                const response = dispatch(
                    apiService.util.updateQueryData('warrantyList', data.store, (draft) => {
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
