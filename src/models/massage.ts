import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";
import User from "./user";

export default class Message extends Model { }

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cipherMethod: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cipherKey: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Message',
        tableName: 'messages',
        timestamps: true,
        underscored: true,
    }
);
