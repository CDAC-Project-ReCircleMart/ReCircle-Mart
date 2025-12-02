module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Listing",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2) },
      images: { type: DataTypes.JSON },
      category: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      sellerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      approved: { type: DataTypes.BOOLEAN, defaultValue: false },
      status: {
        type: DataTypes.ENUM("available", "removed"),
        defaultValue: "available",
      },
    },
    { timestamps: true, tableName: "listings" }
  );
};
