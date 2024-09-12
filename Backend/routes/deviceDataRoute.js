const {getInverterData, addInverterData} = require("../controllers/deviceDataController");
const router = require("express").Router();

router.get("/getData/:IMEI_NO", getInverterData);
router.post("/addData", addInverterData);

module.exports = router;