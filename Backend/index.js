require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const deviceDataRoute = require("./routes/deviceDataRoute");

const URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
}
main();

app.use(cors()); 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/user", authRoute);
app.use("/device", deviceDataRoute);

// app.get("/showData", async(req, res)=> {
//     try{
//         const data = await DeviceDataModel.find({});
//         if (data.length === 0) {
//             return res.status(404).json({
//                 message: "Data Not Found"
//             });
//         }
//         // Send the retrieved data
//         res.send(data);
//     }catch(error){
//         console.log("Error fetching data: ", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// });

// app.post("/addData",);


app.listen(3000, () => {
    console.log("Server running at port 3000");
});