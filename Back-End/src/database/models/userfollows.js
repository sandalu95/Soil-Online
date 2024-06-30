module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "userfollows",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      followerEmail: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      followingEmail: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributess.
      timestamps: false,
      freezeTableName: true,
    }
  );
