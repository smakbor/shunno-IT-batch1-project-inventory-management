//Internal Lib Import
import { apiService } from '../api/apiService';
export const categoryService = apiService.injectEndpoints({
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
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('unitList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),
    }),
});
export const { useUnitListQuery, useUnitCreateMutation } = categoryService;
