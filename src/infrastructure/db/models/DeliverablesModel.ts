import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { StatusEnum } from 'src/infrastructure/web/models/StatusEnum';
import { UserModel } from './UserModel';
import { InvitationsModel } from './InvitationsModel';

@Table({ tableName: 'deliverables' })
export class DeliverablesModel extends Model<DeliverablesModel> {
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
    field: 'title',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'due_date',
  })
  dueDate: Date;

  @Column({
    type: DataType.STRING,
    field: 'status',
  })
  status: StatusEnum;

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

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    field: 'modified_by',
    allowNull: false,
  })
  modifiedBy: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'modified_on',
  })
  modifiedOn: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'is_disputed',
  })
  isDisputed: boolean;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    field: 'dependant',
    allowNull: false,
  })
  dependant: number;

  @Column({
    type: DataType.BIGINT,
    field: 'price',
  })
  price: number;

  @Column({
    field: 'requires_confirmation',
    type: DataType.BOOLEAN
  })
  requiresConfirmation: boolean;

  @Column({
    field: 'is_confirmed',
    type: DataType.BOOLEAN
  })
  isConfirmed: boolean

  @Column({
    field: 'invite_accepted',
    type: DataType.BOOLEAN
  })
  inviteAccepted: boolean

  @ForeignKey(()=>InvitationsModel)
  @Column({
    type: DataType.BIGINT,
    field: 'invitation_id'
  })
  invitationId: number

  @BelongsTo(()=>InvitationsModel)
  invitation: InvitationsModel
}
