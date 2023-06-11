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
                url: 'roles',
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {

                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('roleList', postBody.store, (draft) => {
                            draft.unshift(data)
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
            onQueryStarted({ id, postBody: { store } }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    console.log(data)
                    dispatch(
                        apiService.util.updateQueryData('roleList', store, (draft) => {

                            const findIndex = draft.findIndex((item) => item._id === id);

                            draft[findIndex] = data;
                        })
                    );
                });
            },
        }),
        roleDelete: builder.mutation({
            query: ({ id, storeID }) => ({
                url: `role/${id}`,
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
