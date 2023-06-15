//Internal Lib Import
import { useSelector } from 'react-redux';
import { apiService } from '../api/apiService';


export const mediaService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        mediaList: builder.query({
            query: (store) => ({
                url: `media/${store}`,
                method: 'GET'
            }),
            transformResponse: ({ data }) => data || []
        }),

        mediaCreate: builder.mutation({
            query: (postBody) => ({
                url: `media`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(
                    ({ data: { data } }) => dispatch(
                        apiService.util.updateQueryData("mediaList", postBody[0].store, (draft) => draft = data.concat(draft)
                        )
                    ))
            },
        }),
        mediaDelete: builder.mutation({
            query: ({ id, store, permanent }) => (
                {
                    url: `media/${id}?permanent=${permanent}`,
                    method: 'DELETE'
                }
            ),
            onQueryStarted({ id, store }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(
                    ({ data: { data } }) => dispatch(
                        apiService.util.updateQueryData("mediaList", store, (draft) => draft.filter(item => item._id !== id)
                        )
                    )
                )
            },
        }),
        mediaMultiDelete: builder.mutation({
            query: ({ mediaIds, store, permanent }) => {
                return (
                    {
                        url: `media/bulk/delete?permanent=${permanent}`,
                        method: 'DELETE',
                        body: { mediaIds, store }
                    }
                )
            },
            onQueryStarted({ mediasIds, store, permanent }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(
                    ({ data: { data } }) => dispatch(
                        apiService.util.updateQueryData("mediaList", store, (draft) => draft.filter(item => data.find(i => item._id === i._id) ? false : true)

                        )
                    )
                )

            },
        })

    }),
});
export const {
    useMediaCreateMutation,
    useMediaListQuery,
    useMediaDeleteMutation,
    useMediaMultiDeleteMutation
} = mediaService;
