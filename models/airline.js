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
      Airline.hasMany(models.Ticket, { 
        foreignKey: "PassengerId" 
      });
    }

    dateFormat() {
      let year = this.dateFlight.getFullYear();
      let month = this.dateFlight.getMonth()+1;
      month = (month < 10)? "0"+month: month;
      let day = this.dateFlight.getDate();
      day = (month < 10)? "0"+day: day;
      
      return `${year}-${month}-${day}`;
    }
  }
  Airline.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    codeFlight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Code Flight is required"
        }
      }
    },
    dateFlight: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date Flight is required"
        }
      }
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "From is required"
        }
      }
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "To is required"
        }
      }
    },
    totalSeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Total seat is required"
        },
        min: {
          args: 1,
          msg: "Total seat mush be greater than 0"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required"
        },
        min: {
          args: 1,
          msg: "Price mush be greater than 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Airline',
  });
  return Airline;
};