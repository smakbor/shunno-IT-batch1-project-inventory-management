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
                queryFulfilled
                    .then(({ data: { data } }) => {
                        dispatch(
                            apiService.util.updateQueryData('subcategoryList', undefined, (draft) => {
                                draft.unshift(data);
                            })
                        );
                    })
                    .catch((error) => {
                        console.error('Create mutation failed:', error);
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
                queryFulfilled
                    .then(({ data: { data } }) => {
                        dispatch(
                            apiService.util.updateQueryData('subcategoryList', undefined, (draft) => {
                                const findIndex = draft.findIndex((item) => item._id === id);
                                if (findIndex !== -1) {
                                    draft[findIndex] = data;
                                }
                            })
                        );
                    })
                    .catch((error) => {
                        console.error('Update mutation failed:', error);
                    });
            },
        }),
        subcategoryDelete: builder.mutation({
            query: (id) => ({
                url: `subCategory/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                console.log(id )
                const response = dispatch(
                    apiService.util.updateQueryData('subcategoryList', undefined, (draft) => {
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
