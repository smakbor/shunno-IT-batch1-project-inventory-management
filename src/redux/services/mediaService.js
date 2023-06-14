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
            query: ({ id, store }) => (
                {
                    url: `media/${id}?permanent=false`,
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
        })

    }),
});
export const {
    useMediaCreateMutation,
    useMediaListQuery,
    useMediaDeleteMutation
} = mediaService;
