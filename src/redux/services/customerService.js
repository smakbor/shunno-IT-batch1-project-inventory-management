//Internal Lib Import

import { json } from 'react-router-dom';
import { apiService } from '../api/apiService';

export const customerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        customerList: builder.query({
            query: (store) => ({
                url: `customer/allCustomer`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        customerCreate: builder.mutation({
            query: (postBody) => ({
                url: `customer/create`,
                method: 'POST',
                body: postBody,
            }),

            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                   const {data: createdData} =  await queryFulfilled;
                    dispatch(
                        customerService.util.updateQueryData('customerList', undefined, (draft) => {
                            draft?.push(createdData.data)
                            console.log(JSON.stringify(draft))
                        })
                )} catch(error) {
                    console.log(error)
                }
            },
            
        }),
        customersImport: builder.mutation({
            query: ({ store, postBody }) => ({
                url: `imports/${store}/customers`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted({ store, postBody }, { dispatch, queryFulfilled }) {
                queryFulfilled.then(
                    ({ data: { data } }) => dispatch(
                        apiService.util.updateQueryData("customerList", undefined, (draft) => draft = data.concat(draft)
                        )
                    ))
            },

        }),

        customerUpdate: builder.mutation({
            query: (postBody) => ({
                url: `customer/update/${postBody?._id}`,
                method: 'PATCH',
                body: postBody,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: {data},
                    } = await queryFulfilled;
                    dispatch(
                        customerService.util.updateQueryData('customerList',undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === data._id);
                            draft[findIndex] = data;
                        })
                    );
                } catch (error){
                    console.log(error)
                }
            },
        }),
        customerDelete: builder.mutation({
            query: (id) => ({
                url: `customer/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        customerService.util.updateQueryData('customerList', undefined, (draft) => {
                            return draft.filter((item) => item._id !== id);
                        })
                )} catch(error) {
                    console.log(error)
                }
            },
        }),
        customerMultiDelete: builder.mutation({
            query: ({ ids, store }) => {
                console.log(ids)
                return ({
                    url: `bulk/${store}/customers`,
                    method: 'DELETE',
                    body: ids
                })
            },
            onQueryStarted({ ids, store }, { queryFulfilled, dispatch }) {
                queryFulfilled.then(
                    ({ data: { data } }) => dispatch(
                        apiService.util.updateQueryData("customerList", undefined, (draft) => draft.filter(item => data.find(i => item._id === i) ? false : true)

                        )
                    )
                )

            },
        }),
    }),
});
export const { useCustomerListQuery, useCustomerDeleteMutation, useCustomerCreateMutation, useCustomerUpdateMutation, useCustomersImportMutation, useCustomerMultiDeleteMutation } =
    customerService;
