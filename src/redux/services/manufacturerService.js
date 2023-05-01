//internal lib import

import { apiService } from '../api/apiService';

export const manufacturerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getManufacturers: builder.query({
            query: () => ({
                url: `manufacturers`,
                method: 'GET',
            }),
        }),
        manufacturerCreate: builder.mutation({
            query: (postBody) => ({
                url: `manufacturers`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('manufacturers', undefined, (draft) => {
                            draft.data.push(data.data);
                        })
                    );
                } catch (e) {
                    console.log(e);
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
                try {
                    const { data } = await queryFulfilled;
                    console.log(data.data);
                    dispatch(
                        apiService.util.updateQueryData('manufacturers', undefined, (draft) => {
                            const findIndex = draft.data.findIndex((item) => item._id === id);
                            draft.data[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
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
                    apiService.util.updateQueryData('manufacturers', undefined, (draft) => {
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
    useGetManufacturersQuery,
    useManufacturerDeleteMutation,
    useManufacturerCreateMutation,
    useManufacturerUpdateMutation,
} = manufacturerService;
