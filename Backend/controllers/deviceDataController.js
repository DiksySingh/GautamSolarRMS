const DeviceData = require("../models/deviceDataSchema");

module.exports.getInverterData = async(req, res)=> {
    try{
        const {IMEI_NO} = req.params;
        const data = await DeviceData.find({IMEI_NO});
        if (data.length === 0) {
            return res.status(404).json({
                message: "Data Not Found",
                success: false
            });
        }
        // Send the retrieved data
        res.send(data);
    }catch(error){
        console.log("Error fetching data: ", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

// module.exports.addInverterData = async (req, res) => {
//     try {
//         const data = req.body;

//         // Create a new document
//         const newData = new DeviceData({
//             IMEI_NO: req.body.IMEI_NO,
//             SIM_NO: req.body.SIM_NO,
//             DATE_TIME: req.body.DATE_TIME,
//             INPUT_VOLTAGE: req.body.INPUT_VOLTAGE,
//             INPUT_CURRENT: req.body.INPUT_CURRENT
//         });

//         // Save the document to the database
//         await newData.save();

//         // Send success response
//         res.status(201).json({ message: 'Data saved successfully', data });

//     }catch (error) {
//         console.log("Error saving data: ", error);
//         // Send error response
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message 
//         });
//     }
// };

module.exports.addInverterData = async (req, res) => {
    try {
        const {qs} = req.query;
        console.log(qs);
        const dataArray = qs.split('$'); 
    
        if(dataArray.length >= 12){
            const IMEI_NO = dataArray[0];
            const SIM_NO = dataArray[1];
            const DATE_TIME = dataArray[2];
            const INPUT_VOLTAGE = dataArray[3];
            const INPUT_CURRENT = dataArray[4];
            const INPUT_POWER = dataArray[5];
            const OUTPUT_VOLTAGE = dataArray[6];
            const OUTPUT_CURRENT = dataArray[7];
            const OUTPUT_POWER = dataArray[8];
            const FAULT = dataArray[9];
            const TODAY_ENERGY = dataArray[10];
            const TOTAL_ENERGY = dataArray[11];
            
            console.log(IMEI_NO, " ", SIM_NO, " ", DATE_TIME, " ", INPUT_VOLTAGE, " ", INPUT_CURRENT," ",INPUT_POWER);
            console.log(OUTPUT_VOLTAGE," ",OUTPUT_CURRENT," ",OUTPUT_POWER," ",FAULT," ",TODAY_ENERGY," ",TOTAL_ENERGY);
    
            const newData = new DeviceData({
                IMEI_NO,
                SIM_NO,
                DATE_TIME,
                INPUT_VOLTAGE,
                INPUT_CURRENT,
                INPUT_POWER,
                OUTPUT_VOLTAGE,
                OUTPUT_CURRENT,
                OUTPUT_POWER,
                FAULT,
                TODAY_ENERGY,
                TOTAL_ENERGY
                // temperature: parseFloat(temperature),
                // humidity: parseFloat(humidity)
            });
            console.log(newData);
            const result = await newData.save();
            console.log(result);
            if(result){
                res.status(200).json({
                    message:"Data inserted successfully",
                    success: true,
                    result
                });
            }else{
                res.status(400).json({
                    message:"Data insertion failed",
                    success: false
                });
            }
        }
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

// module.exports.fetchDeviceData = async(req, res) => {
//     const {IMEI_NO, startDate, endDate} = req.body;
//     try{
//         if(!IMEI_NO || !startDate || !endDate){
//             return res.status(400).json({
//                 success: false,
//                 message: "IMEI_NO, startDate, endDate are required"
//             });
//         }

//         const start = new Date(startDate);
//         const end = new Date(endDate);

        
//     }
// }