'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    status: DataTypes.INTEGER,
    search_started_on: DataTypes.DATE,
    search_confirmed_on: DataTypes.DATE,
    trip_started_on: DataTypes.DATE,
    trip_completed_on: DataTypes.DATE,
    searched_from_lat: DataTypes.FLOAT,
    searched_from_long: DataTypes.FLOAT,
    trip_code:DataTypes.STRING,

    CarDriverId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'CarDrivers',
   
        // This is the column name of the referenced model
        key: 'id'
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    RiderId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Riders',
   
        // This is the column name of the referenced model
        key: 'id'
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }

   




  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};