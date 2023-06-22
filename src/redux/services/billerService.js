//Internal Lib Import

import { apiService } from '../api/apiService';

export const billerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        billerList: builder.query({
            query: (store) => ({
                url: `billers/${store}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        billerCreate: builder.mutation({
            query: (postBody) => ({
                url: `billers`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('billerList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        billerUpdate: builder.mutation({
            query: (postBody) => ({
                url: `billers/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;
                console.log(data);
                const response = dispatch(
                    apiService.util.updateQueryData('billerList', data.store, (draft) => {
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
        billerDelete: builder.mutation({
            query: (id) => ({
                url: `billers/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('billerList', undefined, (draft) => {
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
export const { useBillerListQuery, useBillerDeleteMutation, useBillerCreateMutation, useBillerUpdateMutation } =
    billerService;
