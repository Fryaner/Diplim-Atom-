import mainApi from '../../../store/mainApi';
import { UserModel } from '../../../models/userModel';

const registerApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<UserModel[], void>({
            query: () => 'user'
        }),
        addUser: build.mutation<[], UserModel>({
            query: (body) => ({
                url: 'user/registration',
                method: 'POST',
                body: body
            })
        })
    }),
})

export const { 
    useGetAllUsersQuery, 
    useAddUserMutation 
} = registerApi;