const db = require('../../../models'); // new require for db object
import app_settings from '../../../config/settings';



export default {

    showRiders(req,res,next){
        /*
        Show list of riders. Result is paginated. To go the next page, pass page as query string

            E.g. /riders?page=3
        
    

        */

        var perPage = app_settings.riders_per_page;
        
        var page = req.query.page || 1

        var offset = (page-1) * perPage; 


  return db.Rider.findAll(
      { 
          offset: offset, limit: perPage,  
          order: [
           
            ['name', 'ASC']
         ]
})
    .then((riders) => res.status(200).send(riders))
    .catch((err) => {
      console.log('There was an error getting list of riders', JSON.stringify(err))
      return res.status(500).send(err)
    });

       
        
    },

    riderInformation(req,res,next){
        /*

        Gets information about a specific rider. Pass rider id as part of the URL

            E.g. /riders/198
        

        */

        
        var rider_id = req.params.rider_id;

    


        return db.Rider.findById(rider_id,
            )
            .then((rider) => res.status(200).send(rider))
            .catch((err) => {
            console.log('There was an error fetching information about rider', JSON.stringify(err))
            return res.status(500).send(err)
            });

            
                
            },


};

