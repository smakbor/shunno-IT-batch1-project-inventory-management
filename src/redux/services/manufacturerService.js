//Internal Lib Import

import { apiService } from '../api/apiService';

export const manufacturerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        manufacturerList: builder.query({
            query: (store) => ({
                url: `manufacturers/${store}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        manufacturerCreate: builder.mutation({
            query: (postBody) => ({
                url: `manufacturers`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('manufacturerList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        manufacturerUpdate: builder.mutation({
            query: (postBody) => ({
                url: `manufacturers/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;
                const response = dispatch(
                    apiService.util.updateQueryData('manufacturerList', data.store, (draft) => {
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
        manufacturerDelete: builder.mutation({
            query: (id) => ({
                url: `manufacturers/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
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
