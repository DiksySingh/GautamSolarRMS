const {showData, addData} = require("../controllers/deviceDataController");
const router = require("express").Router();

router.get("/showData", showData);
router.post("/addData", addData);

module.exports = router;