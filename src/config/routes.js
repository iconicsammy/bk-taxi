const express=require('express');
import DriversController from '../api/controller/drivers.controller';
import RidersController from '../api/controller/riders.controller';
import TripsController from '../api/controller/trips.controller';
import InvoicesController from '../api/controller/invoices.controller';
const router=express.Router();

//build routes now

router.get('/drivers/', DriversController.showDrivers);
router.get('/driver/:driver_id/', DriversController.driverInformation);
router.get('/nearby-drivers/:lat/:long/', DriversController.nearByDrivers);


router.get('/riders', RidersController.showRiders);
router.get('/rider/:rider_id', RidersController.riderInformation)

router.get('/trips/',TripsController.showTrips);
router.post('/new-trip/',TripsController.newTrip);
router.put('/update-trip-status/',TripsController.tripAction);
router.put('/start-complete-trip/',TripsController.tripStartorComplete);

router.get('/trip-invoice/:trip_id/', InvoicesController.tripInvoice);

export default router;

