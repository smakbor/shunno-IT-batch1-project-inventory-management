//Internal Lib Import
import { apiService } from '../api/apiService';

export const roleService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        roleList: builder.query({
            query: (storeID) => ({
                url: `roles/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        roleDropDown: builder.query({
            query: (storeID) => ({
                url: `roles/dropDown/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data,
        }),
        roleCreate: builder.mutation({
            query: (postBody) => ({
                url: `roles/${postBody.storeID}`,
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
                url: `roles/roleDetails/${id}`,
                method: 'GET',
            }),
        }),
        roleUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `roles/${id}`,
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
