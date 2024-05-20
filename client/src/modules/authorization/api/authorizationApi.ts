import mainApi from '../../../store/mainApi';
import { UserModel } from '../../../models/userModel';
import { RegisterModel } from '../../../models/registerModel';

const authorizationApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<RegisterModel, UserModel>({
            query: (body) => ({
                url: 'user/login',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
        }),
        logout: build.mutation<string, void>({
            query: () => ({
                url: 'user/logout',
                method: 'POST',
            })
        })
    }),
})

export const { 
    useLoginMutation,
    useLogoutMutation,
} = authorizationApi;