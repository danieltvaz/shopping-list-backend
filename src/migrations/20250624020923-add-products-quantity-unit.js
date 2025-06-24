"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "quantity", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn("Products", "unit", {
      type: Sequelize.ENUM("KG", "UN"),
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Products", "quantity");
    await queryInterface.removeColumn("Products", "unit");
  },
};
