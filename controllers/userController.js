const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

exports.registerForm = (req, res) => {
    res.render('register', {
        title: 'Registracija'
    });
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'Morate unijeti korisničko ime!').notEmpty();
    req.checkBody('email', 'Email koji ste unijeli nažalost nije ispravan!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Morate unijeti šifru!').notEmpty();
    req.checkBody('password-potvrda', 'Morate potvrditi šifru!').notEmpty();
    req.checkBody('password-potvrda', 'Nažalost, šifre se ne podudaraju!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {
            title: 'Registracija',
            body: req.body,
            flashes: req.flash()
        });
        return; // stop
    }
    next(); // no errors
}

exports.register = async(req, res, next) => {
    const user = new User({
        email: req.body.email,
        ime: req.body.name
    });

    const register = promisify(User.register, User);
    await register(user, req.body.password);

    next();
};

exports.racun = (req, res) => {
    res.render('racun', {
        title: 'Uredi korisnički račun'
    });
};

exports.urediKorisnickiRacun = async(req, res) => {
    const updates = {
        ime: req.body.name,
        email: req.body.email
    };
    const user = await User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $set: updates
    }, {
        new: true,
        runValidators: true,
        context: 'query'
    });
    req.flash('success', `Uspješno ste promjenili podatke za korisnika: ${user.ime}`);
    res.redirect('/');
};