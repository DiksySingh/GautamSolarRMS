//const {createSecretToken} = require("../util/secretToken");
const Admin = require("../models/adminSchema");
//const bcrypt = require("bcrypt");

module.exports.adminSignUp = async (req, res) => {
        const {username, email, password, role, createdAt} = req.body;
        if(!username){
            res.status(400).json({
                success:false,
                message: "Username is required"
            });
        }

        if(!email){
            res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if(!password){
            res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        try{
            const existingAdmin = await Admin.findOne({email});
            if(existingAdmin){
                res.status(400). json({
                    success: false,
                    message: "Admin already exists"
                });
            }

            const newAdmin = new Admin({username, email, password, role, createdAt});
            await newAdmin.save();
           
            res.status(201).json({
                success: true,
                message: "Admin registered successfully",
                data: newAdmin
            }); 
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
};

// module.exports.adminLogin = async(req, res) => {
//     const {email, password} = req.body;
//     if(!email || !password){
//         res.status(400).json({
//             success: false,
//             message: "All fields are required"
//         });
//     }
    
//     try{
//         const admin = await Admin.findOne({email});
//         if(!admin){
//             res.status(400).json({
//                 success: false,
//                 message: "Incorrect email or password"
//             });
//         }

//         const auth = await bcrypt.compare(password, admin.password);
//         if(!auth){
//             return res.json({
//                 message: "Incorrect email or password",
//                 success:false
//             });
//         }

//         const token = createSecretToken(admin._id);
//         res.cookie("token", token, {
//             withCredentials: true,
//             httpOnly: false,
//         });

//         res.status(201).json({
//             message: "Admin logged in successfully",
//             success: true,
//         });
//     }catch(error){
//         res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };
