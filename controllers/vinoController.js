const mongoose = require('mongoose');
const Vino = mongoose.model('Vino');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

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

exports.urediVino = async(req, res) => {
  const vino = await Vino.findOne({
    _id: req.params.id
  });

  res.render('uredi-vino', {
    title: `Uredi vino - "${vino.naziv}"`,
    vino
  })
}

exports.snimiUredjenoVino = async(req, res) => {
  const vino = await Vino.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Uspješno ste uredili vino <strong>${vino.naziv}</strong>!`);
  res.redirect('/');
}

exports.dodajSliku = multer(multerOptions).single('slika');

exports.resize = async(req, res, next) => {
  // check if there is no file to resize
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.slika = `${uuid.v4()}.${extension}`;
  // resize
  const slika = await jimp.read(req.file.buffer);
  const resize = slika.resize(jimp.AUTO, 800);
  const write = slika.write(`./public/images/${req.body.slika}`);
  Promise.all([resize, write]);
  next();
};

exports.snimiVino = async(req, res) => {

  const userPromise = User.findOneAndUpdate({
    _id: req.user._id
  }, {
    brojVina: req.user.brojVina + 1
  }, {
    new: true,
    runValidators: true
  }).exec();



  req.body.korisnik = req.user._id;
  const vino = new Vino(req.body);
  vino.ime = req.user.ime;

  const vinoPromise = vino.save();

  Promise.all([vinoPromise, userPromise]);

  req.flash('success', 'Uspješno ste unijeli novo vino u bazu');
  res.redirect('/');
}

exports.prikaziVina = async(req, res) => {
  const vina = await Vino.find();

  res.render('vina', {
    title: "Kolekcija Vina",
    vina
  });
}

exports.ukloniVino = async(req, res) => {

  const user = await User.findOneAndUpdate({
    _id: req.user._id
  }, {
    brojVina: req.user.brojVina - 1
  }, {
    new: true,
    runValidators: true
  }).exec();

  const vino = await Vino.findOneAndRemove({
    _id: req.params.id
  });

  req.flash('error', `Uspješno ste uklonili vino <strong>${vino.naziv}</strong> iz kataloga!`);
  res.redirect('/');
}

exports.pretragaPoZemljama = async(req, res) => {
  const zemlja = req.params.zemlja;
  const zemljaPromise = Vino.listaZemalja();
  const vinoPromise = Vino.find({
    zemlja: zemlja
  });
  const [zemlje, vina] = await Promise.all([zemljaPromise, vinoPromise]);
  res.render('zemlje', {
    title: 'Pregled vina po zemljama',
    zemlja,
    zemlje,
    vina
  });

};

exports.pretragaPoVrstama = async(req, res) => {
  const vrsta = req.params.vrsta;
  const vrstaPromise = Vino.popisVrsti();
  const vinoPromise = Vino.find({
    vrsta
  });
  const [vrste, vina] = await Promise.all([vrstaPromise, vinoPromise]);
  res.render('vrste', {
    title: 'Pregled vina po vrstama',
    vrsta,
    vrste,
    vina
  });
};

exports.pretragaPoKorisnicima = async(req, res) => {
  const korisnik = req.params.korisnik;
  const korisnikPromise = Vino.popisKorisnika();
  const vinoPromise = Vino.find({
    ime: korisnik
  });
  const [korisnici, vina] = await Promise.all([korisnikPromise, vinoPromise]);
  res.render('korisnici', {
    title: 'Pregled vina po korisnicima',
    korisnik,
    korisnici,
    vina
  });
};

exports.galerija = (req, res) => {
  res.render('galerija', {
    title: 'Galerija fotografija'
  });
}