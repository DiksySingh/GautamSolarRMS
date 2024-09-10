const DeviceData = require("../models/deviceDataSchema");

module.exports.showData = async(req, res)=> {
    try{
        const {imeiNo} = req.body;
        const data = await DeviceData.find({imeiNo});
        if (data.length === 0) {
            return res.status(404).json({
                message: "Data Not Found"
            });
        }
        // Send the retrieved data
        res.send(data);
    }catch(error){
        console.log("Error fetching data: ", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports.addData = async (req, res) => {
    try {
        const data = req.body;

        // Create a new document
        const newData = new DeviceData(data);

        // Save the document to the database
        await newData.save();

        // Send success response
        res.status(201).json({ message: 'Data saved successfully', data });

    }catch (error) {
        console.log("Error saving data: ", error);
        // Send error response
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message 
        });
    }
};

