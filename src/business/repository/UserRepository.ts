import { UserModel } from "src/infrastructure/db/models/UserModel";

export interface UserRepository {
    findAll: ()=>Promise<UserModel[]>
}