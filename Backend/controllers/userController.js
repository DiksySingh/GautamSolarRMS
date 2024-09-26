const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const {createSecretToken} = require("../util/secretToken");
const bcrypt = require("bcrypt");

module.exports.userSignup = async(req, res) => {
        const {name, address, email, plantInstalled, imeiNo, password, role, createdAt} = req.body;
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

        if(!imeiNo){
            return res.status(400).json({
                message: "IMEI_NO is required",
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
        const newUser = new User({name, address, email, plantInstalled, imeiNo, password, role, createdAt});
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
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let user;

        if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else if (role === 'customer') {
            user = await User.findOne({ email });
        } else {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            });
        }

        //const user = await User.findOne({email});
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

        const token = createSecretToken(user._id, user.role);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });

        res.status(200 ).json({
            success: true,
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully}`,
            data: {
                email,
                role,
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