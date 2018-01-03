const mongoose = require('mongoose');

exports.getIndex = async (req, res) => {
  await res.render('index', {
    title: 'Ovo je Vinski Index'
  });
};
