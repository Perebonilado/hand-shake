import { UserModel } from "src/infrastructure/db/models/UserModel";

export interface CreateUserResponse {
    user: UserModel
}