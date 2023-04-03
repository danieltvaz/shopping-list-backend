"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "price", Sequelize.DataTypes.STRING);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Products", "price");
  },
};
