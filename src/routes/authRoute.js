const express = require("express");
const AuthController = require("../controllers/authController");
const app = express();

app.use(express.json());
const router = express.Router();

const { userSignup, updateUserPassword, userLogin } = AuthController;
router.route("/signup").post(userSignup);

router.route("/forgotpassword").put(updateUserPassword);

router.route("/login").post(userLogin);

module.exports = router;
