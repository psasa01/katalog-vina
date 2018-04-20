const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({

    naslov: {
        type: String,
        required: 'Tema mora imati naslov!'
    },
    sadrzaj: {
        type: String,
        required: 'Tema ne može biti prazna!'
    },
    pokrenuo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: {
            select: 'ime'
        }
    },
    ime: {
        type: String
    },
    avatar: {
        type: String
    },
    datum: {
        type: Date,
        default: Date.now
    },
    odgovor: [{
        body: {
            type: String,
            required: 'Odgovor ne može biti prazan!'
        },
        ime: {
            type: String
        },
        avatar: {
            type: String
        },
        korisnik: {
            type: String
        },
        datum: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model('Post', postSchema);