const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

class UserController {
    static loginUser(req, res) {
        let { msg } = req.query;res.render('auth-page/loginForm', {msg});
    }

    static regisForm(req, res) {
        let { msg, path } = req.query;

        res.render('auth-page/regisUser', {msg, path});
    }

    static async postRegis(req, res) {
        try {
            let { email, name, password } = req.body;
            
            await User.create({ email, name, password });

            res.redirect("/login");
            
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let msg = error.errors.map(el => el.message);
                let path = error.errors.map(el => el.path);

                res.redirect(`/register?msg=${msg}&path=${path}`);

            } else {
                res.send(error);

            }
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
                    req.session.role = user.role

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


module.exports = UserController;