const db = require('../../../models'); // new require for db object
import app_settings from '../../../config/settings';
import SharedFunctions from '../shared/shared.functions';

export class InvoiceTools {

    constructor(){}

       tripRoutes(trip_id){
        /*
        Return all routes/geo points touched on a trip
        */

        return db.TripRoute.findAll({
            raw:true,attributes:['latitude','longitude'], order:[['id','ASC']],
            where: {
                TripId: trip_id
            }
            }).then(result=>{return result});

       }



       async generateInvoice(trip_id){
        /*
        generate invoice of of a specific trip.
        */
        
        //get all paths that were covered in the trip

        var paths=await this.tripRoutes(trip_id);

        const total_distance= this.totalDistanceCovered(paths);


        const payable_amount=this.totalPayableAmount(total_distance)

        //delete an invoice incase it exists

        const rmv=function removePreviousInvoice(trip_id) {
            return db.Invoice
              .destroy({where: {TripId:trip_id} })
              .then(function(result){
              
               // return true;

               });
          }

          rmv(trip_id)



       // const rmv = db.Invoice.destroy({where:{tripId:trip_id}}).then(result=>{return true});

        //create invoice now
        const add=function createTripInvoice(trip_id) {
            return db.Invoice
              .create({TripId:trip_id,distance:total_distance,amount:payable_amount,invoice_date:SharedFunctions.getDateTime('datetime') })
              .then(function(result){
               
                
                //return true;
               }).catch(result=>{return true});
          }

          add(trip_id);

          

        


        return {'total_distance':total_distance + ' KM','total_fair':payable_amount + ' Rwf'};


    }


    totalDistanceCovered (paths) {
        /*
        Calculate total distance covered in a specific trip. A trip starts at point A,B. It might go in any direction -- circle or not
        and come back to end pointing A2,B2. All the paths are calculated and their distance summed up. There must be more than 1 coordinate points

        @input paths : a dictionary array of all starting points. E.g.

            [
                {'lat':-1.00099,'long':30.898989}, 
                {'lat':-1.23,'long':30.2}
            
            ]

        @output: Float. Total distance between the paths.

        Formula based on https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates

        */

       

       var earthRadiusKm = 6371;

      var total_paths=paths.length;
      var total_distance=0;
      
      if(total_paths>1){
          var last_lat=paths[0]['latitude'];
          var last_long=paths[0]['longitude'];
          for(var counter=1;counter<total_paths;counter++){
              //calculate the distance between the last location and current location
              var dLat = (paths[counter]['latitude']- last_lat) * Math.PI / 180; // to degrees
              var dLon = (paths[counter]['longitude']- last_long) * Math.PI / 180;
              var lat1 = ( last_lat) * Math.PI / 180;
              var lat2 = (paths[counter]['latitude']) * Math.PI / 180;

              var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
              
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
              
              total_distance+=+(earthRadiusKm * c).toFixed(2)

              last_lat=paths[counter]['latitude'];
              last_long=paths[counter]['longitude'];



          }
      }
      

      return +total_distance.toFixed(2);
     
    }

    totalPayableAmount(distance){
        //whats the total amount to pay

        

        var payable_amount= distance * app_settings.price_per_km;
        

        //price cant be less than the minimum to be paid

        payable_amount=payable_amount<app_settings.price_minimum ? app_settings.price_minimum : payable_amount

        //add vat

        payable_amount+=app_settings.price_vat;



        return +(payable_amount).toFixed(2)

        

    }

    




};


module.exports = InvoiceTools;
