'use strict';

//import Driver from './driver';

//const Driver=require('./driver');



module.exports = (sequelize, DataTypes) => {
  const CarDriver = sequelize.define('CarDriver', {
    status: DataTypes.INTEGER,
    last_lat: DataTypes.STRING,
    last_long: DataTypes.STRING,
    last_location_updated_on: DataTypes.DATE,
    DriverId:{

      type:DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Drivers',
   
        // This is the column name of the referenced model
        key: 'id'
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }

    },
    CarId:{

      type:DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Cars',
   
        // This is the column name of the referenced model
        key: 'id'
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }

    }

   

  }, {});
  CarDriver.associate = function(models) {

    // associations can be defined here
    /*
    CarDriver.belongsTo(models.Driver, {
      onDelete: 'CASCADE',
      foreignKey:'driver_id'
    });
    */
   
    
  };
  return CarDriver;
};

/*
CarDriver.belongsTo(Driver, {
  onDelete: 'CASCADE'
});

Driver.hasMany(CarDriver, {
  onDelete:'CASCADE'
})
*/




