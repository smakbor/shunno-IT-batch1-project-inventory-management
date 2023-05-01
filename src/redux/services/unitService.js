//internal lib import

import { apiService } from '../api/apiService';

export const unitService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getUnits: builder.query({
            query: () => ({
                url: `units`,
                method: 'GET',
            }),
        }),
        unitCreate: builder.mutation({
            query: (postBody) => ({
                url: `units`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getUnits', undefined, (draft) => {
                            draft.data.push(data.data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        unitUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `units/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getUnits', undefined, (draft) => {
                            const findIndex = draft.data.findIndex((item) => item._id === id);
                            draft.data[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        unitDelete: builder.mutation({
            query: (id) => ({
                url: `units/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getUnits', undefined, (draft) => {
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
    useGetUnitsQuery,
    useUnitDeleteMutation,
    useUnitCreateMutation,
    useUnitUpdateMutation,
} = unitService;
