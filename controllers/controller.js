const { Airline, Passenger, Ticket, Transaction, User } = require("../models/index");
const formatRupiah = require("../helper/formatRp");
const { fs } = require('fs');
const easyinvoice = require("easyinvoice");
const { Op } = require("sequelize");

class Controller {
    static async homepage(req, res) {
        try {
            let { msg } = req.query;
            let airlines = await Airline.findAll({
                order: [["id"]]
            });

            res.render('home', {airlines, formatRupiah, msg})
            
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

    static async showPassegers(req, res) {
        try {
            let passengers = await Passenger.findAll({
                order: [["id"]]
            })

            res.render('passengers', {passengers})
            
        } catch (error) {
            res.send(error);
        }
    }

    static async addPassengerForm(req, res) {
        try {
            res.render('addPassenger')
            
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddPassenger(req, res) {
        try {
            let {
                title,
                firstName,
                lastName,
                email,
                dateOfBirth,
                gender,
                nationality
            } = req.body;

            await Passenger.create({
                title,
                firstName,
                lastName,
                email,
                dateOfBirth,
                gender,
                nationality
            });

            res.redirect('/passengers');
            
        } catch (error) {
            res.send(error);
        }
    }

    static async editPassengerForm(req, res) {
        try {
            let { PassengerId } = req.params;

            let passenger = await Passenger.findByPk(PassengerId);

            res.render('editPassenger', {passenger})
            
        } catch (error) {
            res.send(error);
        }
    }

    static async postEditPassenger(req, res) {
        try {
            let {
                title,
                firstName,
                lastName,
                email,
                dateOfBirth,
                gender,
                nationality
            } = req.body;

            let { PassengerId } = req.params;

            let passenger = await Passenger.findByPk(PassengerId);

            await passenger.update({
                title,
                firstName,
                lastName,
                email,
                dateOfBirth,
                gender,
                nationality
            });

            res.redirect('/passengers');
            
        } catch (error) {
            res.send(error);
        }
    }
    
    static async deletePassenger(req, res) {
        try {
            let { PassengerId } = req.params;

            await Passenger.destroy({
                where: { "id": PassengerId }
            });

            res.redirect('/passengers')
            
        } catch (error) {
            console.log(error);
            
            res.send(error);
        }
    }

    static async buyTicketForm(req, res) {
        try {
            let { AirlineId } = req.params;

            let airline = await Airline.findByPk(AirlineId);

            let user = await User.findByPk(req.session.userId);

            let sisaSeat = await Ticket.findAll({
                where: { "AirlineId": airline.id }
            })

            let passengers = await Passenger.findAll();

            res.render('buyTicket', {airline, sisaSeat, user, passengers});
            
        } catch (error) {
            res.send(error);
        }
    }

    static async postBuyTicket(req, res) {
        try {
            console.log("masuk");
            
            let { AirlineId } = req.params;

            let airline = await Airline.findByPk(AirlineId);

            let sisaSeat = await Ticket.findAll({
                where: { "AirlineId": airline.id }
            })

            for (let index = 0; index < (airline.totalSeat - sisaSeat.length) ; index++) {
                let body = {}
                
                body[`passenger${index}`]
            }

            let body = req.body

            body.map(async (el, idx) => {
                if (typeof +el[`passenger${idx}`] === "number") {
                    let ticket = await Ticket.create({
                        "seatNumber": el[`seatNumber${idx}`],
                        AirlineId,
                        "PassengerId": +el[`passenger${idx}`]
                    })

                    await Transaction.create({
                        "UserId": req.session.userId,
                        "TicketId": ticket.id
                    });
                }
            });
            
            // res.redirect('/history');
            
        } catch (error) {
            console.log(error);
            
            res.send(error);
        }
    }

    static async showHistory(req, res) {
        try {
            let option = {
                include: [
                    {
                        model: Ticket,
                        include: Airline
                    },
                    {
                        model: User
                    }
                ],
                where: { "UserId": req.session.userId }
            }

            let { search } = req.params

            if (search) {
                option.where[`User.name`] = {
                    [Op.iLike]: `%${search}%`
                }
            }

            let data = await Transaction.findAll(option)

            res.render('history', {data})
            
        } catch (error) {
            console.log(error);
            
            res.send(error);
        }
    }

    static async createInvoice(req, res) {
        try {
            let { TransactionId } = req.params;

            let trx = await Transaction.findOne({
                where: { "id": TransactionId },
                include: [
                    {
                        model: User
                    },
                    {
                        model: Ticket,
                        include: {
                            model: Airline
                        }
                    }
                ]
            });

            let invoice = {
            }

            await easyinvoice.createInvoice(invoice, function (result) {
                fs.readFileSync("invoice.pdf", result.pdf, 'base64')
            })
            
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }
}


module.exports = Controller;