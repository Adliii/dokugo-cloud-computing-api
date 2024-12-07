const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TransactionsExpenses = sequelize.define(
  "TransactionsExpenses",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    notes: { type: DataTypes.TEXT },
    lag_1_expenses: { type: DataTypes.INTEGER, allowNull: true },
    lag_2_expenses: { type: DataTypes.INTEGER, allowNull: true },
    total_amount_day: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "transactions_expenses",
    timestamps: false,
  }
);

module.exports = TransactionsExpenses;
