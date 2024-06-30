module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isFlagged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdminDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      // Don't add the timestamp attributess.
      timestamps: false,
      freezeTableName: true,
    }
  );
