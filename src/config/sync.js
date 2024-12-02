const Transaction = require("./models/transactionsModel"); // Import model transaksi
const sequelize = require("./config/db"); // Import konfigurasi Sequelize

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil.");

    await Transaction.sync({ alter: true });
    console.log("Tabel transactions berhasil disinkronkan.");
  } catch (err) {
    console.error("Gagal menyinkronkan tabel:", err);
  } finally {
    await sequelize.close();
  }
})();
