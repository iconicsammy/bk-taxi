'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.FLOAT
      },
      distance: {
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
      invoice_date: {

        type: Sequelize.DATE
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
    return queryInterface.dropTable('Invoice');
  }
};