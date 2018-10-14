'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
 
      return queryInterface.bulkInsert('Trips', [
        
       

        
            {
              "id": "1",
              "status": "4",
              "search_started_on": "2018-10-13 17:56:23",
              "search_confirmed_on": "2018-10-13 18:02:23",
              "trip_started_on": null,
              "trip_completed_on": null,
              "searched_from_lat": "-1.95459",
              "searched_from_long": "30.0917",
              "createdAt": "2018-10-13 17:56:23",
              "updatedAt": "2018-10-14 02:04:47",
              "trip_code": "51539453383893",
              "CarDriverId": "3",
              "RiderId": "5"
            },
            {
              "id": "2",
              "status": "7",
              "search_started_on": "2018-10-14 02:06:09",
              "search_confirmed_on": "2018-10-14 02:20:09",
              "trip_started_on": "2018-10-14 03:55:14",
              "trip_completed_on": "2018-10-14 04:47:15",
              "searched_from_lat": "-1.95459",
              "searched_from_long": "30.0917",
              "createdAt": "2018-10-14 02:06:09",
              "updatedAt": "2018-10-14 04:47:16",
              "trip_code": "61539482769314",
              "CarDriverId": "3",
              "RiderId": "5"
            },
            {
              "id": "3",
              "status": "7",
              "search_started_on": "2018-10-14 08:15:04",
              "search_confirmed_on": "2018-10-14 08:15:49",
              "trip_started_on": "2018-10-14 08:16:06",
              "trip_completed_on": "2018-10-14 08:28:18",
              "searched_from_lat": "-1.95459",
              "searched_from_long": "30.0917",
              "createdAt": "2018-10-14 08:15:04",
              "updatedAt": "2018-10-14 08:28:18",
              "trip_code": "51539504904922",
              "CarDriverId": "3",
              "RiderId": "5"
            },
            {
              "id": "4",
              "status": "2",
              "search_started_on": "2018-10-14 17:38:29",
              "search_confirmed_on": "2018-10-14 17:39:47",
              "trip_started_on": "2018-10-14 17:40:11",
              "trip_completed_on": "2018-10-14 17:40:53",
              "searched_from_lat": "-1.95459",
              "searched_from_long": "30.0917",
              "createdAt": "2018-10-14 17:38:29",
              "updatedAt": "2018-10-14 17:40:53",
              "trip_code": "51539538709266",
              "CarDriverId": "13",
              "RiderId": "8"
            },
            {
              "id": "5",
              "status": "7",
              "search_started_on": "2018-10-14 17:48:45",
              "search_confirmed_on": "2018-10-14 17:49:05",
              "trip_started_on": "2018-10-14 17:49:26",
              "trip_completed_on": "2018-10-14 17:54:58",
              "searched_from_lat": "-1.95459",
              "searched_from_long": "30.0917",
              "createdAt": "2018-10-14 17:48:45",
              "updatedAt": "2018-10-14 17:54:58",
              "trip_code": "51539539325944",
              "CarDriverId": "21",
              "RiderId": "12"
            },
            {
              "id": "6",
              "status": "2",
              "search_started_on": "2018-10-14 17:56:45",
              "search_confirmed_on": "2018-10-14 17:56:58",
              "trip_started_on": "2018-10-14 17:57:10",
              "trip_completed_on": "2018-10-14 17:57:43",
              "searched_from_lat": "-1.95459",
              "searched_from_long": "30.0917",
              "createdAt": "2018-10-14 17:56:45",
              "updatedAt": "2018-10-14 17:57:43",
              "trip_code": "61539539805106",
              "CarDriverId": "21",
              "RiderId": "12"
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

   return queryInterface.bulkDelete('Trips', null, {});
  }
};
