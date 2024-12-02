const {
  register,
  login,
  logout,
  updateProfilePhoto,
  viewProfile,
  editProfile,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/usersController");

const {
  addTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const { predictExpenses } = require("../controllers/transactionController");

const userRoutes = (server) => {
  server.route([
    {
      method: "POST",
      path: "/register",
      handler: register,
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/login",
      handler: login,
      options: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/profile", // Perbaikan di sini
      handler: viewProfile,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "PUT", // Menambahkan rute untuk edit profil
      path: "/profile/edit",
      handler: editProfile,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "POST",
      path: "/profile/photo",
      handler: updateProfilePhoto,
      options: {
        auth: "jwt",
        payload: {
          maxBytes: 2 * 1024 * 1024,
          output: "data",
          parse: true,
        },
      },
    },
    {
      method: "POST", // Menambahkan route logout
      path: "/logout",
      handler: logout,
      options: {
        auth: "jwt",
        // pre: [{ method: checkTokenBlacklist }],
      },
    },
    {
      method: "POST",
      path: "/forgotPassword", // Rute forgotPassword
      handler: forgotPassword,
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/verify-otp",
      handler: verifyOtp,
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/resetPassword",
      handler: resetPassword,
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/transactions", // Menambahkan transaksi baru
      handler: addTransaction,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "GET",
      path: "/transactions", // Mendapatkan daftar transaksi
      handler: getTransactions,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "GET",
      path: "/transactions/{id}", // Mendapatkan detail transaksi berdasarkan ID
      handler: getTransaction,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "PUT",
      path: "/transactions/{id}", // Mengupdate transaksi
      handler: updateTransaction,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "DELETE",
      path: "/transactions/{id}", // Menghapus transaksi
      handler: deleteTransaction,
      options: {
        auth: "jwt",
      },
    },
    {
      method: "GET",
      path: "/predict",
      handler: predictExpenses,
      options: {
        auth: "jwt",
      },
    },
  ]);
};

module.exports = userRoutes;
