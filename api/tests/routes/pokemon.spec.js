/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  health: '1',
  attack: '1',
  defense: '1',
  specialAttack: '1',
  specialDefense: '1',
  speed: '1',
  height: '1',
  weight: '1',
  image: 'blank',
  origin: 'db'
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Error al conectar con la base de datos', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /types', () => {
    it('la ruta funciona y responde', () =>
      agent.get('/types').expect(200)
    );
  });
});
