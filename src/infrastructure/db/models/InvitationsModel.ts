import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { UserModel } from './UserModel';
import { DeliverablesModel } from './DeliverablesModel';
import { InvitationStatusEnum } from 'src/infrastructure/web/models/InvitationStatusEnum';

@Table({ tableName: 'invitations' })
export class InvitationsModel extends Model<InvitationsModel> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({
    field: 'sent_to',
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  sentTo: boolean;

  @Column({
    field: 'status',
    allowNull: false,
    type: DataType.STRING
  })
  status: InvitationStatusEnum

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    field: 'created_by',
    allowNull: false,
  })
  createdBy: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_on',
  })
  createdOn: Date;
}
