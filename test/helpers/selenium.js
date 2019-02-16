const webdriver = require('selenium-webdriver');
const dockerStarter = require('docker-starter');
const server = require('./server');

const selenium = dockerStarter({
  container: 'selenium',
  image: 'elgalu/selenium:3.6',
  extraOptions: '--restart on-failure:5 -p 25900:25900 -e VNC_PASSWORD=password -v /dev/shm:/dev/shm',
  containerPort: 24444,
  publishedPort: 4444,
});

const browserHandle = (() => {
  let browser;

  const handle = {
    container: selenium,
    getDomain: () => `http://172.17.0.1:${server.getPort()}`,
    getBrowser: async () => {
      if (!browser) {
        const { host, port } = selenium.ensureRunning();
        const driver = new webdriver.Builder()
          .forBrowser('chrome')
          .usingServer(`http://${host}:${port}/wd/hub`)
          .build();
        browser = driver;
      }
      await browser.get(handle.getDomain());
      return browser;
    },
    closeBrowser: async () => {
      if (browser) {
        await browser.quit();
        browser = null;
      }
    },
    restartBrowser: async () => {
      await handle.closeBrowser();
      return handle.getBrowser();
    },
  };

  return handle;
})();

module.exports = browserHandle;
