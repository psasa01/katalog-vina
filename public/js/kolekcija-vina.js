// import $ from 'jquery'
// import 'materialize-css/dist/js/materialize.min.js'
// import 'materialize-css/dist/css/materialize.min.css'
// import 'unitegallery/dist/css/unite-gallery.css';
// import 'unitegallery/dist/js/jquery-11.0.min.js';
// import 'unitegallery/dist/js/unitegallery.min.js';
// import 'unitegallery/dist/themes/tiles/ug-theme-tiles.js';
// import 'masonry-layout/dist/masonry.pkgd.min'
// import 'imagesloaded/imagesloaded.pkgd.min'

import '../sass/style.scss'

$(document).ready(function () {

  $('#prikaz-forme').click(function () {
    $('#dodaj-sliku-forma').toggleClass('show', 10000, 'easeOutSine');
  });



  $('.fixed-action-btn').floatingActionButton({
    hoverEnabled: false,
    direction: 'left'
  });


  $('.sidenav').sidenav();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown({
    hover: true,
    belowOrigin: true,

  });

  $('#gallery').unitegallery({
    gallery_skin: "alexis",
    slider_bullets_skin: "alexis"
  });



  $('.grid-item').hover(function () {
    $(this).children().addClass('icon-izbrisi-show', 2000, 'swing');
  }, (function () {
    $(this).children().removeClass('icon-izbrisi-show', 2000, 'swing');
  }));



  $('.button-collapse').sidenav({
    menuWidth: 300,
    edge: 'right',
    closeOnClick: true,
    draggable: true,
  });

  $('#container').sliphover({
    caption: 'data-caption'
  });


  // external js: masonry.pkgd.js, imagesloaded.pkgd.js

  // init Masonry after all images have loaded
  var $grid = $('.grid').imagesLoaded(function () {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
  });

});