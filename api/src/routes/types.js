const router = require('express').Router();
const axios = require('axios');
const { Type } = require('../db');

router.get('/', (_req, res, next) => {
  Type.findAll()
    .then(types => {
      if(types.length === 0) {
        axios.get('https://pokeapi.co/api/v2/type')
          .then(({ data }) => {
            const types = data.results.map(result => {
              return Type.create({
                name: result.name
              })
            });
            Promise.all(types)
              .then(results => {
                res.status(200).send(results);
              })
              .catch(next);
          })
          .catch(next);
      } else {
        res.status(200).send(types);
      }
    })
    .catch(next);
});

module.exports = router;
