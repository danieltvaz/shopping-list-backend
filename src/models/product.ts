import { DataTypes, Model } from "sequelize";

import sequelize from "../db";

type ProductType = {
  productName: string;
  userId: string;
  checked: boolean;
  id?: string;
  price: number;
};

const Product = sequelize.define<Model<ProductType>>("Product", {
  productName: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  checked: DataTypes.BOOLEAN,
  price: DataTypes.FLOAT,
});

export async function getProducts(userId: string) {
  try {
    const products = await Product.findAll({
      attributes: ["id", "productName", "checked"],
      where: {
        userId,
      },
    });

    return products;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function newProduct(productName: string, userId: string, price: number) {
  try {
    await Product.create({
      productName,
      userId,
      checked: false,
      price,
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateProduct(newProduct: ProductType, userId: string, price: string) {
  try {
    await Product.update(
      {
        productName: newProduct.productName,
        checked: newProduct.checked,
        price: newProduct.price,
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
  } catch (e: any) {
    throw new Error(e);
  }
}

export default Product;
