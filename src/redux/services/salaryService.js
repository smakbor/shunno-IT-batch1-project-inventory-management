//Internal Lib Import

import { apiService } from '../api/apiService';

export const salaryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        salaryList: builder.query({
            query: () => ({
                url: `salary`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        salaryCreate: builder.mutation({
            query: (postBody) => ({
                url: `salary`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('salaryList', undefined, (draft) => {
                        draft.push(postBody);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),

        salaryUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `salary/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('salaryList', undefined, (draft) => {
                        const findIndex = draft.findIndex((item) => item._id === id);
                        draft[findIndex] = postBody;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
        salaryDelete: builder.mutation({
            query: (id) => ({
                url: `salary/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('salaryList', undefined, (draft) => {
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
export const { useSalaryListQuery, useSalaryDeleteMutation, useSalaryCreateMutation, useSalaryUpdateMutation } =
    salaryService;
