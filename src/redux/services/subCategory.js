//Internal Lib Import
import { object } from 'joi';
import { apiService } from '../api/apiService';

export const subCategoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        subCategoryList: builder.query({
            query: () => ({
                url: `categories/subcategories`,
                method: 'GET',
            }),
        }),
        subCategoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `categories/subcategories`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('subCategoryList', undefined, (draft) => {
                        draft.data.push(postBody);
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
                        const findIndex = draft.data.findIndex((item) => item._id === id);
                        draft.data[findIndex] = postBody;
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
    useSubCategoryListQuery,
    useSubCategoryCreateMutation,
    useSubCategoryUpdateMutation,
    useSubCategoryDeleteMutation,
} = subCategoryService;
