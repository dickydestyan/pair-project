'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // user
    let users = require("../data/users.json").map(user => {
      user.createdAt = user.updatedAt = new Date();

      return user;
    });
    await queryInterface.bulkInsert('Users', users, {})

    // airline
    let airlines = require("../data/airlines.json").map(airline => {
      airline.createdAt = airline.updatedAt = new Date();

      return airline;
    });
    await queryInterface.bulkInsert('Airlines', airlines, {})

    // passenger
    let passengers = require("../data/passengers.json").map(passenger => {
      passenger.createdAt = passenger.updatedAt = new Date();

      return passenger;
    });
    await queryInterface.bulkInsert('Passengers', passengers, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Passengers', null, {});

    await queryInterface.bulkDelete('Airlines', null, {});

    await queryInterface.bulkDelete('Users', null, {});
    
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
