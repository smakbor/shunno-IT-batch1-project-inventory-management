//Internal Lib Import
import { apiService } from '../api/apiService';
export const subcategoryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        subcategoryList: builder.query({
            query: (storeID) => ({
                url: `/subCategory/allSubCategory`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        subcategoryCreate: builder.mutation({
            query: (postBody) => ({
                url: `subCategory/create`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('subcategoryList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        subcategoryUpdate: builder.mutation({
            query: ({ id, formData }) => ({
                url: `subCategory/update/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            onQueryStarted({ id, formData: { store } }, { dispatch, queryFulfilled }) {
                console.log(id);
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                            return draft;
                        })
                    );
                });
            },
        }),
        subcategoryDelete: builder.mutation({
            query: (id) => ({
                url: `subCategory/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);

                        return draft;
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
    useSubcategoryListQuery,
    useSubcategoryCreateMutation,
    useSubcategoryUpdateMutation,
    useSubcategoryDeleteMutation,
} = subcategoryService;
