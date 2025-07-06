import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

export type ProductHistoryType = {
  id: number;
  product_id: number;
  price: string;
  createdAt: string;
};

const ProductPriceHistory = sequelize.define<Model<ProductHistoryType>>(
  "ProductPriceHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: "Product",
      },
    },
    price: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    tableName: "products_price_history",
    timestamps: true,
  }
);

export async function bulkDeleteProductPriceHistory(productId?: number) {
  if (productId && typeof productId === "number") {
    await ProductPriceHistory.destroy({
      where: {
        product_id: productId,
      },
    });
  }
}
