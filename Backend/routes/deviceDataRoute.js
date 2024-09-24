const {getInverterData, addInverterData, fetchDeviceData, getDeviceOverview} = require("../controllers/deviceDataController");
const router = require("express").Router();

router.get("/getData", getInverterData);
router.get("/addData", addInverterData);
router.get("/fetch-device-data", fetchDeviceData);
router.get("/production-overview", getDeviceOverview);

module.exports = router;