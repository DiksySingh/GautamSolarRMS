const {adminSignUp, getCustomer, updateCustomer, deleteCustomer} = require("../controllers/adminController");
const {getInverterData, getPlantOverview} = require("../controllers/deviceDataController")
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin/signup",adminSignUp);
router.get("/admin/get-device-data", getInverterData);
router.get("/admin/get-plant-overview", getPlantOverview);
router.get("/admin/fetch-all-customers", getCustomer);
router.patch("/admin/update-customer", updateCustomer);
router.delete("/admin/delete-customer", deleteCustomer);

module.exports = router;