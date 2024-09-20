const {adminSignUp, adminLogin} = require("../controllers/adminController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/signup",adminSignUp);
router.post("/login", adminLogin);
router.post("/", userVerification);

module.exports = router;