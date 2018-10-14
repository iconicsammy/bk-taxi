'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
 
      return queryInterface.bulkInsert('TripRoutes', [
        
            {
              "id": "7",
              "latitude": "-1.98642",
              "longitude": "30.1807",
              "createdAt": "2018-10-14 08:16:06",
              "updatedAt": "2018-10-14 08:16:06",
              "status": "7",
              "TripId": "3"
            },
            {
              "id": "8",
              "latitude": "-1.97451",
              "longitude": "30.1056",
              "createdAt": "2018-10-14 08:16:47",
              "updatedAt": "2018-10-14 08:16:47",
              "status": "1",
              "TripId": "3"
            },
            {
              "id": "9",
              "latitude": "-1.97451",
              "longitude": "30.1056",
              "createdAt": "2018-10-14 08:28:18",
              "updatedAt": "2018-10-14 08:28:18",
              "status": "7",
              "TripId": "3"
            },
            {
              "id": "11",
              "latitude": "-1.91997",
              "longitude": "30.0892",
              "createdAt": "2018-10-14 16:12:59",
              "updatedAt": "2018-10-14 16:12:59",
              "status": "2",
              "TripId": "2"
            },
            {
              "id": "12",
              "latitude": "-1.97292",
              "longitude": "30.0642",
              "createdAt": "0000-00-00 00:00:00",
              "updatedAt": "0000-00-00 00:00:00",
              "status": "1",
              "TripId": "2"
            },
            {
              "id": "13",
              "latitude": "-1.94087",
              "longitude": "30.0714",
              "createdAt": "0000-00-00 00:00:00",
              "updatedAt": "0000-00-00 00:00:00",
              "status": "1",
              "TripId": "2"
            },
            {
              "id": "14",
              "latitude": "-1.8946",
              "longitude": "30.2906",
              "createdAt": "0000-00-00 00:00:00",
              "updatedAt": "0000-00-00 00:00:00",
              "status": "1",
              "TripId": "2"
            },
            {
              "id": "15",
              "latitude": "-1.98642",
              "longitude": "30.1807",
              "createdAt": "0000-00-00 00:00:00",
              "updatedAt": "0000-00-00 00:00:00",
              "status": "7",
              "TripId": "2"
            },
            {
              "id": "16",
              "latitude": "-1.97451",
              "longitude": "30.1056",
              "createdAt": "2018-10-14 17:40:11",
              "updatedAt": "2018-10-14 17:40:11",
              "status": "1",
              "TripId": "4"
            },
            {
              "id": "17",
              "latitude": "-2.12031",
              "longitude": "29.9045",
              "createdAt": "2018-10-14 17:40:53",
              "updatedAt": "2018-10-14 17:40:53",
              "status": "7",
              "TripId": "4"
            },
            {
              "id": "18",
              "latitude": "-2.12031",
              "longitude": "29.9045",
              "createdAt": "2018-10-14 17:49:26",
              "updatedAt": "2018-10-14 17:49:26",
              "status": "1",
              "TripId": "5"
            },
            {
              "id": "19",
              "latitude": "-1.97159",
              "longitude": "30.0792",
              "createdAt": "2018-10-14 17:50:06",
              "updatedAt": "2018-10-14 17:50:06",
              "status": "1",
              "TripId": "5"
            },
            {
              "id": "20",
              "latitude": "-1.97159",
              "longitude": "30.0792",
              "createdAt": "2018-10-14 17:51:25",
              "updatedAt": "2018-10-14 17:51:25",
              "status": "1",
              "TripId": "5"
            },
            {
              "id": "21",
              "latitude": "-1.97159",
              "longitude": "30.0792",
              "createdAt": "2018-10-14 17:52:38",
              "updatedAt": "2018-10-14 17:52:38",
              "status": "1",
              "TripId": "5"
            },
            {
              "id": "22",
              "latitude": "-1.97159",
              "longitude": "30.0792",
              "createdAt": "2018-10-14 17:54:58",
              "updatedAt": "2018-10-14 17:54:58",
              "status": "7",
              "TripId": "5"
            },
            {
              "id": "23",
              "latitude": "-1.97159",
              "longitude": "30.0792",
              "createdAt": "2018-10-14 17:57:10",
              "updatedAt": "2018-10-14 17:57:10",
              "status": "2",
              "TripId": "6"
            },
            {
              "id": "24",
              "latitude": "-1.99094",
              "longitude": "30.3203",
              "createdAt": "2018-10-14 17:57:43",
              "updatedAt": "2018-10-14 17:57:43",
              "status": "7",
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

   return queryInterface.bulkDelete('TripRoutes', null, {});
  }
};
