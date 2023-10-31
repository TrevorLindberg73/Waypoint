// GET /user/login: Render the login page
exports.showlog = (req, res, next) => {
    res.render('./user/login');
}

// GET /user/register: Render the register page
exports.showregister = (req, res, next) => {
    res.render('./user/register');
}