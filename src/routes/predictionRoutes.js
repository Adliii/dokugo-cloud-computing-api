const predictionController = require('../controllers/predictionController');

const predictionRoutes = {
  name: 'predictionRoutes',
  version: '1.0.0',
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/predictions',
        handler: predictionController.handlePrediction,
      },
    ]);
  },
};

module.exports = predictionRoutes;
