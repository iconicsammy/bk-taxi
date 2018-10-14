'use strict';
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    plate_number: DataTypes.STRING,
    car_status: DataTypes.INTEGER
  }, {});
  Car.associate = function(models) {
    // associations can be defined here
  };
  return Car;
};