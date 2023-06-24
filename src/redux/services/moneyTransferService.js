//Internal Lib Import

import { apiService } from '../api/apiService';

export const moneyTransferService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        moneyTransferList: builder.query({
            query: (store) => ({
                url: `accounts/${store}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        moneyTransferCreate: builder.mutation({
            query: (postBody) => ({
                url: `accounts`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('moneyTransferList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        moneyTransferImport: builder.mutation({
            query: ({ store, postBody }) => ({
                url: `imports/${store}/accounts`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ store, postBody }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) =>
                    dispatch(
                        apiService.util.updateQueryData(
                            'moneyTransferList',
                            store,
                            (draft) => (draft = data.concat(draft))
                        )
                    )
                );
            },
        }),

        moneyTransferUpdate: builder.mutation({
            query: (postBody) => ({
                url: `accounts/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;

                const response = dispatch(
                    apiService.util.updateQueryData('moneyTransferList', data.store, (draft) => {
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
        moneyTransferDelete: builder.mutation({
            query: (id) => ({
                url: `accounts/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('moneyTransferList', undefined, (draft) => {
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
        moneyTransferMultiDelete: builder.mutation({
            query: ({ ids, store }) => {
                console.log(ids);
                return {
                    url: `bulk/${store}/accounts`,
                    method: 'DELETE',
                    body: ids,
                };
            },
            onQueryStarted({ id, store }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(({ data: { data } }) =>
                    dispatch(
                        apiService.util.updateQueryData('moneyTransferList', store, (draft) =>
                            draft.filter((item) => (data.find((i) => item._id === i) ? false : true))
                        )
                    )
                );
            },
        }),
    }),
});
export const {
    useMoneyTransferListQuery,
    useMoneyTransferCreateMutation,
    useMoneyTransferDeleteMutation,
    useMoneyTransferImportMutation,
    useMoneyTransferUpdateMutation,
    useMoneyTransferMultiDeleteMutation,
} = moneyTransferService;
