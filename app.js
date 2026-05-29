const express = require('express');
const sequelize = require('./db'); 
const Pelicula = require('./modules/Pelicula');
const jwt = require('jsonwebtoken');
// Importamos el nuevo guardia (JWT) y el viejo (ApiKey) si lo sigues usando
const { validarToken, SECRET_KEY } = require('./middlewares/authMiddleware');
const validarApiKey = require('./middlewares/validar'); 

const app = express();
app.use(express.json()); 

// --- RUTAS PÚBLICAS (No necesitan token) ---

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        const user = { name: username };
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});

// A partir de aquí, todas las rutas piden el Token de JWT

app.get('/peliculas', validarToken, async (req, res) => {
    const lista = await Pelicula.findAll();
    res.json(lista);
});

app.post('/peliculas', validarToken, async (req, res) => {
    const nueva = await Pelicula.create(req.body);
    res.json(nueva);
});

app.get('/peliculas/:id', validarToken, async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id);
    if (peli) res.json(peli);
    else res.status(404).send("No encontré esa película");
});

app.put('/peliculas/:id', validarToken, async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id);
    if (peli) {
        await peli.update(req.body);
        res.json(peli);
    } else res.status(404).send("No encontré esa película para actualizar");
});

app.delete('/peliculas/:id', validarToken, async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id);
    if (peli) {
        await peli.destroy();
        res.status(204).send();
    } else res.status(404).send("No existe esa película");
});

app.get('/', async (req, res) => {
    res.send('Api funcionando');
});


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`¡Listo! Tu API funciona en el puerto ${PORT}`));
});
