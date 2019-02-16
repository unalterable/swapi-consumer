import express from 'express' ;
import indexController from './controllers/index';
import swapiController from './controllers/swapi';

const initRoutes = () => {
  const app = express();

  app.use('/assets', express.static('assets'));

  app.get('/api/swapi/people', swapiController.peopleSearch);
  app.get('/*', indexController.showIndex);

  return app;
};

module.exports = initRoutes;

