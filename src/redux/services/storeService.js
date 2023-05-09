//internal lib import

import { apiService } from '../api/apiService';

export const storeService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: () => ({
                url: `stores`,
                method: 'GET',
            }),
        }),
        expenditureCreate: builder.mutation({
            query: (postBody) => ({
                url: `stores`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getStores', undefined, (draft) => {
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
                url: `stores/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getStores', undefined, (draft) => {
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
                url: `stores/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getStores', undefined, (draft) => {
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
    useGetStoresQuery,
    useExpenditureDeleteMutation,
    useExpenditureCreateMutation,
    useExpenditureUpdateMutation,
} = storeService;
