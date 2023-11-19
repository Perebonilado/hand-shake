import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/UserModel';

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
                UserModel
            ])
            return sequelize
        }
    }
]