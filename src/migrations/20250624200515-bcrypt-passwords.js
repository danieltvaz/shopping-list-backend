"use strict";

const { hash } = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query("SELECT id, password FROM Users WHERE password IS NOT NULL", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    for (const user of users) {
      if (user.password) {
        const hashedPassword = await hash(user.password, 12);

        await queryInterface.sequelize.query("UPDATE Users SET password = ? WHERE id = ?", {
          replacements: [hashedPassword, user.id],
          type: queryInterface.sequelize.QueryTypes.UPDATE,
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {},
};
