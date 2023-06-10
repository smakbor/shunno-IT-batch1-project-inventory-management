//Internal Lib Import
import { apiService } from '../api/apiService';

export const warrantyService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        warrantyList: builder.query({
            query: (storeID) => ({
                url: `warranties/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        warrantyCreate: builder.mutation({
            query: (postBody) => ({
                url: `warranties`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        warrantyUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `warranties/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        warrantyDelete: builder.mutation({
            query: (id) => ({
                url: `warranties/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('warrantyList', undefined, (draft) => {
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
    useWarrantyListQuery,
    useWarrantyDeleteMutation,
    useWarrantyCreateMutation,
    useWarrantyUpdateMutation,
} = warrantyService;
