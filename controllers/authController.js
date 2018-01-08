const passport = require('passport');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Greška pri prijavljivanju!',
    successRedirect: '/',
    successFlash: 'Uspješno ste se prijavili. Dobrodošli na "Moju Kolekciju Vina"!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Uspješno ste se odjavili! Doviđenja :)');
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    } else {
        req.flash('error', 'Morate biti prijavljeni da biste dodali novo vino!');
        res.redirect('login');
    }
}