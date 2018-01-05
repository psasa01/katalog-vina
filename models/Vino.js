const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
require('mongoose-strip-html-tags')(mongoose);

const vinoSchema = new mongoose.Schema({
    naziv: {
        type: String,
        required: 'Morate unijeti naziv vina!',
        trim: true,
        stripHtmlTags: true

    },
    slug: {
        type: String,
        stripHtmlTags: true
    },
    godina: {
        type: Number,
        trim: true,
        stripHtmlTags: true
    },
    proizvodjac: {
        type: String,
        required: 'Morate unijeti naziv proizvodjaća!',
        trim: true,
        stripHtmlTags: true
    },
    vrsta: {
        type: String,
        required: 'Morate unijeti vrstu vina',
        trim: true,
        stripHtmlTags: true
    },
    zemlja: {
        type: String,
        required: 'Morate unijeti zemlju porijekla',
        trim: true,
        stripHtmlTags: true
    },
    slika: {
        type: String,
    },
    alkohol: {
        type: String
    },
    datum: {
        type: Date,
        default: Date.now
    }
});

// presave slug, prober function because we need to bind 'this'!!!
vinoSchema.pre('save', function (next) {
    // if no changes, exit (return)
    if (!this.isModified('naziv')) {
        return next(); // stop function 
    }
    this.slug = slug(this.naziv);
    next();
    // make unique slugs
});

module.exports = mongoose.model('Vino', vinoSchema);