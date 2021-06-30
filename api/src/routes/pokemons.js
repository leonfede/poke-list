const axios = require('axios');
const router = require('express').Router();
const { Pokemon, Type } = require('../db');

const searchExternalId = (id, res, next) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(({ data }) => {
      const parsedPokemon = {
        id: data.id,
        name: data.name,
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
        types: data.types.map(({ type }) => {
          const url = type.url.split('/');
          return {
            id: url[url.length - 2],
            name: type.name
          }
        }),
        origin: 'external'
      }
      res.status(200).send(parsedPokemon);
    })
    .catch(next);
}

const searchLocalId = (id, res, next) => {
  Pokemon.findByPk(id, { include: [ Type ]})
    .then(data => {
      if(!data) res.status(400).send({ error: 'Not found' });
      else res.status(200).send(data)
    })
    .catch(next);
}

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const { origin } = req.query;
  console.log(origin, id);
  if(!origin) res.status(400).send({ error: 'Origin not specified'});
  switch(origin) {
    case 'db':
      searchLocalId(id, res, next);
      break;
    case 'external':
      searchExternalId(id, res, next);
      break;
    default:
      res.status(400).send({ error: 'Invalid origin'});
  }
});

router.get('/', (req, res, next) => {
  const nameQuery = req.query.name;
  const pokemonsFromAPI = axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
    .catch(next);
  const pokemonsFromDb = Pokemon.findAll({ include: [Type]})
    .catch(next);
  Promise.all([pokemonsFromAPI, pokemonsFromDb])
    .then(data => {
      const dataFromApi = data[0];
      const dataFromDb = data[1];
      const pokemonsFromApi = dataFromApi.data.results.map(async pokemon => {
        let parsedPokemon = {};
        try {
          const { data } = await axios.get(pokemon.url.slice(0, pokemon.url.length - 1));
          parsedPokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(({ type }) => {
              const url = type.url.split('/');
              return { 
                id: url[url.length - 2],
                name: type.name
              }
            }),
            origin: 'external'
          }
        } catch(error) {
          console.error(error);
        }
        return parsedPokemon;
      });
      Promise.all(pokemonsFromApi).then(externalPokemonData => {
        const fullPokemonArray = dataFromDb.concat(externalPokemonData);
        if(!nameQuery) res.status(200).send(fullPokemonArray);
        else {
          const foundPokemon = fullPokemonArray.find(pokemon => pokemon.name.toUpperCase() === nameQuery.toUpperCase());
          if(!foundPokemon) res.status(400).send({ error: 'Not Found'});
          else {
            switch(foundPokemon.origin) {
              case 'external':
                searchExternalId(foundPokemon.id, res, next);
                break;
              case 'db':
                searchLocalId(foundPokemon.id, res, next);
                break;
              default:
                res.status(400).send({ error: 'Invalid origin' });
            }
          }
        }
      })
      .catch(next);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const {
    name, health, attack, defense, specialAttack,
    specialDefense, speed, height, weight, image, selectedTypes
  } = req.body;
  Pokemon.create({
    name, health, attack, defense, specialAttack, 
    specialDefense, speed, height, weight, image,
    origin: 'db'
  })
    .then(newPokemon => {
      selectedTypes.forEach(async type => {
        try {
          await newPokemon.addType(type);
        } catch(error) {
          console.error(error);
        } finally {
          newPokemon.save();
        }
      });
      res.status(201).send(newPokemon);
    })
    .catch(next);
});

router.put('/', (req, res, next) => {
  Pokemon.findByPk(req.body.id)
    .then(previousData => {
      if(!previousData) res.status(404).send({ error: 'Not Found' });
      else {
        Pokemon.update({
          name: req.body.name || previousData.name,
          health: req.body.health || previousData.health,
          attack: req.body.attack || previousData.attack,
          defense: req.body.defense || previousData.defense,
          specialAttack: req.body.specialAttack || previousData.specialAttack,
          specialDefense: req.body.specialDefense || previousData.specialDefense,
          speed: req.body.speed || previousData.speed,
          height: req.body.height || previousData.height,
          weight: req.body.weight || previousData.weight,
          image: req.body.image || previousData.image
        }, 
        {
          where: {
            id: req.body.id
          },
          include: [Type]
        })
          .then(updatedPokemon => {
            console.log(updatedPokemon);
            if(req.body.selectedTypes) {
              previousData.types.forEach(async type => {
                try {
                  await previousData.removeType(type);
                } catch(error) {
                  console.log(error);
                } finally {
                  updatedPokemon.save();
                }
              });
              req.body.selectedTypes.forEach(async type => {
                try {
                  await previousData.addType(type);
                }   catch(error) {
                  console.log(error);
                } finally {
                  previousData.save();
                }
              });
            }
            res.status(201).send({ status: 'Updated' });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Pokemon.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.status(200).send({ status: 'Deleted' })
    })
    .catch(next);
});

module.exports = router;
