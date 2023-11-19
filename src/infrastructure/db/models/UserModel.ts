import { Table, Column, Model, DataType } from 'sequelize-typescript';
import dayjs from 'dayjs';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name',
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name',
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'username',
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
    unique: true,
  })
  email: string;

  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'password',
    unique: true,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_on',
  })
  createdOn: Date;
}
