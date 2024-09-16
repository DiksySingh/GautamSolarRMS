const {getInverterData, addInverterData, fetchDeviceData} = require("../controllers/deviceDataController");
const router = require("express").Router();

//router.get("/getData/:IMEI_NO", getInverterData);
router.get("/addData", addInverterData);
router.get("/fetch-device-data", fetchDeviceData);

module.exports = router;