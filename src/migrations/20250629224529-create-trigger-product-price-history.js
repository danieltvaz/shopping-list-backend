"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TRIGGER product_price_history_trigger
      AFTER UPDATE ON Products
      FOR EACH ROW
      INSERT INTO products_price_history (product_id, price, createdAt)
      SELECT OLD.id, OLD.price, NOW()
      WHERE NEW.price != OLD.price AND OLD.price IS NOT NULL AND OLD.price != '';
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS product_price_history_trigger;`);
  },
};
