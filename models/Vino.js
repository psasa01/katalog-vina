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
        type: String,
        required: 'Morate unijeti godinu berbe!',
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
    datum: {
        type: Date,
        default: Date.now
    }
});

// presave slug, prober function because we need to bind 'this'!!!
vinoSchema.pre('save', function(next) {
    // if no changes, exit (return)
    if (!this.isModified('name')) {
    return next(); // stop function 
    } 
    this.slug = slug(this.name);
    next();
    // make unique slugs
});

module.exports = mongoose.model('Vino', vinoSchema);