const express = require('express');
const UserController = require('../controllers/userController');
const Controller = require('../controllers/controller');
const airline = require('./airlines');
const passenger = require('./passengers');
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



// router.use(isLogin)


router.get("/", isLogin, Controller.homepage);

router.use("/airlines", isLogin, airline);

router.use("/passengers", isLogin, passenger);

router.get('/history', Controller.showHistory)

router.get('/invoice/:TransactionId', Controller.createInvoice)


module.exports = router;