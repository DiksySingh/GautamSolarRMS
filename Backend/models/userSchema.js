const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//const moment = require("moment-timezone");

const userSchema = new Schema({
    name: { 
        type: String,
        required: [true, "Name is required"],
    },
    address: {  
        type: String, 
        required: false,
    },
    email:{
        type: String,
        required: [true, "Email address is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdAt:{
        type: Date,
        default: () => new Date() ,
    }
});

userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// userSchema.pre('save', function(next) {
//     if (this.createdAt) {
//       // Convert UTC to IST (UTC+5:30)
//       this.createdAt = moment(this.createdAt).tz('Asia/Kolkata').toDate();
//     }
//     next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
