'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      search_started_on: {
        type: Sequelize.DATE
      },
      search_confirmed_on: {
        type: Sequelize.DATE
      },
      trip_started_on: {
        type: Sequelize.DATE
      },
      trip_completed_on: {
        type: Sequelize.DATE
      },
      searched_from_lat: {
        type: Sequelize.FLOAT
      },
      searched_from_long: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      trip_code: {
        type: Sequelize.STRING
      },

      CarDriverId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Riders',
     
          // This is the column name of the referenced model
          key: 'id'
     
          // This declares when to check the foreign key constraint. PostgreSQL only.
          //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }

      

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};