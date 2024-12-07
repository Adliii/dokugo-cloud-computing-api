const TransactionsIncome = require("../models/transactionsIncomeModel");
const TransactionsExpenses = require("../models/transactionsExpensesModel");
const jwt = require('jsonwebtoken');


// Ambil semua transaksi income untuk user yang sedang login
const getAllTransactionsIncome = async (request, h) => {
  try {
    const userId = request.auth.credentials.user.id; // Ambil user_id dari token JWT
    const incomes = await TransactionsIncome.findAll({
      where: { user_id: userId },
    });
    return h.response(incomes).code(200);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Ambil semua transaksi expenses untuk user yang sedang login
const getAllTransactionsExpenses = async (request, h) => {
  try {
    const userId = request.auth.credentials.user.id; // Ambil user_id dari token JWT
    const expenses = await TransactionsExpenses.findAll({
      where: { user_id: userId },
    });
    return h.response(expenses).code(200);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

const addTransaction = async (request, h) => {
    try {
      const { user_id, amount, category, date, notes } = request.payload;
  
      const transaction = await TransactionsExpenses.create({
        user_id,
        amount,
        category,
        date,
        notes,
      });
  
      return h.response({
        message: 'Transaction added successfully',
        data: transaction,
      }).code(201);
    } catch (error) {
      console.error('Error adding transaction:', error);
      return h.response({ error: 'Internal Server Error' }).code(500);
    }
  };
  
  const addIncomeTransaction = async (request, h) => {
    try {
      const { user_id, amount, category, date, notes } = request.payload;
  
      // Tambahkan transaksi baru ke tabel transactions_income
      const newTransaction = await TransactionsIncome.create({
        user_id,
        amount,
        category,
        date,
        notes,
      });
  
      return h.response({
        message: 'Income transaction added successfully.',
        data: newTransaction,
      }).code(201);
    } catch (error) {
      console.error('Error adding income transaction:', error);
      return h.response({ error: 'Internal Server Error' }).code(500);
    }
  };

  // POST ke transactions_expenses
  const addExpenseTransaction = async (request, h) => {
    try {
      const { user_id, amount, category, date, notes } = request.payload;
  
      // Tambahkan transaksi baru
      const newTransaction = await TransactionsExpenses.create({
        user_id,
        amount,
        category,
        date,
        notes,
      });
  
      return h.response({
        message: 'Expense transaction added successfully and fields updated.',
        data: newTransaction,
      }).code(201);
    } catch (error) {
      console.error('Error adding expense transaction:', error);
      return h.response({ error: 'Internal Server Error' }).code(500);
    }
  };

  const updateIncomeTransaction = async (request, h) => {
    try {
      const { transaction_id, amount, category, date, notes } = request.payload; // Ambil data dari body
  
      // Cari transaksi berdasarkan transaction_id
      const transaction = await TransactionsIncome.findByPk(transaction_id);
      if (!transaction) {
        return h.response({ error: "Transaksi income tidak ditemukan" }).code(404);
      }
  
      // Perbarui data transaksi
      if (amount !== undefined) transaction.amount = amount;
      if (category !== undefined) transaction.category = category;
      if (date !== undefined) transaction.date = date;
      if (notes !== undefined) transaction.notes = notes;
  
      await transaction.save();
  
      return h
        .response({ message: "Transaksi income berhasil diperbarui", transaction })
        .code(200);
    } catch (error) {
      console.error("Error updating income transaction:", error);
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  };
  
  // Update Expense Transaction
  const updateExpenseTransaction = async (request, h) => {
    try {
      const { transaction_id, amount, category, date, notes } = request.payload; // Ambil data dari body
  
      // Cari transaksi berdasarkan transaction_id
      const transaction = await TransactionsExpenses.findByPk(transaction_id);
      if (!transaction) {
        return h.response({ error: "Transaksi expense tidak ditemukan" }).code(404);
      }
  
      // Perbarui data transaksi
      if (amount !== undefined) transaction.amount = amount;
      if (category !== undefined) transaction.category = category;
      if (date !== undefined) transaction.date = date;
      if (notes !== undefined) transaction.notes = notes;
  
      await transaction.save();
  
      return h
        .response({ message: "Transaksi expense berhasil diperbarui", transaction })
        .code(200);
    } catch (error) {
      console.error("Error updating expense transaction:", error);
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  };
  
  
module.exports = {
  getAllTransactionsIncome,
  getAllTransactionsExpenses,
  addTransaction,
  addIncomeTransaction, 
  addExpenseTransaction,
  updateIncomeTransaction,
  updateExpenseTransaction,
};
