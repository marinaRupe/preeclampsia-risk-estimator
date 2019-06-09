import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

export const db: any = {};

const basename = path.basename(__filename);

export const initialize = (sequelize) => {
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

export default {
  initialize,
  db
};