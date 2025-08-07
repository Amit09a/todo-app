const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Define schema 
const userSchema = new mongoose.Schema({
    name : String,
    email : {type: String, unique : true},
    password : String
});

// this fun works before user saves
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

module.exports = mongoose.model('User',userSchema);