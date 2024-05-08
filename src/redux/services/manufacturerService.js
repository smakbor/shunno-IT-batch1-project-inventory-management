//Internal Lib Import
import { apiService } from '../api/apiService';
export const manufacturerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        manufacturerList: builder.query({
            query: (storeID) => ({
                url: `manufacturer/allManufacturer`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        manufacturerCreate: builder.mutation({
            query: (postBody) => ({
                url: `manufacturer/create`,
                method: 'POST',   body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        manufacturerUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `manufacturer/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('manufacturerList', store, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                        })
                    );
                });
            },
        }),
        categoryDelete: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
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
export const { useManufacturerListQuery, useManufacturerCreateMutation} =
    manufacturerService;
