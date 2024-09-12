const {getInverterData, addInverterData} = require("../controllers/deviceDataController");
const router = require("express").Router();

router.get("/getData", getInverterData);
router.post("/addData", addInverterData);

module.exports = router;