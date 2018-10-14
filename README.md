# Taxi API

Test taxi service RESTful API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

MySQL
NodeJS


### Installing

1. Clone the application to your machine

2. Create a MySQL database

3. In project directory, open config/config.json file and edit the database connection information

4. Open your terminal and run npm install and wait for libraries to download

5. Migrate the database schema. To do that open your terminal and

     $ node_modules/.bin/sequelize db:migrate

If you are running windows, you might have to specify the whole path to (E.g. d:/taxi/node_modules/.bin/sequelize.cmd) file

6. In the same terminal, run $ node_modules/.bin/sequelize db:seed:all to populate your database with sample data




## Basic Tests

There are 4 basic tests provided. In your project directory, open the terminal and run npm test

The four tests are:

Number of routes covered in a particular trip

Distance covered in a specific trip

Amount of money payable for a specific trip

Invoice generation



## Running the server

In your project directory, open the terminal and run npm start


### A little Background

## Location

Location is based on  -1.954588, 30.091723 (which is Kigali Heights area). You can use location from locations.txt file to pick up starting and ending points for your trips.

## Trip Status

A trip can have the following status:

            
            2 = on the road/active trip
            3 = some rider has initiated a request to reserve a driver
            4 = cancelled by rider
            5 = rejected by driver
            6 = reservation confirmeed/accepted by driver
            7 = completed trip



## Steps of Making a Trip

Rider searches for near by drivers. Then sends a request to a driver of his choice. The driver accepts the request and comes to pick the rider up. Rider tells
driver where to go. Driver sets the trip to started. Once destination is reached, driver sets the trip completed and rider is invoiced.

As such, some steps can't be skipped. For example, for a trip to be started, the driver must have confirmed the request sent by the rider first. Or for a trip to be completed, it must have been started already.


## Pricing

For now, pricing is hard coded in settings file config/settings.js. A simple formula is:

1km=1000Rwf

Minimum a driver has to be paid is 300Rwf.

If the distance covered is for e.g. 100meters, the amount to be paid is 100rwf, which is less than the minimum that must be paid. In that case, rider pays the minimum amount. Other wise, he pays based on the distance covered.


## Distance

Payment is based on distance covered. The distance covered is not as such straight line (i.e. Point(A,B) to Point(C,D)). Instead, each trip's route is kept and calculated. If a ride starts from Point(A,B) and ends at Point(A,B), it is going to be a lot more expensive since the trip is 360. In real world app, the on-ride
car would send its current position every X minutes,which would be used then to calculate the total area that was exactly covered.


### Sample Data

For testing purposes of the APIs below, you can use the following:

driver ids: 1 - 100
rider ids : 1 - 150
trip ids: 1 - 7



### Drivers APIs

There are few Restful APIs

## List of Drivers (GET)

API: /drivers/

Response:

		{
		"id": 37,
		"name": "Abbott Arnold",
		"driver_code": "T24D1036",
		"CarDrivers":[
		{
		"id": 37,
		"status": 2,
		"Car":{"plate_number": "81116", "id": 79}
		}
		]
		}


## Active Drivers (GET)

API: /drivers/?active=1

Response:

		{
		"id": 37,
		"name": "Abbott Arnold",
		"driver_code": "T24D1036",
		"CarDrivers":[
		{
		"id": 37,
		"status": 2,
		"Car":{"plate_number": "81116", "id": 79}
		}
		]
		}


## Single Driver Information (GET)

API: /driver/{driver_id}

Response:

		{
		"id": 24,
		"name": "Brown Cain",
		"driver_code": "T24D1023",
		"driver_status": 0,
		"createdAt": null,
		"updatedAt": null
		}

## Near By Drivers (GET)

API: /nearby-drivers/{latitude}/{longitude}/

Response:

		{
		"found_driver_id": 6,
		"driver_name": "Kramer Richards",
		"driver_code": "T24D1005",
		"distance": 1.1
		},
		{
		"found_driver_id": 58,
		"driver_name": "Ware Mccormick",
		"driver_code": "T24D1057",
		"distance": 1.63
		}


Note: by default, the nearest drivers are located maximum 3km away from you. To change the distance, pass distance query string. E.g get drivers who are located maximum 1.3km from your current location

	
	/nearby-drivers/{latitude}/{longitude}/?distance=1.3


### Riders API

## Get list of Riders (GET)

API: /riders/

Response:

		{
		"id": 119,
		"name": "Adkins Nelson",
		"rider_code": "T24R3118",
		"rider_status": 1,
		"createdAt": null,
		"updatedAt": null
		}


## Rider Information (GET)

API: /rider/{rider_id}

Response:

	{
	"id": 45,
	"name": "Clarke Barrett",
	"rider_code": "T24R3044",
	"rider_status": 1,
	"createdAt": null,
	"updatedAt": null
	}


### Trips API

## List of Trips (GET)

API: /trips/

Response:

		{
		"id": 1,
		"trip_started_on": null,
		"trip_code": "51539453383893",
		"trip_completed_on": null,
		"status": 4,
		"Rider":{
		"id": 5,
		"name": "Kirk Cole",
		"rider_code": "T24R3004"
		},
		"CarDriver":{
			"id": 3,
			"Driver":{
			"name": "Gates Carson",
			"driver_code": "T24D1002",
			"id": 3
			},
			"Car":{
			"id": 2,
			"plate_number": "15899"
			}
		}
		}


## List of Active Trips (GET)

API: /trips/?active=1

Response:

		{
		"id": 1,
		"trip_started_on": null,
		"trip_code": "51539453383893",
		"trip_completed_on": null,
		"status": 4,
		"Rider":{
		"id": 5,
		"name": "Kirk Cole",
		"rider_code": "T24R3004"
		},
		"CarDriver":{
		"id": 3,
			"Driver":{
			"name": "Gates Carson",
			"driver_code": "T24D1002",
			"id": 3
			},
			"Car":{
			"id": 2,
			"plate_number": "15899"
			}
		}
		}


## Initiate a New Trip (POST)

API: /new-trip/

Post Data:

	rider_id: the id of the rider who is requesting to reserve a car

	car_driver_id: the id of the car the rider wants to reserve

	current_lat: the current latitude of the person making the request

	current_long: the current longitude of the person making the request


Response:

	{
		"id": 7,
		"code": "61539544355021",
		"msg": "Trip request sent...wait for the driver to reply to your request"
	}



## Cancel a Request (PUT)

API: /update-trip-status/

Post Data:

    rider_id: the id of the rider who have requested the car to come pick him up

    trip_id: the id of the trip he wants to cancel

    action: "cancel"


Post Data:

	{
		"msg": "The status of the trip was updated sucessfully"
	}


## Accept a Request (PUT)

Once a rider requests a specific driver, the driver can accept the request

API: /update-trip-status/

Post Data:

    driver_id: the id of the driver who is accepting the reqeust

    trip_id: the id of the trip he wants to accept

    action: "accept"


Post Data:

	{
		"msg": "The status of the trip was updated sucessfully"
	}


## Reject a Request (PUT)

Once a rider requests a specific driver, the driver can reject the request so rider looks for others

API: /update-trip-status/

Post Data:

    driver_id: the id of the driver who is rejecting the reqeust

    trip_id: the id of the trip he wants to reject

    action: "reject"


Post Data:

	{
		"msg": "The status of the trip was updated sucessfully"
	}


## Start a Trip (PUT)

API: /start-complete-trip/

Post Data:

    driver_id: the id of the driver who is activatin the trip

    trip_id: the id of the trip that is starting

    current_lat: the latitude the trip is starting from

    current_long: the longitude the trip is starting_from

    action: "start"


Post Data:

	{
		"msg": "The trip was started sucessfully"
	}


## Complete a Trip (PUT)

API: /start-complete-trip/



Post Data:

    driver_id: the id of the driver who is completing the trip

    trip_id: the id of the trip that is completing

    current_lat: the latitude the trip is ending at

    current_long: the longitude the trip is ending at

    action: "complete"


Post Data:

	{
		"msg": "The trip was completed sucessfully",
		"invoice":{
			"total_distance": "26.88 KM",
			"total_fair": "26980 Rwf"
		}
	}


### Invoice API

## Print Invoice of a Trip (GET)

API: /trip-invoice/{trip_id}/

Response:

		{
		"distance": 50.98,
		"amount": 51080,
		"invoice_date": "2018-10-14T16:52:53.000Z",
		"Trip":{
		"trip_code": "61539482769314",
		"trip_started_on": "2018-10-14T03:55:14.000Z",
		"trip_completed_on": "2018-10-14T04:47:15.000Z",
		"Rider":{
		"id": 5,
		"name": "Kirk Cole",
		"rider_code": "T24R3004"
		},
		"CarDriver":{
			"id": 3,
			"Driver":{
				"id": 3,
				"name": "Gates Carson",
				"driver_code": "T24D1002"
				},
		"Car":{
				"id": 2,
				"plate_number": "15899"
				}
			}
			}
		}


