import { CreateUserDto } from "src/dto/CreateUser.dto";
import { UserModel } from "src/infrastructure/db/models/UserModel";

export abstract class UserRepository {
   abstract create: (user: CreateUserDto)=>Promise<UserModel>
}