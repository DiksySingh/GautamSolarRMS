const {getInverterData, addInverterData, fetchDeviceData, getProductionOverview} = require("../controllers/deviceDataController");
const router = require("express").Router();

//router.get("/getData/:IMEI_NO", getInverterData);
router.get("/addData", addInverterData);
router.get("/fetch-device-data", fetchDeviceData);
router.get("/production-overview/:imei", getProductionOverview);

module.exports = router;