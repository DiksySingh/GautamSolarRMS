const DeviceData = require("../models/deviceDataSchema");
const moment = require('moment-timezone');


//Fecthing all the device data through the IMEI NO
module.exports.getInverterData = async(req, res)=> {
    try{
        const IMEI_NO = req.params.IMEI_NO || req.body.IMEI_NO || req.query.IMEI_NO;
        const deviceData = await DeviceData.find({IMEI_NO});
        if (deviceData.length === 0) {
            return res.status(404).json({
                message: "Data Not Found",
                success: false
            });
        }
        const convertedData = deviceData.map(item => {
            const convertedDateTime = moment(item.DATE_TIME).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'); 
            return {
                ...item.toObject(),
                DATE_TIME: convertedDateTime // Override DATE_TIME with IST formatted date
            };
        });
        // Send the retrieved data
        res.json({data: convertedData});
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


//Saving data for the device into the database
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


//fetching device data according to the date filter option
module.exports.fetchDeviceData = async(req, res) => {
    //console.log(req.params);
    //console.log(req.body);
    //console.log(req.query);
    //const {IMEI_NO, filterOption, startDate, endDate} = req.body || req.query || req.params;
    const data = req.query;
    console.log(data);
    const IMEI_NO = data.IMEI_NO;
    console.log(IMEI_NO);
    const filterOption = data.filterOption;
    console.log(filterOption);
    if(!IMEI_NO || !filterOption){
        return res.status(400).json({
            success: false,
            message: "IMEI_NO and filterOption is required"
        });
    }
    let start, end;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    switch(filterOption){
        case 'today':
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = today;
            break;
        
        case '1 month':
            start = new Date();
            start.setMonth(today.getMonth() - 1);
            start.setHours(0, 0, 0, 0);
            end = today;
            break;
        
        case '3 months':
            start = new Date();
            start.setMonth(today.getMonth() - 3);
            start.setHours(0, 0, 0, 0);
            end = today;
            break;
        
        case 'custom':
            if(!startDate || !endDate){
                return res.status(400).json({
                    success: false,
                    message: "For custom filter, startDate and endDate are required.",
                });
            }

            start = new Date(startDate);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            break;
        
        default:
            return res.status(400).json({
                success: false,
                message: "Invalid filter option.",
            });
    }

    try{
        const fetchData = await DeviceData.find({
            IMEI_NO: IMEI_NO,
            DATE_TIME: {
                $gte: start,
                $lte: end
            }
        });
        console.log(fetchData);
        if(fetchData.length === 0){
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            data: fetchData
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


//Fetching the overview of the device from the database
module.exports.getDeviceOverview = async (req, res) => {
    try {
        const { imei } = req.query;
        const { month, year } = req.query;

        // Fetch the latest data
        const latestData = await DeviceData.findOne({ IMEI_NO: imei }).sort({ DATE_TIME: -1 }); // Get the latest record
        console.log(latestData);
        if (!latestData) {
            return res.status(404).json({ 
                error: 'No data found for this device',
                success: false 
            });
        }

        const totalProductionPower = latestData.OUTPUT_POWER;
        const installedCapacity = latestData.INSTALLED_CAPACITY || 6;  // Assuming a default value

        const dailyProduction = latestData.TODAY_ENERGY;
        const monthlyProduction = await getMonthlyProduction(imei); 
        console.log(monthlyProduction);
        const yearlyProduction = await getYearlyProduction(imei);
        console.log(yearlyProduction);
        const totalProduction = latestData.TOTAL_ENERGY;

        // Calculate the start and end of the requested month or default to current month/year
        const selectedMonth = month || moment().format('MM'); // Defaults to current month if not provided
        const selectedYear = year || moment().format('YYYY'); // Defaults to current year if not provided
        
        // Create the start and end dates for the selected month/year
        const startOfMonth = moment(`${selectedYear}-${selectedMonth}-01`, 'YYYY-MM-DD').startOf('month').toDate();
        const endOfMonth = moment(`${selectedYear}-${selectedMonth}-01`, 'YYYY-MM-DD').endOf('month').toDate();

        // MongoDB aggregation query to group by day and sum the energy
        const dailyProductionData = await DeviceData.aggregate([
            { 
                $match: { 
                    IMEI_NO: imei, 
                    DATE_TIME: { $gte: startOfMonth, $lte: endOfMonth } 
                } 
            },
            {
                $group: {
                    _id: { $dayOfMonth: '$DATE_TIME' }, // Group by day of the month
                    totalEnergy: { $sum: { $toDouble:'$TODAY_ENERGY' }}, // Sum the energy for each day
                }
            },
            { $sort: { _id: 1 } } // Sort by day in ascending order
        ]);

        // Transform the data for frontend use
        const productionData = dailyProductionData.map(item => ({
            day: item._id,
            totalEnergy: item.totalEnergy
        }));

        res.status(200).json({
            success: true,
            totalProductionPower,
            installedCapacity,
            dailyProduction,
            monthlyProduction,
            yearlyProduction,
            totalProduction,
            productionData
        });
    } catch (err) {
        res.status(500).json({ 
            error: err.message,
            success: false 
        });
    }
};

//Getting the data monthly productionn according to date anf todays energy field
async function getMonthlyProduction(imei) {
    try{
    const startOfMonth = moment().startOf('month').toDate();
    console.log(startOfMonth);
    const endOfMonth = moment().endOf('month').toDate();
    console.log(endOfMonth);

    const monthlyProduction = await DeviceData.aggregate([
        { $match: { IMEI_NO: imei, DATE_TIME: { $gte: startOfMonth, $lte: endOfMonth } } },
        { $group: { _id: null, totalEnergy: { $sum: { $toDouble: '$TODAY_ENERGY'} } } },
    ]);
    console.log(monthlyProduction);

    return monthlyProduction.length ? monthlyProduction[0].totalEnergy : 0;
    }catch (error) {
        console.error('Error fetching monthly production:', error);
        throw error;
    }
}

//Getting the data yearly productionn according to date anf todays energy field
async function getYearlyProduction(imei) {
    try{
    const startOfYear = moment().startOf('year').toDate();
    const endOfYear = moment().endOf('year').toDate();
    console.log(startOfYear," ", endOfYear);

    const yearlyProduction = await DeviceData.aggregate([
        { $match: { IMEI_NO: imei, DATE_TIME: { $gte: startOfYear, $lte: endOfYear } } },
        { $group: { _id: null, totalEnergy: { $sum: { $toDouble: '$TODAY_ENERGY'} } } },
    ]);
    console.log(yearlyProduction);

    return yearlyProduction.length ? yearlyProduction[0].totalEnergy : 0;
    }catch (error) {
        console.error('Error fetching yearly production:', error);
        throw error;
    }
}
