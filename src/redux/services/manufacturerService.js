//Internal Lib Import
import { apiService } from '../api/apiService';
export const manufacturerService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        manufacturerList: builder.query({
            query: (storeID) => ({
                url: `manufacturer/allManufacturer`,
                method: 'GET',
            }),
            transformResponse: ({ data }) => data || [],
        }),
        manufacturerCreate: builder.mutation({
            query: (postBody) => ({
                url: `manufacturer/create`,
                method: 'POST',
                body: postBody,
            }),
            onQueryStarted(postBody, { dispatch, queryFulfilled }) {
                queryFulfilled.then(({ data: { data } }) => {
                    console.log(data);
                    dispatch(
                        apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
                            draft.unshift(data);
                        })
                    );
                });
            },
        }),

        manufacturerUpdate: builder.mutation({
            query: ({ id, formData }) => ({
                url: `manufacturer/update/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            onQueryStarted({ id, formData: { store } }, { dispatch, queryFulfilled }) {
                console.log(id);
                queryFulfilled.then(({ data: { data } }) => {
                    dispatch(
                        apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
                            const findIndex = draft.findIndex((item) => item._id === id);
                            draft[findIndex] = data;
                            return draft;
                        })
                    );
                });
            },
        }),
        manufactureDelete: builder.mutation({
            query: (id) => ({
                url: `manufacturer/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                const response = dispatch(
                    apiService.util.updateQueryData('manufacturerList', undefined, (draft) => {
                        draft = draft.filter((item) => item._id !== id);

                        return draft;
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
    useManufacturerListQuery,
    useManufacturerCreateMutation,
    useManufacturerUpdateMutation,
    useManufactureDeleteMutation,
} = manufacturerService;
