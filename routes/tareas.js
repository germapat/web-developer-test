const router = require('express').Router();
let Tarea = require('../models/tarea.js');
var mongoose = require('mongoose');

router.route('/act').get((req, res) => {
    let id = mongoose.Types.ObjectId(req.body.userId)
    Tarea.findAct(id)
        .then(tareas => res.json(tareas).status(200))
        .catch(err => res.status(400).send('Error: ' + err))
})

router.route('/').get((req, res) => {
    Tarea.find()
        .then(tareas => res.json(tareas).status(200))
        .catch(err => res.status(400).send('Error: ' + err));
})


router.route('/:id').get((req, res) => {
    var id = req.params.id;
    Tarea.findById(id, function(err, resource) {
        if (err) {
            return res.send(err).status(404);
        } else {
            res.json(resource).status(200);
        }
    })
})

router.route('/tarea').post((req, res) => {
    console.log('salvando')
    const newTarea = new Tarea(req.body)
    var user = mongoose.Types.ObjectId(newTarea.user);
    console.log('salvando: ' + newTarea)
    Tarea.addTarea(newTarea, function(err, user) {
        if (err) {
            res.json({ status: 401, msg: 'Fallo al actualizar la tarea' });
        } else {
            res.json({ status: 201, msg: 'Tarea actualizada' });
        }
    });


});

module.exports = router;