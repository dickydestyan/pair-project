'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Airline, {
        foreignKey: "AirlineId"
      });

      Ticket.belongsTo(models.Passenger, {
        foreignKey: "PassengerId"
      });

      Ticket.hasMany(models.Transaction, {
        foreignKey: "TicketId"
      })
    }
  }
  Ticket.init({
    seatNumber: DataTypes.STRING,
    AirlineId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Airlines",
        key: "id"
      }
    },
    PassengerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Passengers",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};