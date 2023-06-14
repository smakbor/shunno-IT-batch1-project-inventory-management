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
                    ({ data: { data } }) => {
                        console.log(data)
                        dispatch(
                            apiService.util.updateQueryData("mediaList", postBody.store, (draft) => {
                                data.forEach(item => draft.unshift(item))
                                console.log(JSON.stringify(draft))
                            })
                        )

                    }
                )
            },

        }),
        mediaDelete: builder.mutation({
            query: ({ id, store }) => (
                {
                    url: `media/${id}?permanent=false`,
                    method: 'DELETE'
                }
            ),
            async onQueryStarted({ id, store }, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('mediaList', store, (draft) => {
                        draft = draft.filter(item => item._id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        })

    }),
});
export const {
    useMediaCreateMutation,
    useMediaListQuery,
    useMediaDeleteMutation
} = mediaService;
