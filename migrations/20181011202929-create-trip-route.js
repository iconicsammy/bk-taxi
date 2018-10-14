'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TripRoutes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
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
      status: {

        type: Sequelize.INTEGER
      },
      TripId: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Trips',
     
          // This is the column name of the referenced model
          key: 'id'
     
          // This declares when to check the foreign key constraint. PostgreSQL only.
          //deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TripRoutes');
  }
};