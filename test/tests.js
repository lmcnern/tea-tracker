var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Tea = require(__dirname + '/../models/tea-model');

//global to hold id
var id;

//setting up the local test database
process.env.MONGO_TEST = 'mongodb://localhost/tea-tracker-test';

//starts server
require(__dirname + '/../server.js');
chai.use(chaiHttp);

describe('testing the tea routes', function() {

  beforeEach(function(done) {
    var tea = new Tea({"name": "testTea", "type": "testType", "brand": "testBrand"});
    tea.save();
    id = tea._id;
    done();

  });
  //clears the database after the test
  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('testing GET routes', function() {
    it('should respond with a 404 error if given a bad route', function(done) {
        chai.request('http://localhost:3000')
            .get('/wrong')
            .end(function(err, res) {
              expect(res).to.have.status(404);
              done();
        });
    });

    it('should successfully GET teas', function(done) {
          chai.request('http://localhost:3000/api')
            .get('/tea')
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
    });
});

describe('testing POST routes', function() {
    it('should POST to tea', function(done) {
      chai.request('http://localhost:3000/api')
        .post('/tea')
        .send({"tea": "postTea", "type": "testPostTeaType", "brand": "testPostTeaBrand"})
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
      });
  });

  describe('put routes', function() {
      it('should respond at PUT tea:id', function(done) {
        chai.request('http://localhost:3000/api')
          .put('/tea/' + id)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
    });


  });
});
