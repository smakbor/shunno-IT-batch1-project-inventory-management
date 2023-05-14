//Internal Lib Import

import { apiService } from '../api/apiService';

export const manufacturerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        manufacturerList: builder.query({
            query: (storeID) => ({
                url: `manufacturers/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        manufacturerCreate: builder.mutation({
            query: ({ storeID, postBody }) => ({
                url: `manufacturers/${storeID}`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getManufacturers', undefined, (draft) => {
                        draft.push(postBody);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),

        manufacturerUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `manufacturers/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getManufacturers', undefined, (draft) => {
                        const findIndex = draft.findIndex((item) => item._id === id);
                        draft[findIndex] = postBody;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
        manufacturerDelete: builder.mutation({
            query: (id) => ({
                url: `manufacturers/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getManufacturers', undefined, (draft) => {
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
    useManufacturerListQuery,
    useManufacturerDeleteMutation,
    useManufacturerCreateMutation,
    useManufacturerUpdateMutation,
} = manufacturerService;
