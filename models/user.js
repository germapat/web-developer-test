const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
mongoose.Promise = global.Promise

// User Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, resource) {
    User.findById(id, resource);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.editUser = function(newUser, callback) {
    var id = newUser._id;
    this.getUserById(id, (err, user) => {
        if (err) throw err;
        if (user) {
            if (newUser.password === user.password) {
                User.updateOne({ _id: id }, newUser, function(err, resource) {
                    //newUser.save(callback);
                    if (err) throw err;
                    callback(null, resource);
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        User.updateOne({ _id: id }, newUser, function(err, resource) {
                            //newUser.save(callback);
                            if (err) throw err;
                            callback(null, resource);
                        });
                    });
                });
            }
        }
    })
}

module.exports.getUserByUsername = function(username, resource) {
    const query = { username: { $regex: new RegExp('^' + username, 'i') } }
    User.findOne(query, resource);
}


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}