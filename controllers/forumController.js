const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

exports.forum = async (req, res) => {
    const posts = await Post.find();
    res.render('forum', {
        title: 'Moja Kolekcija Vina - Forum',
        posts
    })
}

exports.novaTema = (req, res) => {
    res.render('nova-tema', {
        title: 'Moja Kolekcija Vina - Nova Tema'
    })
}

exports.postaviNovuTemu = async (req, res) => {

    req.body.pokrenuo = req.user._id;

    const post = new Post(req.body);
    post.ime = req.user.ime;
    await post.save();

    req.flash('Uspješno ste dodali novu temu!')

    res.redirect('/forum');
}