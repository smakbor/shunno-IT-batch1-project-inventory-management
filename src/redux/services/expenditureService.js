//internal lib import

import { apiService } from '../api/apiService';

export const expenditureService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getExpenditures: builder.query({
            query: () => ({
                url: `expenditures`,
                method: 'GET',
            }),
        }),
        expenditureCreate: builder.mutation({
            query: (postBody) => ({
                url: `expenditures`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getExpenditures', undefined, (draft) => {
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
                url: `expenditures/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getExpenditures', undefined, (draft) => {
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
                url: `expenditures/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getExpenditures', undefined, (draft) => {
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
