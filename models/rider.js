'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rider = sequelize.define('Rider', {
    name: DataTypes.STRING,
    rider_code: DataTypes.STRING,
    rider_status: DataTypes.INTEGER
  }, {});
  Rider.associate = function(models) {
    // associations can be defined here
  };
  return Rider;
};