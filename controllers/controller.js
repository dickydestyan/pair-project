const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

class Controller {
    static loginUser(req, res) {
        let { msg } = req.query;res.render('auth-page/loginForm', {msg});
    }

    static regisForm(req, res) {
        res.render('auth-page/regisUser')
    }

    static async postRegis(req, res) {
        try {
            let { email, name, password } = req.body;
            
            await User.create({ email, name, password });

            res.redirect("/login");
            
        } catch (error) {
            res.send(error);
        }
    }

    static async postLogin(req, res) {
        try {
            let { email, password } = req.body;

            let user = await User.findOne({
                where: { email }
            })

            if (user) {
                let isValid = await bcrypt.compare(password, user.password);

                
                if (isValid) {
                    req.session.userId = user.id

                    res.redirect("/");

                } else {
                    res.redirect(`/login?msg=Invalid Email/Password`);
                }

            } else {
                res.redirect(`/login?msg=Invalid Email/Password`);
            }
            
        } catch (error) {
            res.send(error);
        }
    }

    static async logoutUser (req, res) {
        await req.session.destroy(err => {
            if (err) res.send(err);
            else res.redirect("/login");
        });
    }
}


module.exports = Controller;