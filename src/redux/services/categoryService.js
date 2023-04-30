//internal lib import
import { apiService } from '../api/apiService';
import { profileService } from './profileService';

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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled;
                    console.log(data);

                    dispatch(
                        apiService.util.updateQueryData('getCategories', undefined, (draft) => {
                            draft.push(data.data);
                        })
                    );
                } catch (e) {
                    console.log(e);
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
                const response = await queryFulfilled;

                try {
                    dispatch(
                        apiService.util.updateQueryData('getCategories', undefined, (draft) => {
                            const findIndex = draft.findIndex((role) => role._id === id);
                            Object.keys(postBody).map((key) => draft[findIndex].key = postBody[key]);
                        })
                    );
                } catch {

                }
            },
        }),
        categoryDelete: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getCategories', undefined, (draft) => {
                        draft.data = draft.data.filter(item => item._id !== id)

                    })
                );
                try {
                    await queryFulfilled

                } catch {
                    response.undo()
                }
            },
        }),
    }),
});
export const {
    useGetCategoriesQuery,
    useCategoryDeleteMutation,
    useCategoryCreateMutation,
    useCategoryUpdateMutation


} = categoryService;
