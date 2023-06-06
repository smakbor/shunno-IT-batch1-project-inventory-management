//Internal Lib Import
import { object } from 'joi';
import { apiService } from '../api/apiService';

export const subCategoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        subCategoryList: builder.query({
            query: (storeID) => ({
                url: `categories/subcategories/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        subCategoryCreate: builder.mutation({
            query: ({ storeID, postBody }) => ({
                url: `categories/subcategories/${storeID}`,
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
                url: `categories/subcategories/${id}`,
                method: 'PUT',
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
                url: `categories/subcategories/${id}`,
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
