//internal lib import
import { apiService } from '../api/apiService';

export const subCategoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubCategories: builder.query({
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);

                    dispatch(
                        apiService.util.updateQueryData('getSubCategories', undefined, (draft) => {
                            draft.push(data.data);
                        })
                    );
                } catch (e) {
                    console.log(e);
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
                const response = await queryFulfilled;

                try {
                    dispatch(
                        apiService.util.updateQueryData('getCategories', undefined, (draft) => {
                            const findIndex = draft.findIndex((role) => role._id === id);
                            Object.keys(postBody).map((key) => (draft[findIndex].key = postBody[key]));
                        })
                    );
                } catch {}
            },
        }),
        subCategoryDelete: builder.mutation({
            query: (id) => ({
                url: `categories/subcategories/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
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
    useGetSubCategoriesQuery,
    useSubCategoryCreateMutation,
    useSubCategoryUpdateMutation,
    useSubCategoryDeleteMutation,
} = subCategoryService;
