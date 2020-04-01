const { User } = require('../models/User');

let authforlikes = (req, res, next) => {
    let token = req.cookies.w_auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) {
            next()
        }else{
            req.token = token;
            req.user = user;
            next();
        }

       
    });
};

module.exports = { authforlikes };
