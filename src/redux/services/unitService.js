//Internal Lib Import

import { apiService } from '../api/apiService';

export const unitService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        unitList: builder.query({
            query: (storeID) => ({
                url: `units/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        unitCreate: builder.mutation({
            query: ({ storeID, postBody }) => ({
                url: `units/${storeID}`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getUnits', undefined, (draft) => {
                            draft.push(data);
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
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = postBody;
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
export const { useUnitListQuery, useUnitDeleteMutation, useUnitCreateMutation, useUnitUpdateMutation } = unitService;
