const db = require('../../../models'); // new require for db object
import app_settings from '../../../config/settings';

import InvoiceTools from '../shared/invoicetools';

export default {

    tripInvoice(req,res,next){
        /*
       Print invoice of a specific trip

       @input trip_id; Number of the trip whose invoice you want to print
        
        */
    

        var trip_id = +req.params.trip_id

       
            return db.Invoice.findOne(
                { 
                    where:{tripId:trip_id},
                    attributes:['distance','amount','invoice_date'],
                    include:[
                        {
                            model:db.Trip,
                            attributes:['trip_code','trip_started_on','trip_completed_on'],
                            where: {status:7},
                            include:[
                                {
                                    model:db.Rider,
                                    attributes:['id','name','rider_code']
                                },
                                {
                                    model:db.CarDriver,
                                    attributes:['id'],
                                    include:[
                                        {
                                            model:db.Driver,
                                            attributes:['id','name','driver_code']
                                        },
                                        {
                                            model:db.Car,
                                            attributes:['id','plate_number']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                    
            })
                .then((invoice) => res.status(200).send(invoice))
                .catch((err) => {
                console.log('There was an error printing your invoice', JSON.stringify(err))
                return res.status(500).send(err)
                });

       
        
    },

    


};

