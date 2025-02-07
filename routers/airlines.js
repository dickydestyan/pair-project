const express = require('express');
const Controller = require('../controllers/controller');
const airline = express.Router();


let isAdmin = (req, res, next) => {
    if (req.session.userId && req.session.role !== "admin") {
        res.redirect("/?msg=You are not ADMIN");

    } else {
        next();
    }
};

airline.get('/add', isAdmin, Controller.addAirlineForm);

airline.post('/add', isAdmin, Controller.postAddAirline);


airline.get('/:AirlineId/edit', isAdmin, Controller.editAirlineForm);

airline.post('/:AirlineId/edit', isAdmin, Controller.postEditAirline);

airline.get('/:AirlineId/buy/tickets', Controller.buyTicketForm);

airline.post('/:AirlineId/buy/tickets', Controller.postBuyTicket);

module.exports = airline;