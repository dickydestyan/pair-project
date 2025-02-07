'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Ticket, {
        foreignKey: "TicketId"
      });

      Transaction.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }
  Transaction.init({
    codeTrx: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    TicketId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tickets",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      beforeCreate(input, option) {
        input.codeTrx = new Date.getTime();
      }
    }
  });
  return Transaction;
};