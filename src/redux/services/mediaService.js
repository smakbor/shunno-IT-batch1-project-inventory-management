//Internal Lib Import
import { apiService } from '../api/apiService';

export const mediaService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        mediaCreate: builder.mutation({
            query: (postBody) => ({
                url: `media`,
                method: 'POST',
                body: postBody,
            }),

        }),

    }),
});
export const {
    useMediaCreateMutation
} = mediaService;
