// import '../vendors/materialize/js/materialize.min.js'
// import '../../node_modules/materialize-css/dist/css/materialize.min.css'
import '../sass/style.scss'




$(document).ready(function () {

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

  $('.carousel.carousel-slider').carousel({
    
    indicators: true
  });


  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,

  });

});