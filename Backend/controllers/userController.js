const User = require("../models/userSchema");
const {createSecretToken} = require("../util/secretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async(req, res) => {
        const {name, address, email, plantInstalled, password, createdAt} = req.body;
        if (!name) {
            return res.status(400).json({ 
                message: "Name is required", 
                success: false 
            });
        }

        if (!email) {
            return res.status(400).json({ 
                message: "Email is required", 
                success: false 
            });
        }

        if(!plantInstalled){
            return res.status(400).json({
                message: "Plant Installed is required",
                success: false
            })
        }
    
        if (!password || password.length < 8) {
            return res.status(400).json({ 
                message: "Password must be atleast 8 characters long", 
                success: false 
            });
        }
        
        try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                message: "User already exist"
            });
        }
        const newUser = new User({name, address, email, plantInstalled, password, createdAt});
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
            data: newUser
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

module.exports.Login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,               
                message: "Incorrect password or email",
                
            });
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.status(401).json({
                success: false,
                message: "Incorrect password or email"
            });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: {
                email: email,
                token
            }
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// module.exports.Logout = async(req, res, next) => {
//         res.clearCookie('token');
//         res.send('Logged out successfully');
// }