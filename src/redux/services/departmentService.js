import { apiService } from '../api/apiService';

export const departmentService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        departmentList: builder.query({
            query: (store) => ({
                url: `departments/${store}`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        departmentCreate: builder.mutation({
            query: (postBody) => ({
                url: `departments`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;
                    dispatch(
                        apiService.util.updateQueryData('departmentList', data.store, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        departmentUpdate: builder.mutation({
            query: (postBody) => ({
                url: `departments/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { data },
                    } = await queryFulfilled;

                    dispatch(
                        apiService.util.updateQueryData('departmentList', data.store, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === data._id);
                            draft[findIndex] = data;
                        })
                    );
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        departmentDelete: builder.mutation({
            query: (id) => ({
                url: `departments/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('departmentList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);
                    })
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
    useDepartmentListQuery,
    useDepartmentDeleteMutation,
    useDepartmentCreateMutation,
    useDepartmentUpdateMutation,
} = departmentService;
