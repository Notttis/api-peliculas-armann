const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mi_clave_super_secreta'; 

const validarToken = (req, res, next) => {
    // Buscamos el token en el encabezado 'Authorization'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).send('No mandaste el token.');
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido o expirado');
        }
        req.user = user; // 
        next(); // 
    });
};

module.exports = { validarToken, SECRET_KEY };