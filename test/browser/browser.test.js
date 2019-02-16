const { expect } = require('chai');
const { selenium } = require('../helpers');

describe('Page', () => {
  let browser;

  before(async () => {
    browser = await selenium.getBrowser();
  });

  after(async () => {
    await selenium.getBrowser();
  });

  it('deletes the document with that id in the db, responds with 200 and no data', async () => {
    const title = await browser.getTitle();
    expect(title).to.equal('Swapi People Searcher');
  });

  /* it('can move the amount slider, triggering a quote request', async () => {
   *   const slider = await browser.$('[test="loan-amount-section"] button');
   *   await slider.moveTo();
   *   await browser.buttonDown();
   *   await slider.moveTo(20, 0);
   *   await browser.buttonUp();
   *   (await browser.$('[test="progress"]')).waitForExist(500);
   *   (await browser.$('[test="progress"]')).waitForExist(5000, true); //wait for not exist
   *   const results = await (await browser.$('[test="results"]')).getText();
   *   expect(results).to.include('Amount');
   *   expect(results).to.include('Number of Payments');
   *   expect(results).to.include('Monthly Payments');
   *   expect(results).to.include('Nominal Interest Rate');
   *   expect(results).to.include('APR');
   * });

   * it('can move the duration slider, triggering a quote request', async () => {
   *   const slider = await browser.$('[test="loan-duration-section"] button');
   *   await slider.moveTo();
   *   await browser.buttonDown();
   *   await slider.moveTo(20, 0);
   *   await browser.buttonUp();
   *   (await browser.$('[test="progress"]')).waitForExist(500);
   *   (await browser.$('[test="progress"]')).waitForExist(5000, true); //wait for not exist
   *   const results = await (await browser.$('[test="results"]')).getText();
   *   expect(results).to.include('Amount');
   *   expect(results).to.include('Number of Payments');
   *   expect(results).to.include('Monthly Payments');
   *   expect(results).to.include('Nominal Interest Rate');
   *   expect(results).to.include('APR');
   * }); */
});
