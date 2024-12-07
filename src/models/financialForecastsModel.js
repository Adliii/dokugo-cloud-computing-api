const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FinancialForecasts = sequelize.define(
  "FinancialForecasts",
  {
    forecast_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    period: { type: DataTypes.STRING, allowNull: false },
    predicted_expenses: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: "financialforecasts",
    timestamps: false,
  }
);

module.exports = FinancialForecasts;
