const initRoutes = require('../../src/server/routes');

const initServer = () => {
  let runningServer;

  return {
    start: async () => {
      if (!runningServer) {
        await new Promise((res) => {
          runningServer = initRoutes().listen(res);
        });
      }
    },
    stop: async () => {
      if (runningServer) {
        await runningServer.close();
        runningServer = null;
      }
    },
    getDomain: () => `http://localhost:${runningServer.address().port}`,
    getPort: () => runningServer.address().port,
  };
};

module.exports = initServer();
