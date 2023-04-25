//Internal Lib Import
import { apiService } from '../api/apiService';
import { profileService } from './profileService';

export const roleService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        roleList: builder.query({
            query: () => ({
                url: `category/categoryList`,
                method: 'GET',
            }),
        }),
        roleDropDown: builder.query({
            query: () => ({
                url: `category/categoryDropDown`,
                method: 'GET',
            }),
        }),
        roleCreate: builder.mutation({
            query: (postBody) => ({
                url: `category/categoryCreate`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('roleList', undefined, (draft) => {
                            draft.push(data.data);
                        })
                    );
                } catch {}
            },
        }),
        roleDetails: builder.query({
            query: (id) => ({
                url: `category/categoryDetails/${id}`,
                method: 'GET',
            }),
        }),
        roleUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `category/categoryUpdate/${id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data) {
                        dispatch(profileService.endpoints.profileDetails.initiate());
                    }

                    dispatch(
                        apiService.util.updateQueryData('roleList', undefined, (draft) => {
                            console.log(postBody);
                            const find = draft.find((role) => role._id === id);
                            const findIndex = draft.findIndex((role) => role._id === id);
                            draft[findIndex] = find;
                        })
                    );
                } catch {}
            },
        }),
        roleDelete: builder.mutation({
            query: (id) => ({
                url: `category/categoryDelete/${id}`,
                method: 'DELETE',
            }),
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
