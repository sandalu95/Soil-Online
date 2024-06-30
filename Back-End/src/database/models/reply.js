module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "reply",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributess.
      timestamps: false,
      freezeTableName: true,
    }
  );
