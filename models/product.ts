import { DataTypes, Model } from "sequelize";

import sequelize from "../src/db";

type ProductType = { productName: string; userId: string; checked: boolean; id?: string };

const Product = sequelize.define<Model<ProductType>>("Product", {
  productName: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  checked: DataTypes.BOOLEAN,
});

export async function getProducts(userId: string) {
  const products = await Product.findAll({
    attributes: ["id", "productName", "checked"],
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
    checked: false,
  });
}

export async function updateProduct(newProduct: ProductType, userId: string) {
  try {
    await Product.update(
      {
        productName: newProduct.productName,
        checked: newProduct.checked,
      },
      {
        where: {
          id: newProduct.id,
          userId: userId,
        },
      }
    );
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function removeProduct(productId: string, userId: string) {
  try {
    await Product.destroy({
      where: {
        id: productId,
        userId: userId,
      },
    });
  } catch {}
}

export default Product;
