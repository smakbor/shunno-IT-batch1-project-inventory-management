//internal lib import

import { apiService } from '../api/apiService';

export const costSectionService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllCostSection: builder.query({
            query: () => ({
                url: `cost-sections`,
                method: 'GET',
            }),
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
                            draft.data.push(data.data);
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
                            const findIndex = draft.data.findIndex((item) => item._id === id);
                            draft.data[findIndex] = postBody;
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
export const {
    useGetAllCostSectionQuery,
    useCostSectionDeleteMutation,
    useCostSectionCreateMutation,
    useCostSectionUpdateMutation,
} = costSectionService;
