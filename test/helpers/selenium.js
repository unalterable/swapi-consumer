const { remote } = require('webdriverio');
const dockerStarter = require('docker-starter');
const server = require('./server');

const buildWdOpts = ({ host, port }) => ({
  capabilities: { browserName: 'chrome' },
  logLevel: 'silent',
  hostname: host,
  port,
});

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
        browser = await remote(buildWdOpts({ host, port }));
        await browser.url(handle.getDomain());
      }
      return browser;
    },
    closeBrowser: async () => {
      if(browser){
        await browser.deleteSession();
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
