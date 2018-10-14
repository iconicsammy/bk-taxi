'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
 
      return queryInterface.bulkInsert('Invoices', [
        
        
            {
              "id": "64",
              "amount": "400",
              "distance": "0",
              "createdAt": "2018-10-14 13:46:51",
              "updatedAt": "2018-10-14 13:46:51",
              "invoice_date": "2018-10-14 13:46:51",
              "TripId": "3"
            },
            {
              "id": "78",
              "amount": "51080",
              "distance": "50.98",
              "createdAt": "2018-10-14 16:52:53",
              "updatedAt": "2018-10-14 16:52:53",
              "invoice_date": "2018-10-14 16:52:53",
              "TripId": "2"
            },
            {
              "id": "83",
              "amount": "400",
              "distance": "0",
              "createdAt": "2018-10-14 17:37:46",
              "updatedAt": "2018-10-14 17:37:46",
              "invoice_date": "2018-10-14 17:37:46",
              "TripId": "1"
            },
            {
              "id": "84",
              "amount": "27710",
              "distance": "27.61",
              "createdAt": "2018-10-14 17:40:53",
              "updatedAt": "2018-10-14 17:40:53",
              "invoice_date": "2018-10-14 17:40:53",
              "TripId": "4"
            },
            {
              "id": "88",
              "amount": "25600",
              "distance": "25.5",
              "createdAt": "2018-10-14 17:54:58",
              "updatedAt": "2018-10-14 17:54:58",
              "invoice_date": "2018-10-14 17:54:58",
              "TripId": "5"
            },
            {
              "id": "89",
              "amount": "26980",
              "distance": "26.88",
              "createdAt": "2018-10-14 17:57:43",
              "updatedAt": "2018-10-14 17:57:43",
              "invoice_date": "2018-10-14 17:57:43",
              "TripId": "6"
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

   return queryInterface.bulkDelete('Invoices', null, {});
  }
};
