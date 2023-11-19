import { RolesEnum } from "src/infrastructure/web/models/Roles";

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: RolesEnum
}
