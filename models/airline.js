'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airline.init({
    name: DataTypes.STRING,
    codeFlight: DataTypes.STRING,
    dateFlight: DataTypes.DATE,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    totalSeat: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Airline',
  });
  return Airline;
};