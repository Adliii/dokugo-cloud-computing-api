const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const tf = require("@tensorflow/tfjs-node");
const path = require("path");

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

// Fungsi untuk prediksi pengeluaran
const predictExpenses = async (request, h) => {
  try {
    const userId = request.auth.credentials.user.id;

    // Ambil transaksi terbaru
    const transactions = await Transaction.findAll({
      where: { userId },
      order: [["date", "DESC"]],
      limit: 2,
    });

    if (transactions.length < 2) {
      return h.response({ error: "Data transaksi tidak cukup untuk prediksi" }).code(400);
    }

    // Ambil nilai lag_1 dan lag_2 dari transaksi
    const lag_1_expenses = transactions[0].amount || 0;
    const lag_2_expenses = transactions[1].amount || 0;

    // Input untuk model
    const dayOfWeek = 3; // Contoh: 3 untuk Rabu
    const isWeekend = 0; // Contoh: bukan akhir pekan
    const inputFeatures = [
      lag_1_expenses,
      lag_2_expenses,
      0, // category_encoded
      Math.sin((2 * Math.PI * dayOfWeek) / 7), // day_of_week_sin
      Math.cos((2 * Math.PI * dayOfWeek) / 7), // day_of_week_cos
      isWeekend,
      Math.log1p(lag_1_expenses), // smoothed_expenses
      Math.log1p(lag_1_expenses), // rolling_avg_7
      Math.log1p(lag_1_expenses), // rolling_avg_30
    ];

    // Prediksi menggunakan model
    const model = await loadModel();
    const inputTensor = tf.tensor3d([inputFeatures], [1, inputFeatures.length, 1]);
    const predictionLogScale = model.predict(inputTensor).dataSync()[0];
    const predictionOriginalScale = Math.expm1(predictionLogScale);

    return h.response({
      message: "Prediksi berhasil",
      prediction: predictionOriginalScale,
    }).code(200);
  } catch (error) {
    console.error("Error saat prediksi:", error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

module.exports = { predictExpenses };
module.exports = Transaction;