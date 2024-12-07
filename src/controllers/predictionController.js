const { TransactionsExpenses, FinancialForecasts } = require('../models/financialForecastsModel');
const axios = require('axios'); // Jika menggunakan Flask API

const handlePrediction = async (request, h) => {
  try {
    const { lag_1_expenses, lag_2_expenses } = request.payload;

    // Kirim data ke Flask API
    const response = await axios.post('http://127.0.0.1:5000/predict', {
      lag_1_expenses,
      lag_2_expenses,
    });

    // Ambil hasil prediksi
    const predictedExpenses = response.data.predicted_expenses;

    return h.response({ predicted_expenses: predictedExpenses }).code(200);
  } catch (error) {
    console.error('Prediction Error:', error);
    return h.response({ error: 'Failed to get prediction' }).code(500);
  }
};

module.exports = { handlePrediction };
