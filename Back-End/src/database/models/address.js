module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      addressType: {
        // only two types of addresses
        type: DataTypes.ENUM("billing", "shipping"),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      addLine1: {
        type: DataTypes.STRING(96),
        allowNull: true,
      },
      addLine2: {
        type: DataTypes.STRING(96),
        allowNull: true,
      },
      suburb: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      postcode: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributess.
      timestamps: false,
      freezeTableName: true,
    }
  );
