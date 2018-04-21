const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const _ = require('lodash');

// const html2pug = require('html2pug')



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

    // const html = req.body.sadrzaj;
    // const pug = html2pug(html, { tabs: true })

    req.body.pokrenuo = req.user._id;


    const post = new Post(req.body);
    post.ime = req.user.ime;
    post.avatar = req.user.slika;
    // post.sadrzaj = pug;
    await post.save();

    res.redirect('/forum');
}

exports.prikaziPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    // console.log(post);
    res.render('single-post', {
        title: post.naslov,
        post
    })
}

exports.posaljiOdgovor = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const odgovor = post.odgovor;

    odgovor.push({
        body: req.body.odgovor,
        ime: req.user.ime,
        korisnik: req.user._id,
        avatar: req.user.slika
    });

    await post.save();
    res.redirect('back');
}

exports.obrisiTemu = async (req, res) => {
    const loggedUser = req.user;
    const postToDelete = await Post.findById(req.params.id);

    if (loggedUser && loggedUser._id.toString() === postToDelete.pokrenuo.toString() || loggedUser.level === 1) {
        const post = await Post.findOneAndRemove({
            _id: req.params.id
        });

        res.redirect('back');
    } else {
        req.flash('error', 'Nemate pravo obrisati temu!');
        res.redirect('/');
    }
}

exports.obrisiOdgovor = async (req, res) => {
    const loggedUser = req.user;
    const postZaObrisatiOdgovor = await Post.findById(req.params.postId);
    const array = postZaObrisatiOdgovor.odgovor;

    const obrisano = _.remove(array, (e) => {
        return e._id != req.params.id;
    });

    await Post.findOneAndUpdate({
        _id: req.params.postId
    }, { odgovor: obrisano }, {
            new: true
        }).exec();

    res.redirect(`back`);
}