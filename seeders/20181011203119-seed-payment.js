'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
 
      return queryInterface.bulkInsert('Payments', [
        
        {
        min_distance: 0,
        max_distance:2,
        amount:300
       },

       {
        min_distance: 2,
        max_distance:4,
        amount:400
       },

       {
        min_distance: 4,
        max_distance:6,
        amount:500
       }



    
    
    
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

   return queryInterface.bulkDelete('Payments', null, {});
  }
};
