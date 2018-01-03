const mongoose = require('mongoose');

exports.getIndex = (req, res) => {
    res.render('index', {
      title: 'Ovo je Vinski Index'
    });
  };