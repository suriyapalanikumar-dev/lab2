const  mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name'],
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength:[8, 'Password should be at least 8 characters long']
    },
    DOB : Date,
    city: String,
    state : String,
    country : String,
    address : String,
    phone : Number,
    profileUrl:{
        type: String,
        maxlength:300
    },
    about :{
        type: String,
        maxlength: [100, "About information can not be more than 100 characters"]
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
module.exports = mongoose.model('User',UserSchema)