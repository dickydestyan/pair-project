const express = require('express');
const UserController = require('../controllers/userController');
const Controller = require('../controllers/controller');
const airline = require('./airlines');
const router = express.Router();


// logout
router.get("/register", UserController.regisForm);

router.post("/register", UserController.postRegis);

// login
router.get("/login", UserController.loginUser);

router.post("/login", UserController.postLogin)

// logout
router.get("/logout", UserController.logoutUser);


let isLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/login?msg=Please login first!");

    } else {
        next();
    }
};

let isAdmin = (req, res, next) => {
    if (req.session.userId && req.session.role !== "admin") {
        res.redirect("/login?msg=Please login first!");

    } else {
        next();
    }
};

// router.use(isLogin)


router.get("/", Controller.homepage);

router.use("/airlines", airline)


module.exports = router;