'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    min_distance: DataTypes.DECIMAL,
    max_distance: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
  };
  return Payment;
};