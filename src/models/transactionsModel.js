const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// const tf = require("@tensorflow/tfjs-node");
const path = require("path");
const axios = require("axios");

const Transaction = sequelize.define(
  "Transaction",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users", // Nama tabel users
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lag_1_expenses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lag_2_expenses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Gunakan kolom `created_at` dan `updated_at` secara manual
    tableName: "transactions", // Nama tabel di database
  }
);

module.exports = Transaction;
