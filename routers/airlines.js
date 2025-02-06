const express = require('express');
const Controller = require('../controllers/controller');
const airline = express.Router();

airline.get('/add', Controller.addAirlineForm);

airline.post('/add', Controller.postAddAirline);


airline.get('/:AirlineId/edit', Controller.editAirlineForm);

airline.post('/:AirlineId/edit', Controller.postEditAirline);


module.exports = airline;