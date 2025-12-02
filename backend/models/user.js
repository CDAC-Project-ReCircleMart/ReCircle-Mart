module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
      approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: true, tableName: "users" }
  );
};
