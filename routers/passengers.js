const express = require('express');
const Controller = require('../controllers/controller');
const passenger = express.Router();


let isAdmin = (req, res, next) => {
    if (req.session.userId && req.session.role !== "admin") {
        res.redirect("/?msg=You are not ADMIN");

    } else {
        next();
    }
};


passenger.get('/', Controller.showPassegers);

passenger.get('/add', Controller.addPassengerForm);

passenger.post('/add', Controller.postAddPassenger);

passenger.get('/:PassengerId/edit', Controller.editPassengerForm);

passenger.post('/:PassengerId/edit', Controller.postEditPassenger);

passenger.get('/:PassengerId/delete', isAdmin, Controller.deletePassenger);



module.exports = passenger;