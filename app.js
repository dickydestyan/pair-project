const express = require('express');
const router = require('./routers');
const app = express();
const port = 3434;
const session = require('express-session');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'bingung mau apa',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true 
    }
}))

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})