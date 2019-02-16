const { expect } = require('chai');
const { selenium, nocks } = require('../helpers');

const initials = name => name.split(' ').map(str => str[0].toUpperCase()).join('');

describe('Results', async () => {
  const searchTerm = 'test search';
  let cards;
  let expectedPerson0;
  let expectedPerson1;
  let browser;

  before(async() => {
    browser = await selenium.getBrowser();
    ({ expectedPerson0, expectedPerson1 } = nocks.nockFullResponse(searchTerm));

    const searchBox = await browser.$('[test_selector="swapi-search-box"] input');
    await searchBox.setValue(searchTerm);

    const progressSpinner = await browser.$('[test_selector="progress"]');
    await progressSpinner.waitForExist(1000, true); //wait for not exist

    cards = await browser.$$('[test_selector="SWPerson"]');
  });

  it('should respond with a card for each result', async () => {
    expect(cards).to.have.length(2);
  });

  it('should contain name, species and homeworld in each card', async () => {
    const cardText0 = await cards[0].getText();
    expect(cardText0).to.contain(expectedPerson0.name);
    expect(cardText0).to.contain(`${expectedPerson0.species} | ${expectedPerson0.homeworld}`);

    const cardText1 = await cards[1].getText();
    expect(cardText1).to.contain(expectedPerson1.name);
    expect(cardText1).to.contain(`${expectedPerson1.species} | ${expectedPerson1.homeworld}`);
  });

  it('should contain birthYear in each card', async () => {
    const birth0 = await cards[0].$('[test_selector="trait_birth"]');
    const birth0Text = await birth0.getText();
    expect(birth0Text).to.contain('Birth Year');
    expect(birth0Text).to.contain(expectedPerson0.birth_year);

    const birth1 = await cards[1].$('[test_selector="trait_birth"]');
    const birth1Text = await birth1.getText();
    expect(birth1Text).to.contain('Birth Year');
    expect(birth1Text).to.contain(expectedPerson1.birth_year);
  });

  it('should contain eye colour in each card', async () => {
    const eyes0 = await cards[0].$('[test_selector="trait_eyes"]');
    const eyes0Text = await eyes0.getText();
    expect(eyes0Text).to.contain('Eye Colour');
    expect(eyes0Text).to.contain(expectedPerson0.eye_color);

    const eyes1 = await cards[1].$('[test_selector="trait_eyes"]');
    const eyes1Text = await eyes1.getText();
    expect(eyes1Text).to.contain('Eye Colour');
    expect(eyes1Text).to.contain(expectedPerson1.eye_color);
  });

  it('should contain gender in each card', async () => {
    const gender0 = await cards[0].$('[test_selector="trait_gender"]');
    const gender0Text = await gender0.getText();
    expect(gender0Text).to.contain('Gender');
    expect(gender0Text).to.contain(expectedPerson0.gender);

    const gender1 = await cards[1].$('[test_selector="trait_gender"]');
    const gender1Text = await gender1.getText();
    expect(gender1Text).to.contain('Gender');
    expect(gender1Text).to.contain(expectedPerson1.gender);
  });

  it('should contain a list of films in each card', async () => {
    const films0 = await cards[0].$('[test_selector="trait_films"]');
    const films0Text = await films0.getText();
    expect(films0Text).to.contain('Films');
    expect(films0Text).to.contain(expectedPerson0.films.join('\n'));

    const films1 = await cards[1].$('[test_selector="trait_films"]');
    const films1Text = await films1.getText();
    expect(films1Text).to.contain('Films');
    expect(films1Text).to.contain(expectedPerson1.films.join('\n'));
  });

  it('should have an avatar containing person`s initials in each card', async () => {
    const avatar0 = await cards[0].$('[test_selector="avatar"]');
    expect(await avatar0.getText()).to.equal(initials(expectedPerson0.name));

    const avatar1 = await cards[1].$('[test_selector="avatar"]');
    expect(await avatar1.getText()).to.equal(initials(expectedPerson1.name));
  });
});
