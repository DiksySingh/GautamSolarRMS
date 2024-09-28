const {getInverterData, addInverterData, fetchDeviceData,getRealTimeData, getDeviceOverview} = require("../controllers/deviceDataController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

//Admin Routes
router.get("/get-device-data", userVerification(['admin']), getInverterData);

//API for the device
router.get("/add-device-data", addInverterData);

//Customer Routes
router.get("/device-overview", userVerification(['customer']),  getDeviceOverview);
router.get("/device-live-data", userVerification(['customer']), getRealTimeData);
router.get("/device-history", userVerification(['customer']),  fetchDeviceData);

module.exports = router;