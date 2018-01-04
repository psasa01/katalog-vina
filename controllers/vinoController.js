const mongoose = require('mongoose');
const Vino = mongoose.model('Vino');

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

exports.snimiVino = async(req, res) => {
  const vino = new Vino(req.body);
  await vino.save();
  req.flash('success', 'Uspješno ste unijeli novo vino u bazu');
  res.redirect('/');

}