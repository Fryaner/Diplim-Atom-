import { UserModel } from "../../../models/userModel";
import mainApi from "../../../store/mainApi";

const apiEditUser = mainApi.injectEndpoints({
    endpoints: (build) => ({
        editUser: build.mutation<UserModel, UserModel>({
            query: (body) => ({
                url: 'user/edit',
                method: 'PATCH',
                body: body,
            })
        })
    })
})

export const { useEditUserMutation } = apiEditUser; 