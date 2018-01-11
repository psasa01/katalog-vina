const mongoose = require('mongoose');
const User = mongoose.model('User');
const Vino = mongoose.model('Vino');
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
    const userFind = await User.findOne({
        email: req.body.email
    });
    if (userFind) {
        req.flash('error', 'Korisnik s navedenom email adresom već postoji!');
        res.redirect('/register');

    } else {
        const user = new User({
            email: req.body.email,
            ime: req.body.name
        });

        const register = promisify(User.register, User);
        await register(user, req.body.password);

        next();
    }
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

exports.adminPanel = async(req, res) => {
    const korisnici = await User.find().sort([
        ['level', 'ascending']
    ]);



    res.render('admin', {
        title: 'Admin Panel',
        korisnici
    });
};

exports.oduzmiAdminPrava = async(req, res) => {
    const user = await User.findOneAndUpdate({
        _id: req.params.id
    }, {
        level: 30
    }, {
        new: true,
        runValidators: true
    });
    req.flash('success', `Uspješno ste oduzeli administratorska prava korisniku ${user.ime}`);
    res.redirect('back');
}

exports.dodijeliAdminPrava = async(req, res) => {
    const user = await User.findOneAndUpdate({
        _id: req.params.id
    }, {
        level: 10
    }, {
        new: true,
        runValidators: true
    });
    req.flash('success', `Uspješno ste dodjelili administratorska prava korisniku ${user.ime}`);
    res.redirect('back');
}