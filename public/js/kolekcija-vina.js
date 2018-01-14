// import '../vendors/materialize/js/materialize.min.js'
// import '../../node_modules/materialize-css/dist/css/materialize.min.css'
// import '../unitegallery/css/unite-gallery.css';

import '../sass/style.scss'

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import $ from 'jquery';
// import 'imports?jQuery=jquery!owl.carousel';



// import '../unitegallery/js/jquery-11.0.min.js';
// import '../unitegallery/js/unitegallery.min.js';
// import '../unitegallery/themes/tiles/ug-theme-tiles.js';





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
    gallery_skin: "alexis", //it's the default skin
    slider_bullets_skin: "alexis" //example how to change only skin for slider bullets
  });

  // $('.carousel.carousel-slider').carousel({
  //   fullWidth: true,
  //   indicators: true
  // });


  // $('.owl-carousel').owlCarousel({
  //   items: 2,
  //   stagePadding: 50,
  //   merge: true,
  //   autoWidth: true,
  //   mergeFit: true,
  //   nav: true,
  //   dots: true,
  //   stageDrag: false
  // });


  $('.button-collapse').sidenav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,

  });

});