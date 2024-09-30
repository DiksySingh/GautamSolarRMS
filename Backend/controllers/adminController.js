//const {createSecretToken} = require("../util/secretToken");
const Admin = require("../models/adminSchema");
const User = require("../models/userSchema");
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

//Update Customer Data
module.exports.getCustomer = async(req, res) => {
    try{
        const allCustomer = await User.find({});
        if(!allCustomer){
            return res.status(400).json({
                success: false,
                message: "No Data Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            allCustomer
        }); 

    }catch(error){
        res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error: error.message
        })
    }

};

module.exports.updateCustomer = async(req, res) => {
    try{
        const customerID = req.query.id;
        const updatedData = req.body;

        const customer = await User.findByIdAndUpdate(customerID, {$set: updatedData}, {
            new: true,
            runValidators: true,
        });

        if(!customer){
            return res.status(404).json({
                success: false,
                message: "Customer Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports.deleteCustomer = async(req, res) => {
    try{
        const customerID = req.query.id;
        const customer = await User.findByIdAndDelete(customerID)

        if(!customer){
            return res.status(404).json({
                success: false,
                message: "Customer Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customer
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}