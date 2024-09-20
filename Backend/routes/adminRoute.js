const {adminSignUp, adminLogin} = require("../controllers/adminController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin-signup",adminSignUp);
router.post("/admin-login", adminLogin);
router.post("/", userVerification);

module.exports = router;