const Hapi = require("@hapi/hapi");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const transactionsRoutes = require("./routes/transactionsRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const { processNewTransactions } = require('./controllers/predictionController');



const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/jwt"));

  server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: "urn:audience:users",
      iss: "urn:issuer:api",
      sub: false,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user },
      };
    },
  });

  server.auth.default("jwt");

  // Registrasi rute
  userRoutes(server);
  transactionsRoutes(server);

  await server.register(predictionRoutes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// // Jalankan proses setiap 10 detik
// setInterval(() => {
//   processNewTransactions();
// }, 10000);

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
