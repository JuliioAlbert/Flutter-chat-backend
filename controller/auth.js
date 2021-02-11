const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msj: 'El Correo ya esta Registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encripctar
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Hable el con el Admin'
        })
    }

}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msj:'Email no encontro'
            });
        }
        
        
        //Validar Password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msj:'Password no Valida'
            });
        }

        //Generar EL JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuarioDB,
            token
        });



    } catch (error) {
        return res.status(505).json({
            ok: false,
            msj: 'Hable con el Adminitrador'
        })
    }

}

const renewToken = async (req, res = response) => {

    //Const uid uid del usuario
    const uid = req.uid;
   
    //Generar un JWT nuevo 

    const token = await generarJWT(uid);
    

    //Obtener el Usuario por ID
    const usuarioDB =  await Usuario.findById(uid);
    
    res.json({
        ok:true,
        msj: "Renew",
        token,
        usuarioDB
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}
