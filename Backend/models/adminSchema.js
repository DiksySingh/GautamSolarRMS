const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

function getISTTime() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000); // Convert to UTC
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST (5 hours 30 minutes)
    const istTime = new Date(utcTime + istOffset); // Convert UTC to IST
    return istTime;
}

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password should atleast contain 8 characters"]
    },
    createdAt: {
        type: Date,
        default: getISTTime,
    }
});

adminSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;