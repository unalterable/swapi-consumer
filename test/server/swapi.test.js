const axios = require('axios');
const { expect } = require('chai');
const nock = require('nock');
const { server, nocks } = require('../helpers');

const getSUTUrl = searchTerm => `${server.getDomain()}/api/swapi/people?search=${searchTerm}`;
const fetch = axios.create({ validateStatus: false });

const search = 'SomeName';

describe('get /api/swapi/people', async () => {
  let consoleError;

  before(async () => {
    await server.start();
    nock.cleanAll();
    consoleError = console.error;
    console.error = () => {};
  });

  after(async () => {
    await server.stop();
    console.error = consoleError;
  });

  it('reponds with 200 and the results property from the swapi people search', async () => {
    const nockedResponse = {
      results: [
        { name: 'FAKE PERSON NAME' },
      ],
    };

    nock('https://swapi.co/').get('/api/people/').query({ search }).reply(200, nockedResponse);

    const { data, status } = await fetch.get(getSUTUrl(search));

    expect(status).to.equal(200);
    expect(data).to.deep.equal(nockedResponse.results);
  });

  it('reponds with 400 if swapi gives a malformed response', async () => {
    const nockedResponse = { bad: 'response' };
    const search = 'mr blobby';

    nock('https://swapi.co/').get('/api/people/').query({ search }).reply(200, nockedResponse);

    const { status } = await fetch.get(getSUTUrl(search));

    expect(status).to.equal(400);
  });

  it('enriches homeworld url with the name property of calling said url', async () => {
    const nockedResponse = {
      results: [
        { name: 'FAKE PERSON', homeworld: 'https://blob.com/fake-api' },
      ],
    };

    nock('https://swapi.co/').get('/api/people/').query({ search }).reply(200, nockedResponse);
    nock('https://blob.com/').get('/fake-api').reply(200, { name: 'fakestr' });

    const { data, status } = await fetch.get(getSUTUrl(search));

    expect(status).to.equal(200);
    expect(data[0].homeworld).to.equal('fakestr');
  });

  it('enriches films urls ARRAY with the title property of calling said url', async () => {
    const nockedResponse = {
      results: [
        { name: 'FAKE PERSON', films: ['https://blob.com/fake-api1', 'https://blob.com/fake-api2']},
      ],
    };

    nock('https://swapi.co/').get('/api/people/').query({ search }).reply(200, nockedResponse);
    nock('https://blob.com/').get('/fake-api1').reply(200, { title: 'fakestr1' });
    nock('https://blob.com/').get('/fake-api2').reply(200, { title: 'fakestr2' });

    const { data, status } = await fetch.get(getSUTUrl(search));

    expect(status).to.equal(200);
    expect(data[0].films).to.deep.equal(['fakestr1', 'fakestr2']);
  });

  it('enriches species urls ARRAY with the name property of calling said url', async () => {
    const nockedResponse = {
      results: [
        { name: 'FAKE PERSON', species: ['https://blob.com/fake-api1', 'https://blob.com/fake-api2']},
      ],
    };

    nock('https://swapi.co/').get('/api/people/').query({ search }).reply(200, nockedResponse);
    nock('https://blob.com/').get('/fake-api1').reply(200, { name: 'fakestr1' });
    nock('https://blob.com/').get('/fake-api2').reply(200, { name: 'fakestr2' });

    const { data, status } = await fetch.get(getSUTUrl(search));

    expect(status).to.equal(200);
    expect(data[0].species).to.deep.equal(['fakestr1', 'fakestr2']);
  });

  it('enriches homeworld, films & species (if present) for ALL people', async () => {
    const {expectedPerson0, expectedPerson1 } = nocks.nockFullResponse(search);
    const { data, status } = await fetch.get(getSUTUrl(search));

    expect(status).to.equal(200);
    expect(data[0]).to.deep.equal(expectedPerson0);
    expect(data[1]).to.deep.equal(expectedPerson1);
  });
});
