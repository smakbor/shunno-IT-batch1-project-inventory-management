//internal lib import

import { apiService } from '../api/apiService';

export const expenditureService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        expenditureList: builder.query({
            query: (storeID) => ({
                url: `expenditures/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        expenditureCreate: builder.mutation({
            query: ({ postBody }) => ({
                url: `expenditures/${postBody.storeID}`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ postBody }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('expenditureList', postBody.storeID, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),
        expenditureUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `expenditures/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getExpenditures', postBody.storeID, (draft) => {
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
        expenditureDelete: builder.mutation({
            query: (id) => ({
                url: `expenditures/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getExpenditures', undefined, (draft) => {
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
    useExpenditureListQuery,
    useExpenditureDeleteMutation,
    useExpenditureCreateMutation,
    useExpenditureUpdateMutation,
} = expenditureService;
