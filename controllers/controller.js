const { Airline, Ticket } = require("../models/index");
const formatRupiah = require("../helper/formatRp");

class Controller {
    static async homepage(req, res) {
        try {
            let airlines = await Airline.findAll({
                order: [["id"]]
            });

            res.render('home', {airlines, formatRupiah})
            
        } catch (error) {
            res.send(error);
        }
    }

    static async addAirlineForm(req, res) {
        try {
            let { msg, path } = req.query;

            res.render('addAirlineForm', { msg, path });
            
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddAirline(req, res) {
        try {
            let {
                name,
                codeFlight,
                dateFlight,
                from,
                to,
                totalSeat,
                price
            } = req.body

            await Airline.create({
                name,
                codeFlight,
                dateFlight,
                from,
                to,
                totalSeat,
                price
            });

            res.redirect("/");
            
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let msg = error.errors.map(el => el.message);
                let path = error.errors.map(el => el.path);

                res.redirect(`/airlines/add?msg=${msg}&path=${path}`);

            } else {
                res.send(error);

            }
        }
    }

    static async editAirlineForm(req, res) {
        try {
            let { msg, path } = req.query;

            let { AirlineId } = req.params

            let airline = await Airline.findByPk(AirlineId);

            res.render('editAirlineForm', { airline, msg, path });
            
        } catch (error) {
            res.send(error);
        }
    }

    static async postEditAirline(req, res) {
        try {
            let {
                name,
                codeFlight,
                dateFlight,
                from,
                to,
                totalSeat,
                price
            } = req.body

            let { AirlineId } = req.params;

            let airline = await Airline.findByPk(AirlineId)

            await airline.update({
                name,
                codeFlight,
                dateFlight,
                from,
                to,
                totalSeat,
                price
            });

            res.redirect("/");
            
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let msg = error.errors.map(el => el.message);
                let path = error.errors.map(el => el.path);

                let { AirlineId } = req.params;

                res.redirect(`/airlines/${AirlineId}/edit?msg=${msg}&path=${path}`);

            } else {
                res.send(error);

            }
        }
    }
}


module.exports = Controller;