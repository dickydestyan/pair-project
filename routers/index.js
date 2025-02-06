<<<<<<< HEAD
const Controller = require('../controllers/controller');

const router = require('express').Router()



router.get('/', );
router.get('/user/add',);
router.get('/user/add',);
router.post('/user/add', );
router.get('/user/:id/delet', )
router.get('/user/:id', )
router.get('/user/:id/edit', )
router.post('/user/:id/edit', )













module.exports = router
=======
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
>>>>>>> 3910af85b2b81f947ed2d880cd34b8c9135e4597
