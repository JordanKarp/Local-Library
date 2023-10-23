const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");
const { isNotAuth } = require('../config/authMiddleware');

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect('/catalog');
});

/* GET login page. */
router.get("/login",  function (req, res) {
  res.render('login');
});

/* POST login page. */
router.post("/login", user_controller.login);


/* GET register page. */
router.get("/register", function (req, res) {
  res.render('register');
});

/* POST register page. */
router.post("/register", user_controller.register);


router.get("/logout", user_controller.logout);


module.exports = router;
