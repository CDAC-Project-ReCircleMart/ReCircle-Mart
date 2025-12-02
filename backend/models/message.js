module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: true, tableName: "messages" }
  );
};
