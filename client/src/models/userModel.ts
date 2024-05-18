export interface UserModel {
    id?: string,
    lastName: string,
    firstName: string,
    login: string,
    email: string, 
    password: string,
    isActivated?: boolean,
    createdAt?: string,
}