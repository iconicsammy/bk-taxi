const db = require('../../../models'); // new require for db object
import app_settings from '../../../config/settings';



export default {

    showDrivers(req,res,next){
        /*
        Show list of drivers. Result is paginated. To go the next page, pass page as query string

            E.g. /drivers?page=3
        
        
        To show drivers who are currently  only active (i.e. can take a trip), pass active=1

            /?active=1
        
    

        */

       

        var perPage = app_settings.drivers_per_page;
        
        var page = req.query.page || 1

        var active= req.query.active || '';

        var avaliablity=[0,1,2,3];

        if(active=='1'){
            //show only active drivers
            avaliablity=[1]
        }

        var offset = (page-1) * perPage; 

    return db.Driver.findAll(
        { 
            offset: offset, limit: perPage,  
            attributes:['id','name','driver_code'],
            order: [
                
                ['name', 'ASC']
            ],

            include: [
                {
                  attributes: ['id','status'],
                  model: db.CarDriver,
                  required: true,
                  where: {
                    status:avaliablity
                  },

                  include:[
                      {
                          model:db.Car,
                          attributes:['plate_number','id']
                      }
                  ]



                }
              ]

    })
        .then((drivers) => res.status(200).send(drivers))
        .catch((err) => {
        console.log('There was an error getting list of drivers', JSON.stringify(err))
        return res.status(500).send(err)
        });



       
        
    },



    nearByDrivers(req,res,next){
        /*


        Show list of near by drivers who are avaliable for service. Query could be optimized especially in the context of wider areas.
        Follow https://www.scribd.com/presentation/2569355/Geo-Distance-Search-with-MySQL for alternatives.

        Calculation adopted from https://martech.zone/calculate-distance/

        Result is paginated. To go the next page, pass page as query string

            E.g. /nearby-drivers/?page=3
        
        URL Parameters:
        
            @input lat: latitude of the person/object requesting nearest drivers
            @input long: longitude of the person/object requesting nearest drivers

        String parameters:

            distance: Optional. What's the nearest distance the drivers should be? Default nearest distance is defined in app_settings, if not given
       


        */

        var perPage = app_settings.drivers_per_page;
        
        var page = req.query.page || 1


        var offset = (page-1) * perPage; 

        var show_total=req.query.total || perPage;

        var nearest_distance=req.query.distance || app_settings.nearest_distance;
        var latitude=req.params.lat;
        var longitude=req.params.long;

        //build the query now

        let query="SELECT cd.id AS found_driver_id , d.name AS driver_name, d.driver_code,"
        query=query +" round((((acos(sin((:my_lat*pi()/180)) * sin((cd.last_lat*pi()/180))+cos((:my_lat*pi()/180)) * cos((cd.last_lat*pi()/180)) * cos(((:my_long- cd.last_long)*pi()/180))))*180/pi())*60*1.1515*1.609344),2) as distance"
        query=query + " FROM Drivers d INNER JOIN CarDrivers cd on d.id=cd.DriverId INNER JOIN Cars c ON c.id=cd.CarId"
        query=query + " WHERE cd.status=1 AND d.driver_status=1 AND c.car_status=1 HAVING distance <= :distance ORDER BY distance LIMIT :offset , :limit "


        return db.sequelize.query(query, {replacements: {my_lat:latitude,my_long:longitude, distance:nearest_distance,limit:show_total,offset:offset },  type: db.sequelize.QueryTypes.SELECT})
            .then((drivers) => res.status(200).send(drivers))
            .catch((err) => {
                console.log('There was an error fetching nearby drivers', JSON.stringify(err))
                return res.status(500).send(err)
            });


                

        
    },


    driverInformation(req,res,next){
        /*

        Gets information about a specific driver. Pass driver id as part of the URL

            E.g. /drivers/198
        

        */

        
        var driver_id = req.params.driver_id || 0;

  return db.Driver.findById(driver_id,
    {})
    .then((driver) => res.status(200).send(driver))
    .catch((err) => {
      console.log('There was an error fetching information about driver', JSON.stringify(err))
      return res.status(500).send(err)
    });

      
        
    },


};

