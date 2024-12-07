const transactionsController = require("../controllers/transactionsController");
const Joi = require("joi");

const transactionsRoutes = (server) => {
  server.route([
    // GET semua transaksi income
    {
      method: "GET",
      path: "/transactions/income",
      handler: transactionsController.getAllTransactionsIncome,
      options: {
        auth: "jwt",
      },
    },
    // GET semua transaksi expenses
    {
      method: "GET",
      path: "/transactions/expenses",
      handler: transactionsController.getAllTransactionsExpenses,
      options: {
        auth: "jwt",
      },
    },
    // POST transaksi income
    {
      method: "POST",
      path: "/transactions/income",
      handler: transactionsController.addIncomeTransaction,
      options: {
        auth: "jwt",
      },
    },
    // POST transaksi expenses
    {
        method: "PUT",
        path: "/transactions/income/{transaction_id}",
        handler: transactionsController.updateIncomeTransaction,
        options: {
          auth: "jwt",
          validate: {
            params: Joi.object({
              transaction_id: Joi.number().required(), // Menggunakan transaction_id
            }),
            payload: Joi.object({
              amount: Joi.number().required(),
              category: Joi.number().valid(0, 1, 2, 3).required(),
              date: Joi.date().required(),
              notes: Joi.string().optional(),
            }),
          },
        },
      },
      // PUT (Update) transaksi expenses
      {
        method: "PUT",
        path: "/transactions/expenses/{transaction_id}",
        handler: transactionsController.updateExpenseTransaction,
        options: {
          auth: "jwt",
          validate: {
            params: Joi.object({
              transaction_id: Joi.number().required(), // Menggunakan transaction_id
            }),
            payload: Joi.object({
              amount: Joi.number().required(),
              category: Joi.number().valid(0, 1, 2, 3).required(),
              date: Joi.date().required(),
              notes: Joi.string().optional(),
            }),
          },
        },
      },      
  ]);
};

module.exports = transactionsRoutes;
