const express = require ('express'); //Se inyectan las dependencias de express.
const router = express.Router(); //Se inyecta el router. 
const mongoose = require ('mongoose'); //Se inyectan las dependencias de mongoose. 
let User = require ('../models/users'); //Se importan los datos del users.js de /models.

//Se define la ruta en la que se verán reflejados los datos de la BD
router.get('/usuarios', async (req, res) => {
    const Users = await User.find({});
    res.render('usersSave', {Users});
});

//ruta /addUser renderizada
router.get('/addUser', (req, res)=> {
    res.render('addUser');
});

//ruta /addUser original 
router.post('/addUser', (req, res)=> {
    const newUser = User({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password
    });

    //.save - Guarda los datos resividos. 
    //.then -Muuestra el mensaje cuando la conexion es exitosa (lo contrario al catch).
    //.catch -Se capturan y muestran los errores que se presenten.

    newUser
        .save()
        .then((data)=> {res.redirect('/usuarios')})
        .catch((error)=> {res.json({message:error})});
});

module.exports = router; //Se exporta el router.  