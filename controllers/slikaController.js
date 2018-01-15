const mongoose = require('mongoose');
const Slika = mongoose.model('Slika');
const multer = require('multer');
const jimp = require('jimp');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({
                message: 'Taj tip datoteke nije podržan!'
            });
        }
    }
};

exports.dodajSliku = multer(multerOptions).single('slika');

exports.snimiSliku = async(req, res) => {
    const slika = new Slika(req.body);
    await slika.save();

    req.flash('success', 'Uspješno ste dodali sliku u galeriju!');
    res.redirect('/galerija');

}

exports.resize400 = async(req, res, next) => {
    // check if there is no file to resize
    // console.log(req.file)
    if (!req.file) {
        return next();
    }
    const name = req.file.originalname.split('.')[0];
    const ext = req.file.originalname.split('.')[1];
    req.body.thumb = `${name}.${ext}`;
    // resize
    const slika = await jimp.read(req.file.buffer);
    const resize = slika.resize(jimp.AUTO, 400);
    const write = slika.write(`./public/images/thumbs/thumb_${req.body.thumb}`);
    Promise.all([resize, write]);
    next();
};

exports.resize1200 = async(req, res, next) => {
    // check if there is no file to resize
    // console.log(req.file)
    if (!req.file) {
        return next();
    }
    const name = req.file.originalname.split('.')[0];
    const ext = req.file.originalname.split('.')[1];
    req.body.big = `${name}.${ext}`;
    // resize
    const slika = await jimp.read(req.file.buffer);
    const resize = slika.resize(jimp.AUTO, 1200);
    const write = slika.write(`./public/images/big/big_${req.body.big}`);
    Promise.all([resize, write]);
    next();
};

exports.galerija = async(req, res) => {
    const slike = await Slika.find();
    res.render('galerija', {
        title: 'Galerija fotografija',
        slike
    });
}