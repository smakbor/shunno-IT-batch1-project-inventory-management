//Internal Lib Import
import { apiService } from '../api/apiService';
export const brandService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        brandList: builder.query({
            query: (storeID) => ({
                url: `brand/allBrand`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        brandCreate: builder.mutation({
            query: (postBody) => ({
                url: `brand/create`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('brandList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        brandUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `brand/update/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('brandList', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;

                            return draft
                        })
                    );
                });
            },
        }),
        brandDelete: builder.mutation({
            query: (id) => ({
                url: `brand/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('brandList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);

                        return draft
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


export const {useBrandListQuery, useBrandDeleteMutation, useBrandCreateMutation,useBrandUpdateMutation} = brandService;