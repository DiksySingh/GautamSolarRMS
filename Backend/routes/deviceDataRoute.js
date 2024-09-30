const {addInverterData, fetchDeviceData,getRealTimeData, getDeviceOverview} = require("../controllers/deviceDataController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

//API for the device
router.get("/add-device-data", addInverterData);

//Customer Routes
router.get("/device-overview", userVerification(['customer']),  getDeviceOverview);
router.get("/device-live-data", userVerification(['customer']), getRealTimeData);
router.get("/device-history", userVerification(['customer']),  fetchDeviceData);

module.exports = router;