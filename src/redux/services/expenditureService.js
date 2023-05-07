//internal lib import

import { apiService } from '../api/apiService';

export const expenditureService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getExpenditures: builder.query({
            query: () => ({
                url: `warranties`,
                method: 'GET',
            }),
        }),
        expenditureCreate: builder.mutation({
            query: (postBody) => ({
                url: `warranties`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getExpenditure', undefined, (draft) => {
                            draft.data.push(data.data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        expenditureUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `warranties/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getExpenditure', undefined, (draft) => {
                            const findIndex = draft.data.findIndex((item) => item._id === id);
                            draft.data[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        expenditureDelete: builder.mutation({
            query: (id) => ({
                url: `warranties/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getExpenditure', undefined, (draft) => {
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
    useGetExpendituresQuery,
    useExpenditureDeleteMutation,
    useExpenditureCreateMutation,
    useExpenditureUpdateMutation,
} = expenditureService;
