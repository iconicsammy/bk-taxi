const db = require('../../../models'); // new require for db object
import app_settings from '../../../config/settings';
import SharedFunctions from '../shared/shared.functions';
import CodeGenerators from '../shared/codegenerators';
import InvoiceTools from '../shared/invoicetools';

export default {

   


     showTrips(req,res,next){
        /*
        Show list of all active trips. Result is paginated. To go the next page, pass page as query string

            E.g. /trips?page=3
        
        To show only currenlty active trips, add active=1

            /trips?active=1

        */

        

        var perPage = app_settings.trips_per_page;
        
        var page = req.query.page || 1

        var active= req.query.active || '';

        var trip_status=[0,1,2];

        var trip_fields=['id','trip_started_on']

        if(active=='1'){
            //show active trips only
            trip_status=[2]
        }

        var offset = (page-1) * perPage;

        

    return db.Trip.findAll(
        { 
            offset: offset, limit: perPage,  
            attributes:['id','trip_started_on','trip_code','trip_completed_on','status'],
            order: [
                
                ['trip_started_on', 'ASC']
            ],

            include: [
                {
                  attributes: ['id','name','rider_code'],
                  model: db.Rider,
                  required: true

                },
                {
                    model:db.CarDriver,
                    attributes:['id'],
                    include:[
                        {
                            model:db.Driver,
                            attributes:['name','driver_code','id']
                        },
                        {
                            model:db.Car,
                            attributes:['id','plate_number']
                        }
                    ]
                }
              ]

    })
        .then((trips) => res.status(200).send(trips))
        .catch((err) => {
        console.log('There was an error getting list of trips', JSON.stringify(err))
        return res.status(500).send(err)
        });



       
        
    },



   

    newTrip(req,res,next){
        /*

        Method: POST

        Create a new trip. Send a driver of choice obtained through nearby-drivers API. Then the driver will get the
        notification and can decline or accept the request of the rider. If reserved, mark the request as confirmed. Trip will
        start when they actually meet and the driver marks it.

        @input rider_id: id of the rider who is taking the trip. Pass 1 to 150
        @input car_driver_id: id of the car and driver selected to be reserved by the rider (obtained thru nearby-drivers API)
        @input current_lat: the current latitude of the rider who is plannning to take a trip
        @input current_long: the current longitude of the rider who is planning to take a trip

        @output: Information about the trip, including its newly generated id and readble code.

        */

        
        var rider_id = req.body.rider_id; 
        var car_driver_id=req.body.car_driver_id;
        var latitude=req.body.current_lat;
        var longitude=req.body.current_long;

        //make sure the car can be booked/reserved first before initiating the trip

        var current_car_driver_status=SharedFunctions.carDriverStatus(car_driver_id);
        var status_msg='';

        if(current_car_driver_status==-1){
            status_msg="The status of the driver could not be determined";
        }
        else if(current_car_driver_status==0){
            status_msg="The driver is not authorized to operate the car in Taxi24";
        }
        else if(current_car_driver_status==2){
            status_msg="The driver is currently on trip and could not be reserved"
        }
        else if(current_car_driver_status==3){
            status_msg="The driver is currently reserved"
        }

        //can the driver be reserved now?
        if(status_msg){
            //no; send error message
            return res.status(400).send({'error':status_msg})
        }
        
        //Send the reservation request to the driver now. First enter it in the database and notify the driver.
        //status 3 == Trip initiated. At this stage, nothing is confirmed

        var trip_code=CodeGenerators.tripCodeGenerator();

        var new_trip_id=0;

        db.Trip.create({CarDriverId:car_driver_id,RiderId:rider_id, status: 3, search_started_on: SharedFunctions.getDateTime('datetime'), search_confirmed_on: null,trip_started_on:null,trip_completed_on:null,searched_from_lat:latitude,searched_from_long:longitude,createdAt:SharedFunctions.getDateTime('datetime'),trip_code:trip_code }).then(trip_info => {
            // you can now access the newly created task via the variable task
            return res.status(200).send({
                'id':trip_info.id,
                'code':trip_code,
                'msg':'Trip request sent...wait for the driver to reply to your request'
            })
            
          })

    },

    async tripAction(req,res,next){
        /*


        Method: PUT

        Take action on a trip. A trip has different states and those states could be changed by mainly the driver but also the rider:


        
        In real case scenario, we would use the token to identify if the request is coming from a driver or  a rider. Here, stimulation only

        @input trip_id: Number. id of the trip to manipulate
        @input action: String. the action verb to do which match db status (1-6, except 3). Depends on current state. For example, if a trip is currently on the road (status 2), it can't be accepted (status 6)
                                because for it to be on status 2, it must heave been through status 6 in the first place

            Rider actions:
                cancel: cancel the request/reservation (status code 4)
            
            Driver actions:
                accept: accept the request for reservation (status code 6)
                reject: reject the request for reservation (status code 5)
                

        @input rider_id:Number. Rider id who wants to cancel. Set to 0 if call is coming from a driver instead
        @input driver_id:Number. Driverid who wants to take a valid action. Set to 0 if action is coming from a rider instead.
        



        @output: infomration about the action taken.

        */

        
        var rider_id = +req.body.rider_id; 
        var driver_id=+req.body.driver_id;
        var trip_id=+req.body.trip_id;
        var action=req.body.action;

        //allowed verb actions
        var allowed_actions={'cancel':4,'accept':6,'reject':5}

       

        action=action.toLowerCase();

       
        //who made the request?
        if(rider_id==0 && driver_id==0){
            //we don't know who is making the request
            return res.status(400).send({'error':"Action couldn't be completed. Please follow a valid path"});
        }


        //get trip status

        const current_trip_status = await SharedFunctions.tripStatus(trip_id);
        
            if (current_trip_status == -1) {
                return res.status(400).send({'error':"The trip could not be found."})
            }

            

        const action_valid=await SharedFunctions.tripActionValid(trip_id,current_trip_status,rider_id,driver_id,action)
        

        if(action_valid==false){
            return res.status(400).send({'error':"The action you requested could not be completed"})
        }

        //the action is valid. So change the action verb into status code

        var status_id=allowed_actions[action];

        var updates={status:status_id}

        if(status_id==6){
            //trip confirmed so lock driver
            const car_driver_id=await SharedFunctions.tripCarDriver(trip_id);
            await  SharedFunctions.updateCarDriverStatus(car_driver_id,2); 
            updates['search_confirmed_on']=SharedFunctions.getDateTime('datetime');
        }




        return db.Trip.update(updates, {where: {id:trip_id}} )
        .then((drivers) => res.status(200).send({'msg':"The status of the trip was updated sucessfully"}))
        .catch((err) => {
            console.log('There was an error updating trip information', JSON.stringify(err))
            return res.status(500).send(err)
        });

     


    },

    async tripStartorComplete(req,res,next){
        /*


        Method: PUT

        Start or Complete a trip. Only the driver have the right


        
        In real case scenario, we would use the token to identify if the request is coming from a driver or  a rider. Here, stimulation only

        @input trip_id: Number. id of the trip to manipulate
        @input action: String. the action code to do to match db status (2 for start and 7  for complete ). Depends on current state of the trip. For example, if a trip is currently on the road (status 2), it only be completed.

            
            Driver actions:
               
                start: start trip has began/on the road (status code 2)
                complete: mark the trip as complete (status code 7)

        
        @input driver_id:Number. Driverid who wants to take a valid action.
        @input current_lat: the current latitude when the trip was started or completed
        @input current_long: the current longitude when the trip was started or completed

        @output: infomration about the action taken.

        */

        
        
        var driver_id=+req.body.driver_id;
        var trip_id=+req.body.trip_id;
        var action=req.body.action;
        var latitude=req.body.current_lat;
        var longitude=req.body.current_long;



        //allowed verb actions. DRY. Move to interface file
        var allowed_actions={'start':2,'complete':7}


        action=action.toLowerCase();

   

        //who made the request? That is in place of token authentication
        if(driver_id==0){
            //we don't know who is making the request
            return res.status(400).send({'error':"Action couldn't be completed. Please follow a valid path"});
        }


        //get trip status

        const current_trip_status = await SharedFunctions.tripStatus(trip_id);
        
            if (current_trip_status == -1) {
                return res.status(400).send({'error':"The trip could not be found."})
            }

            

        const action_valid=await SharedFunctions.tripActionValid(trip_id,current_trip_status,0,driver_id,action)
        

        if(action_valid==false){
            return res.status(400).send({'error':"The action you requested could not be completed"})
        }

        //the action is valid. So change the action verb into status code

        var status_id=allowed_actions[action];

        

        //prepare updates
        var updates={status:status_id}

        //prepare response messages. Default trip started


        var response={'msg':'The trip was started successfully'}; //message sent back via http

        //we have to update Trip route info first
       db.TripRoute.create({status:status_id,TripId:trip_id,latitude:latitude,longitude:longitude });

        //if completed, release driver

        if(status_id==7){
            //completed
            const car_driver_id=await SharedFunctions.tripCarDriver(trip_id);
            await  SharedFunctions.updateCarDriverStatus(car_driver_id,1,latitude,longitude);

            updates['trip_completed_on']=SharedFunctions.getDateTime('datetime');

            //overwrite server response

            response['msg']='The trip was completed successfully'; //message sent back via http
            //include invoice now
            var invoice=new InvoiceTools();
            response['invoice']=await invoice.generateInvoice(trip_id)

        }
        else{
            updates['trip_started_on']=SharedFunctions.getDateTime('datetime')
        }
       

  


        return db.Trip.update(updates, {where: {id:trip_id}} )
        .then((drivers) => res.status(200).send(response))
        .catch((err) => {
            console.log('There was an error handling your trip', JSON.stringify(err))
            return res.status(500).send(err)
        });

     


    },



};

