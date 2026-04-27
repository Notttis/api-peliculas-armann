const express = require('express');
const db = require('./db');
const Pelicula = require('./modules/Pelicula');
const validar = require('./middlewares/validar');

const app = express();
app.use(express.json()); 

// RUTA PARA OBTENER TODO (GET)
app.get('/peliculas', async (req, res) => {
    const lista = await Pelicula.findAll();
    res.json(lista);
});


app.post('/peliculas', validar, async (req, res) => {
    const nueva = await Pelicula.create(req.body);
    res.json(nueva);
});

// Arrancar el programa
db.sync().then(() => {
    app.listen(3000, () => console.log("¡Listo! Tu API funciona en el puerto 3000"));
});

// RUTA PARA OBTENER UNA SOLA PELÍCULA (GET por ID)
app.get('/peliculas/:id', async (req, res) => {
    // Buscamos la película por el número que pusiste en la URL
    const peli = await Pelicula.findByPk(req.params.id);
    
    if (peli) {
        res.json(peli); // Si existe, la mostramos
    } else {
        res.status(404).send("No encontré esa película"); // Si no existe
    }
});

// RUTA PARA ACTUALIZAR (PUT)
app.put('/peliculas/:id', async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id);
    if (peli) {
        await peli.update(req.body);
        res.json(peli);
    } else {
        res.status(404).send("No encontré esa película para actualizar");
    }
});

// RUTA PARA ELIMINAR (DELETE)
app.delete('/peliculas/:id', async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id);
    if (peli) {
        await peli.destroy(); // Esto la borra de la base de datos
        res.status(204).send(); // El 204 significa "Todo bien, ya no existe"
    } else {
        res.status(404).send("No existe esa película");
    }
});