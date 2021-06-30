const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    specialAttack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    specialDefense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0.1
      }
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0.1
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origin: {
      type: DataTypes.ENUM('db', 'external'),
      allowNull: false
    }
  });
};
