module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "shoppingCart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
