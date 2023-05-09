//internal lib import

import { apiService } from '../api/apiService';

export const employeeService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url: `employees`,
                method: 'GET',
            }),
        }),
        employeeCreate: builder.mutation({
            query: (postBody) => ({
                url: `employees`,
                method: 'POST',
                body: postBody,
            }),
            async onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getEmployees', undefined, (draft) => {
                        draft.data.push(postBody);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),

        employeeUpdate: builder.mutation({
            query: ({ id, postBody }) => ({
                url: `employees/${id}`,
                method: 'PUT',
                body: postBody,
            }),
            async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getEmployees', undefined, (draft) => {
                        const findIndex = draft.data.findIndex((item) => item._id === id);
                        draft.data[findIndex] = postBody;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    response.undo();
                }
            },
        }),
        employeeDelete: builder.mutation({
            query: (id) => ({
                url: `employees/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('getEmployees', undefined, (draft) => {
                        draft.data = draft.data.filter((item) => item._id !== id);
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
export const { useGetEmployeesQuery, useEmployeeDeleteMutation, useEmployeeCreateMutation, useEmployeeUpdateMutation } =
    employeeService;
