require('../../babel');
const prepare = require('mocha-prepare');
const { selenium, server } = require('./index');

const skipRemoveMsg = container => console.info(`Not removing ${container} container as it was already running`);

const testWrapper = (() => {
  let usingExistingSelenium;

  return {
    setup: async () => {
      usingExistingSelenium = selenium.container.ensureRunning().wasAlreadyRunning;
      await server.start();
    },
    tearDown: async () => {
      await selenium.closeBrowser();
      await server.stop();
      usingExistingSelenium ? skipRemoveMsg('selenium') : selenium.container.stopAndRemove();
    },
  };
})();

prepare(
  (done) => testWrapper.setup().catch(console.error).then(done),
  (done) => testWrapper.tearDown().catch(console.error).then(done),
);
