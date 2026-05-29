const { Sequelize } = require('sequelize');

let db;

// Si estás en Render, usará PostgreSQL de forma automática
if (process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Evita errores de certificado en Render
            }
        }
    });
} else {
    // Si estás en tu compu (Localhost), sigue usando tu archivo SQLite normal
    db = new Sequelize({
        dialect: 'sqlite',
        storage: './mis_peliculas.sqlite'
    });
}

module.exports = db;