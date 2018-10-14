'use strict';
module.exports = (sequelize, DataTypes) => {
  const TripRoute = sequelize.define('TripRoute', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    status:DataTypes.INTEGER,

    tripId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Trips',
   
        // This is the column name of the referenced model
        key: 'id'
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }

  }, {});
  TripRoute.associate = function(models) {
    // associations can be defined here
  };
  return TripRoute;
};