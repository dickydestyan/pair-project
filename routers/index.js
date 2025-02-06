const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();


// logout
router.get("/register", Controller.regisForm);

router.post("/register", Controller.postRegis);

// login
router.get("/login", Controller.loginUser);

router.post("/login", Controller.postLogin)

// logout
router.get("/logout", Controller.logoutUser);


router.use((req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/login?msg=Please login first!");

    } else {
        next();
    }
})


router.get("/", (req, res) => {
    res.render('home');
});

module.exports = router;