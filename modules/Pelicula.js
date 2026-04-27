const { DataTypes } = require('sequelize');
const db = require('../db');

const Pelicula = db.define('Pelicula', {
    titulo: DataTypes.STRING,
    genero: DataTypes.STRING
});
module.exports = Pelicula;