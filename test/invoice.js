
var expect    = require("chai").expect;
var assert = require('assert');
import app_setings from '../config/settings';
const InvoiceTools=require('../src/api/shared/invoicetools');

var invoice_tools=new InvoiceTools();

describe("Invoice Processor", function() {
  describe("Total Distance Covered", function() {
    it("Return the total distance covered", function() {

      var paths=[
        {
          'latitude':-1.91997,
          'longitude':30.0892
        },
        {
          'latitude':-1.97292,
          'longitude':30.0642
        },
        {
          'latitude':-1.94087,
          'longitude':30.0714
        },
        {
          'latitude':-1.8946,
          'longitude':30.2906
        },
        {
          'latitude':-1.98642,
          'longitude':30.1807
        }        
    ];

    

      var distance   = invoice_tools.totalDistanceCovered(paths);
      

      expect(distance).to.equal(50.98);
      
    });
  });

  describe("Total amount to pay per trip", function() {
    it("calculates total payable amount for a given distance", function() {

      var distance1   = invoice_tools.totalPayableAmount(50.98);
      var distance2 = invoice_tools.totalPayableAmount(0.8);
      var distance3  = invoice_tools.totalPayableAmount(0.1);

      expect(distance1).to.deep.equal(51080);
      expect(distance2).to.deep.equal(900);
      expect(distance3).to.deep.equal(400);
    });
  });



 describe("Total number of routes covered for a trip", function() {
  

    it('Number of routes in a specific trip', function() { // no done
      
      return invoice_tools.tripRoutes(1).then(function(data){
        // expect(data.pair).to.equal(pair);
          //expect(data.rate).to.have.length(400);

          assert.equal(data.length, 0);

      });// no catch, it'll figure it out since the promise is rejected

      return invoice_tools.tripRoutes(2).then(function(data){
        // expect(data.pair).to.equal(pair);
          //expect(data.rate).to.have.length(400);

          assert.equal(data.length, 5);

      });// no catch, it'll figure it out since the promise is rejected



      return invoice_tools.tripRoutes(3).then(function(data){
        // expect(data.pair).to.equal(pair);
          //expect(data.rate).to.have.length(400);

          assert.equal(data.length, 3);

      });// no catch, it'll figure it out since the promise is rejected



    });

  });


  describe("Invoice Generator", function() {
  

    it('Generate Invoice', function() { // no done
     var min_price=app_setings.price_minimum + app_setings.price_vat
     
      return invoice_tools.generateInvoice(1).then(function(data){
       

          expect(data.total_distance).to.equal('0 KM');
          expect(data.total_fair).to.equal(min_price + ' Rwf');

         

      });// no catch, it'll figure it out since the promise is rejected

      return invoice_tools.generateInvoice(2).then(function(data){
      

          expect(data.total_distance).to.equal('50.98 KM');
          expect(data.total_fair).to.equal('51080 Rwf');

       

      });// no catch, it'll figure it out since the promise is rejected



    

    });

  });



  
  
 



});