//Internal Lib Import
import { apiService } from '../api/apiService';
import { userLogout } from '../features/authReducer';

export const profileService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        profileDetails: builder.query({
            query: () => ({
                url: `profile`,
                method: 'GET',
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    dispatch(userLogout());
                }
            },
            transformResponse: ({ data }) => {
                return {
                    proprietorID: data.proprietorID,
                    storeID: data.userDetails.storeID,
                    role: data.role,
                    mobile: data.mobile,
                    address: data.userDetails.due,
                    name: data.userDetails.name,
                    photo: data.userDetails.photo,
                    recievedSalaries: data.userDetails.recievedSalaries,
                    salary: data.userDetails.salary,
                    status: data.userDetails.status,
                    permissions: data.userDetails.roleID.permissions,
                };
            },
        }),
    }),
});
export const { useProfileDetailsQuery } = profileService;
