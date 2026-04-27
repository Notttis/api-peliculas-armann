const validarApiKey = (req, res, next) => {
    const clave = req.headers['x-api-key']; 
    if (clave === '12345') { 
        next();
    } else {
        res.status(401).send('¡No tienes permiso!');
    }
};
module.exports = validarApiKey;