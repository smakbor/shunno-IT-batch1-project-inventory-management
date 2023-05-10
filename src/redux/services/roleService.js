//Internal Lib Import
import { apiService } from '../api/apiService';

export const roleService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        roleList: builder.query({
            query: (storeID) => ({
                url: `role/${storeID}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data,
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
                url: `role`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted({ storeID }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('roleList', storeID, (draft) => {
                            draft.unshift(data?.data);
                        })
                    );
                    dispatch(
                        apiService.util.updateQueryData('roleDropDown', storeID, (draft) => {
                            draft.unshift({
                                _id: data?.data?._id,
                                label: data?.data?.name,
                                value: data?.data?._id,
                                createdAt: data?.data?.createdAt,
                                updatedAt: data?.data?.updatedAt,
                            });
                        })
                    );
                } catch {}
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
            async onQueryStarted({ id, postBody: { storeID } }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('roleList', storeID, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data?.data;
                        })
                    );
                    dispatch(
                        apiService.util.updateQueryData('roleDropDown', storeID, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex].permissions = data?.data?.permissions;
                        })
                    );
                } catch {}
            },
        }),
        roleDelete: builder.mutation({
            query: ({ id, storeID }) => ({
                url: `role/${id}/${storeID}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ id, storeID }, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData(
                        'roleList',
                        storeID,
                        (draft) => (draft = draft.filter((item) => item._id !== id))
                    )
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
    useRoleListQuery,
    useRoleDropDownQuery,
    useRoleCreateMutation,
    useRoleUpdateMutation,
    useLazyRoleDetailsQuery,
    useRoleDeleteMutation,
} = roleService;
