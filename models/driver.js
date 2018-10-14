'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    driver_code: DataTypes.STRING,
    driver_status: DataTypes.INTEGER
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
   
  };
  return Driver;
};