import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Tool from '../models/Tool';
import User from '../models/User';

const models = [
  Tool, User,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
