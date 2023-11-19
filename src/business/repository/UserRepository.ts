import { CreateUserDto } from "src/dto/CreateUser.dto";
import { UserModel } from "src/infrastructure/db/models/UserModel";

export interface UserRepository {
    create: (user: CreateUserDto)=>Promise<UserModel>
}