const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

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
  image: null,
  origin: 'db'
};

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('Pokemon', () => {
      it('Debe lanzar un error si falta un campo', (done) => {
        Pokemon.create(pokemon)
          .then(() => done(new Error('No se enviaron todos los campos')))
          .catch(() => done());
      });
    });
  });
});
