//internal lib import

import { apiService } from '../api/apiService';

export const costSectionService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        costSectionList: builder.query({
            query: () => ({
                url: `cost-sections`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        costSectionCreate: builder.mutation({
            query: (postBody) => ({
                url: `cost-sections`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getAllCostSection', undefined, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        costSectionUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `cost-sections/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getAllCostSection', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        costSectionDelete: builder.mutation({
            query: (id) => ({
                url: `cost-sections/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getAllCostSection', undefined, (draft) => {
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
    useCostSectionListQuery,
    useCostSectionDeleteMutation,
    useCostSectionCreateMutation,
    useCostSectionUpdateMutation,
} = costSectionService;
