module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      onSale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://soil-product-images.s3.amazonaws.com/image-not-found.jpeg",
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
