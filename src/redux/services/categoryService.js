//Internal Lib Import
import { apiService } from '../api/apiService';
export const categoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        categoryList: builder.query({
            query: (storeID) => ({
                url: `categories/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        categoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `categories`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled, queryCache }) {
                const cachedData = queryCache.getState()
                console.log(cachedData)
                // const cachedUnits = apiService.endpoints.unitList.select(storeID)
                // const { data: cacheData } = useUnitListQuery(cachedUnits)
                // console.log(cacheData)
                const response = dispatch(
                    apiService.util.updateQueryData('categoryList', undefined, (draft) => {
                        draft.push(postBody);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),

        categoryUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `categories/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('categoryList', undefined, (draft) => {
                        const findIndex = draft.findIndex((item) => item._id === id);
                        draft[findIndex] = postBody;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
        categoryDelete: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('categoryList', undefined, (draft) => {
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
export const { useCategoryListQuery, useCategoryDeleteMutation, useCategoryCreateMutation, useCategoryUpdateMutation } =
    categoryService;
