//internal lib import

import { apiService } from '../api/apiService';

export const storeService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        storeList: builder.query({
            query: () => ({
                url: `stores`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data,
        }),
        storeCreate: builder.mutation({
            query: (postBody) => ({
                url: `stores`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getStores', undefined, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        storeUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `stores/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getStores', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        storeDelete: builder.mutation({
            query: (id) => ({
                url: `stores/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getStores', undefined, (draft) => {
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
export const {
    useStoreListQuery,
    useStoreDeleteMutation,
    useStoreCreateMutation,
    useStoreUpdateMutation,
} = storeService;
