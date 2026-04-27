const { Sequelize } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './mis_peliculas.sqlite' // El archivo donde se guarda todo
});
module.exports = db;