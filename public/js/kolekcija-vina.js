// import $ from 'jquery'
// import 'materialize-css/dist/js/materialize.min.js'
// import 'materialize-css/dist/css/materialize.min.css'
// import 'unitegallery/dist/css/unite-gallery.css';
// import 'unitegallery/dist/js/jquery-11.0.min.js';
// import 'unitegallery/dist/js/unitegallery.min.js';
// import 'unitegallery/dist/themes/tiles/ug-theme-tiles.js';
// import 'masonry-layout/dist/masonry.pkgd.min'
// import 'imagesloaded/imagesloaded.pkgd.min'

import 'normalize-css/normalize.css';
import '../sass/style.scss'

// Sliphover

$('#sliphover').sliphover({
  caption: 'data-caption',
  backgroundColor: 'rgba(0,0,0,.175)',
  fontColor: '#ddd',
  verticalMiddle: false,
  textAlign: 'left',
  withLink: true,
  target: '.sliphover-target'
});



$(document).ready(function () {

  // zatvori flash
  // http://activelab.io/code-snippets/use-jquery-to-hide-a-div-when-the-user-clicks-outside-of-it
  $(document).mouseup((e) => {
    var subject = $('.flash');

    if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
      subject.remove();
    }
  });


  if ($('.flash').is(':visible')) {
    setTimeout(() => {
      $('.flash').fadeOut(600);
    }, 1900)
  }

  // $('.infinite-scr').infiniteScroll({
  //   // options
  //   path: '/{{#}}',
  //   append: '#sliphover',
  //   history: false
  // });


  // Carousel on index
  // $('.carousel.carousel-slider').carousel({
  //   fullWidth: true,
  //   duration: 600
  // });
  // autoplay()
  // function autoplay() {
  //   $('.carousel').carousel('next');
  //   setTimeout(autoplay, 6000);
  // }


  // var simplemde = new SimpleMDE({ element: $("#sadrzaj")[0] });

  // $('#sadrzaj').materialnote({      
  //   height: 300
  // });

  function process() {
    var textareaText = $('#sadrzaj').val();
    // $('#output1').html(textareaText);

    textareaText = textareaText.replace(/\r?\n/g, '<br />');
    // $('#output2').html(textareaText);
  }


  $("#formValidate").validate({
    rules: {
      naslov: {
        required: true
      },
      sadrzaj: {
        required: true
      }
    },
    //For custom messages
    messages: {
      naslov: {
        required: "Morate unijeti naslov teme"
      },
      sadrzaj: "Tema ne smije biti prazna!",
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  $("#vinoFormValidate").validate({
    rules: {
      naziv: {
        required: true
      },
      proizvodjac: {
        required: true
      },
      zemlja: {
        required: true
      },
      vrsta: {
        required: true
      }

    },
    //For custom messages
    messages: {
      naziv: "Morate unijeti naziv vina",
      proizvodjac: "Morate unijeti ime proizvođača",
      zemlja: "Morate unijeti zemlju porijekla",
      vrsta: "Morate unijeti vrstu vina"
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  tippy('.tooltip', {
    delay: 100,
    arrow: true,
    arrowType: 'round',
    size: 'large',
    duration: 250,
    inertia: true,
    animation: 'scale',
    placement: 'left',
    theme: 'dark translucent'
  });

  $('#prikaz-forme').click(function () {
    $('#dodaj-sliku-forma').toggleClass('show');
  });

  $('.slika-trigger').on('click', () => {
    $('.slika-fullscreen').css('display', 'block');
    $('.modal').addClass('modal-full');
  })

  $('.slika-fullscreen').on('click', () => {
    $('.slika-fullscreen').css('display', 'none');
    $('.modal').removeClass('modal-full');
  }
  );

  $('#slika-close').on('click', () => {
    $('.slika-fullscreen').css('display', 'none');
    $('.modal').removeClass('modal-full');
  })

  $('#home-button').floatingActionButton({
    hoverEnabled: false,
    direction: 'top'
  });

  $('.button-fab-single').floatingActionButton({
    hoverEnabled: false,
    direction: 'left'
  });

  $('.button-edit').floatingActionButton({
    hoverEnabled: false,
    direction: 'left'
  });


  $('.tooltipped').tooltip({
    outDuration: 20,
    exitDelay: 20,
    position: 'top'
  });
  $('.sidenav').sidenav();
  $('.modal').modal({
    onCloseEnd: () => {
      $('.slika-fullscreen').css('display', 'none');
      $('.modal').removeClass('modal-full');

    }
  });
  $('.dropdown-trigger').dropdown({
    hover: true,
    belowOrigin: true,

  });





  $('.button-collapse').sidenav({
    menuWidth: 300,
    edge: 'right',
    closeOnClick: true,
    draggable: true,
  });


  // Unite gallery

  $('#gallery').unitegallery({
    gallery_skin: "alexis",
    slider_bullets_skin: "alexis"
  });


  if ($(window).width() < 960) {
    $('.grid-item').hover(function () {
      $(this).children().addClass('icon-izbrisi-show', 2000, 'swing');
    }, (function () {
      $(this).children().removeClass('icon-izbrisi-show', 2000, 'swing');
    }));
  }





});

function showSpinner() {
  $('#spinner').css('display', 'block');
}

// Algolia search
const client = algoliasearch('I2MFF9YJMM', 'e82b335c522c7b70472f25e370a72a6e');
const index = client.initIndex('vinoSchema');

//initialize autocomplete on search input (ID selector must match)
autocomplete('#aa-search-input',
  { hint: false }, {
    source: autocomplete.sources.hits(index, { hitsPerPage: 15 }),
    //value to be displayed in input control after user's suggestion selection
    displayKey: 'name',
    //hash of templates used when rendering dataset
    templates: {
      //'suggestion' templating function used to render a single suggestion
      suggestion: function (suggestion) {
        // console.log(suggestion);
        return `
                  <span style="line-height: 1.8em;"><a style="width: 130% !important; font-size: 1em;" class="anchor-search brown-text" href="/vino/${suggestion.objectID}">${suggestion._highlightResult.naziv.value}</a></span>
                  `;
      }
    }
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