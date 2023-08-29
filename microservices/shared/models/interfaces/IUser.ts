interface IUser {
    username: string,
    email: string,
    password: string,
    profileDetails?: {
        address?: string,
        phone?: string,
    },
    createdAt: Date,
    updatedAt: Date
}

export default IUser;