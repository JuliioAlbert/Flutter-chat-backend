const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                //No se Creo el Token 
                reject('No se Pudo Generar el JWT')
            } else {
                resolve(token);
            }
        })
    })

}


module.exports = {
    generarJWT
}