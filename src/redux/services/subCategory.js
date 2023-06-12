//Internal Lib Import
import { object } from 'joi';
import { apiService } from '../api/apiService';

export const subCategoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        subCategoryList: builder.query({
            query: (storeID) => ({
                url: `sub-categories/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        subCategoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `sub-categories`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('subCategoryList', undefined, (draft) => {
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

        subCategoryUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `sub-categories/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('subCategoryList', undefined, (draft) => {
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
        subCategoryDelete: builder.mutation({
            query: (id) => ({
                url: `sub-categories/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('subCategoryList', undefined, (draft) => {
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
    useSubCategoryListQuery,
    useSubCategoryCreateMutation,
    useSubCategoryUpdateMutation,
    useSubCategoryDeleteMutation,
} = subCategoryService;
