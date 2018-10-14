'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log('Taxi24 Models directory is located at ',__dirname)
//const config = require(__dirname + '/..\config\\config.json')[env];

const config=require(process.cwd() + '/config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config, {logging:false});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config, {logging:false});
}

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


//Relations
db.CarDriver.belongsTo(db.Driver);  
db.CarDriver.belongsTo(db.Car);
db.Driver.hasMany(db.CarDriver);
db.Car.hasMany(db.CarDriver);
db.Trip.belongsTo(db.Rider);
db.Trip.belongsTo(db.CarDriver);
db.Rider.hasMany(db.Trip);
db.CarDriver.hasMany(db.Trip);
db.TripRoute.belongsTo(db.Trip);
db.Trip.hasMany(db.TripRoute);
db.Invoice.belongsTo(db.Trip);
db.Trip.hasMany(db.Invoice);


module.exports = db;
