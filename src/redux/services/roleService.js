//Internal Lib Import
import { apiService } from '../api/apiService';

export const roleService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        roleList: builder.query({
            query: (storeID) => ({
                url: `role/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        roleDropDown: builder.query({
            query: (storeID) => ({
                url: `role/dropDown/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data,
        }),
        roleCreate: builder.mutation({
            query: (postBody) => ({
                url: `role/${postBody.storeID}`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ storeID }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data }) => {
                    dispatch(
                        apiService.util.updateQueryData('roleList', storeID, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),
        roleDetails: builder.query({
            query: (id) => ({
                url: `role/roleDetails/${id}`,
                method: 'GET',
            }),
        }),
        roleUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `role/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            onQueryStarted({ id, postBody: { storeID } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data }) => {
                    dispatch(
                        apiService.util.updateQueryData('roleList', storeID, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                        })
                    );
                });
            },
        }),
        roleDelete: builder.mutation({
            query: ({ id, storeID }) => ({
                url: `role/${id}/${storeID}`,
                method: 'DELETE',
            }),
            onQueryStarted({ id, storeID }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(() => {
                    dispatch(
                        apiService.util.updateQueryData(
                            'roleList',
                            storeID,
                            (draft) => (draft = draft.filter((item) => item._id !== id))
                        )
                    );
                });
            },
        }),
    }),
});
export const {
    useRoleListQuery,
    useRoleDropDownQuery,
    useRoleCreateMutation,
    useRoleUpdateMutation,
    useLazyRoleDetailsQuery,
    useRoleDeleteMutation,
} = roleService;
