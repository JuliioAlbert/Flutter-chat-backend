const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer Token 
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msj: 'No tiene Token'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msj: 'Token no Valido'
        })
    }

}

module.exports = {
    validarJWT
}