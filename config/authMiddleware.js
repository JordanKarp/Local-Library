module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
};

module.exports.isAdmin = (req, res, next) => {
    // TODO
}
module.exports.isCurrentUser = (req, res, next) => {
    // TODO
}