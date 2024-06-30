module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        isEmail: true,
      },
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      joinDate: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      // Don't add the timestamp attributess.
      timestamps: false,
      freezeTableName: true,
    }
  );
