const User = require("../models/userSchema");
const {createSecretToken} = require("../util/secretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async(req, res) => {
        const {email, username, password, createdAt} = req.body;
        console.log(email);
        if (!email) {
            return res.status(400).json({ 
                message: "Email is required", 
                success: false 
            });
        }
    
        if (!username) {
            return res.status(400).json({ 
                message: "Username is required", 
                success: false 
            });
        }
    
        if (!password) {
            return res.status(400).json({ 
                message: "Password is required", 
                success: false 
            });
        }
        try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                message: "User already exist"
            });
        }
        const newUser = new User({ email, username, password, createdAt});
        console.log(newUser);
        await newUser.save();
        const token = createSecretToken(newUser._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({
            message: "User registered successfully",
            success: true,
            newUser
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

module.exports.Login = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({message: "Incorrect password or email"});
        }
        const auth = bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({message: "Incorrect password or email"});
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({
            message: "User logged in successfully",
            success: true
        });
        next();
    }catch(error){
        console.error(error);
    }
}

module.exports.Logout = async(req, res, next) => {
        res.clearCookie('token');
        res.send('Logged out successfully');
}