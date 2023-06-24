//Internal Lib Import

import { apiService } from '../api/apiService';

export const accountStatementService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        accountStatementList: builder.query({
            query: (store) => ({
                url: `account-statement/${store}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        accountStatementCreate: builder.mutation({
            query: (postBody) => ({
                url: `account-statement`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('accountStatementList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        accountStatementImport: builder.mutation({
            query: ({ store, postBody }) => ({
                url: `imports/${store}/account-statement`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ store, postBody }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) =>
                    dispatch(
                        apiService.util.updateQueryData(
                            'accountStatementList',
                            store,
                            (draft) => (draft = data.concat(draft))
                        )
                    )
                );
            },
        }),

        accountStatementUpdate: builder.mutation({
            query: (postBody) => ({
                url: `account-statement/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const {
                    data: { data },
                } = await queryFulfilled;

                const response = dispatch(
                    apiService.util.updateQueryData('accountStatementList', data.store, (draft) => {
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
        accountStatementDelete: builder.mutation({
            query: (id) => ({
                url: `account-statement/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('accountStatementList', undefined, (draft) => {
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
        accountStatementMultiDelete: builder.mutation({
            query: ({ ids, store }) => {
                console.log(ids);
                return {
                    url: `bulk/${store}/account-statement`,
                    method: 'DELETE',
                    body: ids,
                };
            },
            onQueryStarted({ id, store }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(({ data: { data } }) =>
                    dispatch(
                        apiService.util.updateQueryData('accountStatementList', store, (draft) =>
                            draft.filter((item) => (data.find((i) => item._id === i) ? false : true))
                        )
                    )
                );
            },
        }),
    }),
});
export const {
    useAccountStatementListQuery,
    useAccountStatementDeleteMutation,
    useAccountStatementCreateMutation,
    useAccountStatementUpdateMutation,
    useAccountStatementImportMutation,
    useAccountStatementMultiDeleteMutation,
} = accountStatementService;
