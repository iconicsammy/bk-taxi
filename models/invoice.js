'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    invoice_date: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    distance:DataTypes.FLOAT,
    

    TripId: {
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
  Invoice.associate = function(models) {
    // associations can be defined here
  };
  return Invoice;
};