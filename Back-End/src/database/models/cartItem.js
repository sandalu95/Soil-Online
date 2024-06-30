module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "shoppingCartItem",
    {
      shoppingCartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
