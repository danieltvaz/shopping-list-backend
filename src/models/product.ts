import { DataTypes, Model } from "sequelize";

import { Op } from "sequelize";
import sequelize from "../db";

export type ProductType = {
  productName: string;
  userId: string;
  checked: boolean;
  id?: string;
  price: number;
  quantity: number;
  unit: "KG" | "UN";
};

const Product = sequelize.define<Model<ProductType>>("Product", {
  productName: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  checked: DataTypes.BOOLEAN,
  price: DataTypes.FLOAT,
  unit: DataTypes.STRING,
  quantity: DataTypes.FLOAT,
});

export async function getProducts(userId: string, searchText?: string | any) {
  try {
    if (searchText) {
      const products = await Product.findAll({
        attributes: ["id", "productName", "checked", "price", "quantity", "unit"],
        where: {
          productName: {
            [Op.like]: `%${searchText}%`,
          },
        },
        order: [
          ["checked", "asc"],
          ["id", "asc"],
        ],
      });
      return products;
    }

    const products = await Product.findAll({
      attributes: ["id", "productName", "checked", "price", "quantity", "unit"],
      where: {
        userId,
      },
      order: [
        ["checked", "asc"],
        ["id", "asc"],
        ["updatedAt", "desc"],
      ],
    });

    return products;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function newProduct(
  productName: string,
  userId: string,
  price: number,
  unit: ProductType["unit"],
  quantity: ProductType["quantity"]
) {
  try {
    await Product.create({
      productName,
      userId,
      checked: false,
      price,
      unit,
      quantity,
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateProduct(newProduct: ProductType, userId: string) {
  try {
    await Product.update(
      {
        ...newProduct,
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

export async function uncheckAllProducts(userId: string) {
  try {
    await Product.update(
      {
        checked: false,
      },
      {
        where: {
          userId,
        },
      }
    );
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function checkAllProducts(userId: string) {
  try {
    await Product.update(
      {
        checked: true,
      },
      {
        where: {
          userId,
        },
      }
    );
  } catch (e: any) {
    throw new Error(e);
  }
}

export default Product;
