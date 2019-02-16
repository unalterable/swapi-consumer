const nock = require('nock');

export const nockFullResponse = searchTerm => {
  const nockedResponse = {
    results: [
      {
        name: 'FAKE Luke0',
        birth_year: 'Fake birth Year0',
        eye_color: 'Fake eye colour0',
        gender: 'Fake gender0',
        species: ['https://blob.com/fake-api1'],
        films: ['https://blob.com/fake-api2'],
      },
      {
        name: 'FAKE anakin1',
        birth_year: 'Fake birth Year1',
        eye_color: 'Fake eye colour1',
        gender: 'Fake gender1',
        homeworld: 'https://blob.com/fake-api3',
        films: ['https://blob.com/fake-api4', 'https://blob.com/fake-api5'],
      },
    ],
  };

  nock('https://swapi.co/').get('/api/people/').query({ search: searchTerm }).reply(200, nockedResponse);
  nock('https://blob.com/').get('/fake-api1').reply(200, { name: 'fakestr1' });
  nock('https://blob.com/').get('/fake-api2').reply(200, { title: 'fakestr2' });
  nock('https://blob.com/').get('/fake-api3').reply(200, { name: 'fakestr3' });
  nock('https://blob.com/').get('/fake-api4').reply(200, { title: 'fakestr4' });
  nock('https://blob.com/').get('/fake-api5').reply(200, { title: 'fakestr5' });

  const expectedPerson0 = {
    ...nockedResponse.results[0],
    species: ['fakestr1'],
    films: ['fakestr2'],
  };

  const expectedPerson1 = {
    ...nockedResponse.results[1],
    homeworld: 'fakestr3',
    films: ['fakestr4', 'fakestr5'],
  };

  return { expectedPerson0, expectedPerson1 };
};
