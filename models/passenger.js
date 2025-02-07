'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Passenger.hasOne(models.Ticket, {
        foreignKey: "PassengerId"
      })
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    dateFormat() {
      let year = this.dateOfBirth.getFullYear();
      let month = this.dateOfBirth.getMonth()+1;
      month = (month < 10)? "0"+month: month;
      let day = this.dateOfBirth.getDate();
      day = (day < 10)? "0"+day: day;
      
      return `${year}-${month}-${day}`;
    }
  }
  Passenger.init({
    title: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    nationality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Passenger',
  });
  return Passenger;
};