const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, "Email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12)
});


const User = mongoose.model("User", userSchema);
module.exports = User;
