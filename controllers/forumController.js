const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

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
    // post.sadrzaj = pug;
    await post.save();

    req.flash('success', 'Uspješno ste dodali novu temu!')

    res.redirect('/forum');
}

exports.prikaziPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.render('single-post', {
        title: post.naslov,
        post
    })
}