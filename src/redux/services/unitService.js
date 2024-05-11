//Internal Lib Import
import { apiService } from '../api/apiService';
export const unitService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        unitList: builder.query({
            query: (storeID) => ({
                url: `unit/allUnit`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        unitCreate: builder.mutation({
            query: (postBody) => ({
                url: `unit/create`,
                method: 'POST',   body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('unitList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        unitUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `unit/update/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('unitList', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;

                            return draft
                        })
                    );
                });
            },
        }),
        unitDelete: builder.mutation({
            query: (id) => ({
                url: `unit/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('unitList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);

                        return draft
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
export const {useUnitListQuery, useUnitCreateMutation,useUnitUpdateMutation,useUnitDeleteMutation } = unitService;
    
