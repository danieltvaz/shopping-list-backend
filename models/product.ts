import { DataTypes, Model } from "sequelize";

import sequelize from "../src/db";

const Product = sequelize.define<Model<{ productName: string; userId: string }>>("Product", {
  productName: DataTypes.STRING,
  userId: DataTypes.INTEGER,
});

export async function getProducts(userId: string) {
  const products = await Product.findAll({
    attributes: ["id", "productName"],
    where: {
      userId,
    },
  });

  return products;
}

export async function newProduct(productName: string, userId: string) {
  await Product.create({
    productName,
    userId,
  });
}

export default Product;
