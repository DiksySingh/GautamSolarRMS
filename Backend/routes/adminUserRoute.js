const {adminSignUp} = require("../controllers/adminController");
const {userSignup, Login, Logout} = require("../controllers/userController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin-signup", adminSignUp);
router.post("/user-signup", userSignup);
router.post("/login", Login);
//router.post('/logout', Logout);
//router.post("/", userVerification);
//userVerification(['admin', 'customer'])
module.exports = router;