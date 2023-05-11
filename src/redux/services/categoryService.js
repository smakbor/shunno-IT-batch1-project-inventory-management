//Internal Lib Import
import { apiService } from '../api/apiService';

export const categoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: `categories`,
                method: 'GET',
            }),
        }),
        categoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `categories`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getCategories', undefined, (draft) => {
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

        categoryUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getCategories', undefined, (draft) => {
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
        categoryDelete: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getCategories', undefined, (draft) => {
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
    useGetCategoriesQuery,
    useCategoryDeleteMutation,
    useCategoryCreateMutation,
    useCategoryUpdateMutation,
} = categoryService;
