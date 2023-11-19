import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/UserModel';
import { DeliverablesModel } from '../models/DeliverablesModel';
import { InvitationsModel } from '../models/InvitationsModel';

export let sequelize: Sequelize;

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (): Promise<Sequelize> => {
            sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Pass123',
                database: 'handshake',
                logging: false,
                logQueryParameters: false,
                define: { timestamps: false }
            });
            sequelize.addModels([
                UserModel,
                DeliverablesModel,
                InvitationsModel
            ])
            return sequelize
        }
    }
]