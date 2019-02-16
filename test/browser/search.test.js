const { expect } = require('chai');
const nock = require('nock');
const { selenium } = require('../helpers');

describe('Search', () => {
  let browser;

  before(async () => {
    browser = await selenium.getBrowser();
  });

  after(nock.cleanAll);

  it('should have correct title', async () => {
    const title = await browser.getTitle();
    expect(title).to.equal('Swapi People Searcher');
  });

  it('should have a search box', async () => {
    const searchBoxes = await browser.$$('[test_selector="swapi-search-box"] input');
    expect(searchBoxes).to.have.length(1);
  });

  it('should debounce the search call', async () => {
    let nockCounter = 0;
    let searchTerm;
    nock('https://swapi.co/').persist().get('/api/people/').query(true)
      .reply(200, req => {
        nockCounter++;
        searchTerm = req.split('=')[1];
        return { results: [] };
      });

    const searchBox = await browser.$('[test_selector="swapi-search-box"] input');
    await searchBox.setValue('a');
    await searchBox.setValue('b');
    await searchBox.setValue('c');
    await searchBox.setValue('d');
    await searchBox.setValue('e');

    const progressSpinner = await browser.$('[test_selector="progress"]');
    await progressSpinner.waitForExist(1000, true); //wait for not exist

    expect(nockCounter).to.equal(1);
    expect(searchTerm).to.equal('e');
  });
});
