//Internal Lib Import

import { apiService } from '../api/apiService';

export const uiService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        uiList: builder.query({
            query: (storeID) => ({
                url: `ui-settings/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        uiUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `ui-settings/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('getUnits', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = postBody;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});
export const { useUiListQuery, useUiUpdateMutation } = uiService;
