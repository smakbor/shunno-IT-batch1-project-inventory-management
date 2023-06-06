//internal lib import

import { apiService } from '../api/apiService';

export const costSectionService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        costSectionList: builder.query({
            query: (storeID) => ({
                url: `cost-sections/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        costSectionCreate: builder.mutation({
            query: ({ postBody }) => ({
                url: `cost-sections/${postBody.storeID}`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ postBody }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('costSectionList', postBody.storeID, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        costSectionUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `cost-sections/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('costSectionList', postBody.storeID, (draft) => {
                        const findIndex = draft.findIndex((item) => item._id === id);
                        draft[findIndex] = postBody;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (e) {
                    response.undo();
                }
            },
        }),
        costSectionDelete: builder.mutation({
            query: ({ id, storeID }) => ({
                url: `cost-sections/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ id, storeID }, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData(
                        'costSectionList',
                        storeID,
                        (draft) => (draft = draft.filter((item) => item._id !== id))
                    )
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
    useCostSectionListQuery,
    useCostSectionDeleteMutation,
    useCostSectionCreateMutation,
    useCostSectionUpdateMutation,
} = costSectionService;
