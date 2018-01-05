const mongoose = require('mongoose');
const Vino = mongoose.model('Vino');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'Taj tip datoteke nije podržan!'});
    }
  }
};



exports.getIndex = async(req, res) => {
  await res.render('index', {
    title: 'Ovo je Vinski Index'
  });
};

exports.dodajVino = (req, res) => {
  res.render('dodaj-vino', {
    title: 'Dodaj Vino'
  });
}

exports.dodajSliku = multer(multerOptions).single('slika');

exports.resize = async (req, res, next) => {
  // check if there is no file to resize
  if(!req.file) {
    next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.slika = `${uuid.v4()}.${extension}`;
  // resize
  const slika = await jimp.read(req.file.buffer);
  await slika.resize(jimp.AUTO, 800);
  await slika.write(`./public/images/${req.body.slika}`);
  next();
};

exports.snimiVino = async(req, res) => {
  const vino = new Vino(req.body);
  await vino.save();
  req.flash('success', 'Uspješno ste unijeli novo vino u bazu');
  res.redirect('/');
}

exports.prikaziVina = async (req, res) => {
  const vina = await Vino.find();
  res.render('vina', {
    title: "Kolekcija Vina",
    vina
  });
}