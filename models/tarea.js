const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Tarea Schema
const TareaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    descripcion: {
        type: String
    },
    prioridad: {
        type: Number
    },
    fechaVencimiento: {
        type: Date
    },
    act: {
        type: Boolean
    }
}, { timestamps: true })

const Tarea = module.exports = mongoose.model('Tarea', TareaSchema);

module.exports.getTareaById = function(id, resource) {
    Tarea.findById(id, resource);
}

module.exports.findAct = (id) => Tarea.find({
    $and: [{ "fechaVencimiento": { $ne: null } },
        { "fechaVencimiento": { "$lte": new Date() + "" } },
        { "user": id }
    ]
})

module.exports.addTarea = function(newTarea, callback) {
    console.log(newTarea)
    newTarea.save(callback);
}

module.exports.editTarea = function(newTarea, callback) {
    var id = newTarea._id;
    this.getTareaById(id, (err, tarea) => {
        if (err) throw err;
        if (tarea) {
            Tarea.updateOne({ _id: id }, newTarea, function(err, resource) {
                //newUser.save(callback);
                if (err) throw err;
                callback(null, resource);
            })
        }
    })
}