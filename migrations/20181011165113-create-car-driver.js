'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CarDrivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      last_lat: {
        type: Sequelize.STRING
      },
      last_long: {
        type: Sequelize.STRING
      },
      last_location_updated_on: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      DriverId: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Drivers',
     
          // This is the column name of the referenced model
          key: 'id'
     
          // This declares when to check the foreign key constraint. PostgreSQL only.
          //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }

      },

      CarId: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Cars',
     
          // This is the column name of the referenced model
          key: 'id'
     
          // This declares when to check the foreign key constraint. PostgreSQL only.
          //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CarDrivers');
  }
};