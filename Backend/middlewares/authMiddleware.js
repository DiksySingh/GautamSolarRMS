const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (roles) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            return res.status(400).json({status: false, message: "No token provided"});
        }
        jwt.verify(token, process.env.TOKEN_KEY, async(err, data) =>{
            if(err){
                return res.status(400).json({status: false, message: "Invalid Token"});
            }else{
                // const user = await User.findById(data.id);
                // if(user){
                //     return res.json({ 
                //         status: true,
                //         user: user.username
                //     })
                // }else{
                //     return res.json({status: false})
                // }
                try {
                    let user;
                    
                    if (roles.includes('admin')) {
                        // Fetch from Admin schema
                        user = await Admin.findById(data.id);
                        console.log("Admin:",user)
                    } else if (roles.includes('customer')) {
                        // Fetch from User schema
                        user = await User.findById(data.id);
                        console.log("Customer:",user)
                    }

                    if (user) {
                        return res.status(200).json({ 
                            status: true, 
                            user: user.username 
                        });
                    }

                    // Check if the user's role matches any of the allowed roles
                    if (roles.includes(user.role)) {
                        req.user = user; // Attach user info to the request object
                        next(); // Proceed to the next middleware or route handler
                    } else {
                        return res.status(403).json({ status: false, message: "Access denied" });
                    }
                } catch (error) {
                    return res.status(500).json({ status: false, message: "Internal Server Error" });
                }
            }
        });
    };
};