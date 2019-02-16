import axios from 'axios';

const fetchProp = prop => async url => {
  const { data } = await axios.get(url);
  return data[prop];
};

const enrichPerson = async ({ films, species, homeworld, ...person }) => ({
  ...person,
  films: films && await Promise.all(films.map(fetchProp('title'))),
  species: species && await Promise.all(species.map(fetchProp('name'))),
  homeworld: homeworld && await fetchProp('name')(homeworld),
});

module.exports = {
  async peopleSearch(req, res) {
    try {
      const { search } = req.query;

      const people = await fetchProp('results')(`https://swapi.co/api/people/?search=${search}`);
      const enrichedPeople = await Promise.all(people.map(enrichPerson));

      res.send(enrichedPeople);
    } catch (e){
      console.error('Swapi controller error', e);
      res.status(400).send(e.message);
    }
  },
};
