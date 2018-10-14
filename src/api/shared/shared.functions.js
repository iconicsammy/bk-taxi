const db = require('../../../models'); // new require for db object




export default {

    async carDriverStatus (id) {
        /*
        What is the current status of the driver and his car?

        @input id: the id from CarDriver model whose status we want to check

        @output: Number.
            1 = avaliable/free for reservation
            0 = banned/blocked (not operating anyway)
            2 = currently on trip
            3 = currently reserved
            -1 = status cant be determined. Default
        
            */

           const trip = await db.CarDriver.findById(id, {
            attributes:['status'], raw: true});
          return trip ? trip.status : -1;

        
    },

    async updateCarDriverStatus (id,new_status,latitude=null,longitude=null) {
        /*
        Update the current status of the driver and his car?

        @input id: the id from CarDriver model whose status we want to update
        @input new_status: Number. The new status we want to assign
        @input latitude: Number. Optional. Last known latitude. Default Null
        @input longitude: Number. Optional. Last known longitude. Default Null

             0 = block
             1 = avaiable
             2 = on the road
        
        @output boolean. True if sucess, else false.
            */
         
             if(id<=0){
                 return false;
             }
            
             var updates={status:new_status};
             if(latitude!=null && longitude!=null){
                 updates['last_lat']=latitude;
                 updates['last_long']=longitude;
                 updates['last_location_updated_on']=this.getDateTime('datetime')
             }

           return await db.CarDriver.update(updates, {where: {id:id}} );

        
    },

    async tripStatus (id) {
        /*
        What is the current status of the trip?

        @input id: the id from trip

        @output: Number.
            1 = avaliable/free for reservation
            2 = on the road
            3 = some rider has initiated a request to reserve a driver
            4 = cancelled by rider
            5 = rejected by driver
            6 = reservation confirmeed/accepted by driver
            7 = completed trip


            -1 = status cant be determined. Default
        
            */

           const trip = await db.Trip.findById(id, {
            attributes:['status'], raw: true});
          return trip ? trip.status : -1;

     
    },
    async tripCarDriver (id) {
        /*
        Helper function to get the car driver of the trip

        @input id: the id from trip

        @output: Number. -1 if no information is found
        
        
            */

           const trip = await db.Trip.findById(id, {
            attributes:['CarDriverId'], raw: true});
          return trip ? trip.CarDriverId : -1;

     
    },

    async tripActionValid (trip_id,current_trip_status, rider_id,driver_id,action) {
        /*
        Can the action the rider or driver want to take on a specific trip be done?

        @input trip_id: Number. id of the trip
        @input current_trip_status: Number. Current status of the trip
        @input rider_id: Number. Id of the rider who want to take hte action. 0 if it is driver who is making the request.
        @input driver_id: Number. Id of the driver who want to take the action. 0 if it is rider who is making the request.
        @input action: String. One of the action verbs

        @output: Boolean. True if valid, else false. Default false

        
            */
        
        var is_valid=false;

        if(rider_id>0){
            //Rider requesting to possibly cancel the reservation he has made earlier.

            if(action=='cancel' && current_trip_status==3){
                //it is invalid action
                
                is_valid=true;
            }
            
        }

        else{
            //request made by driver.
            switch (action){
                case 'reject','accept':
                if(current_trip_status==3){
                    is_valid=true;
                }
                break;

                case 'start':
                //must have be confirmed first
                if(current_trip_status==6){
                    is_valid=true;
                }
                break;

                case 'complete':
                //it must have been valid first/on going
                if(current_trip_status==2){
                    is_valid=true;
                }
                break;
            }
           

        }

      

        //if the action and current trip status match, make sure the rider or driver has the right to carry out the action
        if(is_valid){
            //does the rider own the trip?

            is_valid=false; //reset it to false in case the person have no right

            if(rider_id>0){
                await db.Trip.findOne({ attributes:['id'],raw:true, where: {RiderId: rider_id,id:trip_id} }).then(trip => {
                    // trip will be null if not found else contains information about the trip
                    
                    if(trip!=null){
                       
                        is_valid=true;
                    }

                  }).catch(err=>{
                      console.log('error ',err)
                    is_valid=false;
                })
                
            }

            else{
                //does the driver have right then?
                await db.Trip.findOne(
                    { 
                        
                        where: {id:trip_id},
                        include: [
                            {
                              attributes: ['DriverId'],
                              model: db.CarDriver,
                              required: true,
                              where: {DriverId:driver_id}
            
                            }
                          ]
                
                
                
                  },
                    
                    
                    ).then(trip => {
                    // trip will be null if not found else contains information about the trip
                    if(trip!=null){
                        is_valid=true;
                    }
                  }).catch(err=>{
                    is_valid=false;
                })

            }
        }

         return is_valid;
    },



   getDateTime (option='date') {
       /*
       Get date time now. Edit to localize

       @input option: String. What kind of object do you want to return?

            date = Default. return date only yyyy-mm-dd
            time = return time only hh:mm:ss
            datetime = return date and time 
        
        @output: String. Based on provided option. If option is invalid, return date

        */

        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }

        if(option=='datetime'){
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        }
        else if(option=='time'){
            return  hour + ":" + minute + ":" + second;

        }
        else{
            return year + "-" + month + "-" + day;
        }

      }





};

