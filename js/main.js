$(document).ready(function() {
  mobileMenuClose();
  faqAnchor();
  prolongationBlockAnimate();
  anchorLink();
  giftAnchor();
  parallax();
  hearts();
  wishMusic();
  swiper();
  //customInput();

  // Detect ios 11_0_x affected
  // NEED TO BE UPDATED if new versions are affected
  var ua = navigator.userAgent,
    iOS = /iPad|iPhone|iPod/.test(ua),
    iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1/.test(ua);

  // ios 11 bug caret position
  if (iOS && iOS11) {

    // Add CSS class to body
    $("body").addClass("iosBugFixCaret");

  }

  partnersFormOpener();
  partnersFormOpener1();

  // promo popup
  promoPopup();

  paswwordChecker();

  // gift popup
  $('#gift-popup').modal('show');

  if ($('#watch').length > 0) {
    var els = document.querySelectorAll('.letter-arrow');
    Array.prototype.slice.call(els).forEach(function(el) {
      el.setAttribute('stroke', 'white');
      el.setAttribute('fill', 'transparent');
    })



    var SVGcrown = new Vivus('watch', {
        duration: 300,
        start: 'autostart'
      },
      /*callbackEnd,*/
      function(myVivus) {
        /*$('#watch .letter-arrow').attr('fill', 'transparent');*/
        if (myVivus.getStatus() === 'end') {
          $('#watch .letter-arrow').attr('fill', 'white');
          setTimeout(function() {
            $('#watch .letter-arrow').attr('fill', 'transparent');

          }, 3000);
          myVivus.play(-1);
        } else {
          myVivus.play(1);
        }
        /*myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1);*/
      })
  }


  $('.nav-tabs a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
  });


  $('a[data-toggle="collapse"]').click(function(e) {
    e.preventDefault();
  })
  /*$(".group1").colorbox({
      rel:'group1',
      current: "Изображение {current} из {total}"
  });*/

  lightbox.option({
    albumLabel: "Изображение %1 of %2"
  });


  navbarClose();

  // bonus slider

  $('.owl-bonus').owlCarousel({
    items: 4,
    loop: false,
    autoplay: false,
    nav: true,
    navClass: ['owl-prev disabled', 'owl-next'],
    navText: ['<svg class="icon icon-arror-left"><use xlink:href="#icon-arror-left"></use></svg>', '<svg class="icon icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg>'],
    responsive: {
      0: {
        items: 1,
        margin: 55,
        nav: true
      },
      768: {
        items: 2,
        margin: 35
      },
      1024: {
        items: 4,
        margin: 35,
        nav: false
      }
    },
    callbacks: true,
    info: true,
    onTranslated: $(this).on('translated.owl.carousel', function(e) {
      var items_per_page = e.relatedTarget.options.slideBy;
      var nav_container = e.relatedTarget.options.navContainer;
      var item_index = e.item.index;
      var item_count = e.item.count;
      var last_vis_item_index = items_per_page + item_index;
      if (last_vis_item_index === item_count) {
        $(nav_container).find('div:last').addClass('disabled');
      } else {
        $(nav_container).find('div:last').removeClass('disabled');
      }
      if (item_index != 0) {
        $(nav_container).find('div:first').removeClass('disabled');
      } else {
        $(nav_container).find('div:first').addClass('disabled');
      }
    })
  });

  $('.js-owl-questions').owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    dots: true,
    nav: true,
    navText: ['', '']
  });

  $('.owl-cpa').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 7000,
    responsive: {
      0: {
        items: 1,
        margin: 55,
        nav: true,
        navText: ['', '']
      },
      900: {
        nav: false,
        items: 2,
        margin: 55
      }
    }
  });

  $(document).on('click', '.owl-cpa .owl-item', function() {
    n = $(this).index();
    $('.owl-wrapper').trigger('owl.goTo', n);
  });


  $('.js-programms').owlCarousel({
    margin: 40,
    items: 1,
    loop: true,
    nav: true,
    dots: true,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      1024: {
        items: 2,
        dots: true,
        nav: false
      },
      1300: {
        items: 3,
        nav: true
      }
    }
  });




  $('.owl-carousel-banner').owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    margin: 0,
    autoplay: false,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        dots: true
      },
      1025: {
        dots: false,
      }
    }
  });

  $('.owl-carousel-text').owlCarousel({
    loop: true,
    dots: true,
    nav: false,
    items: 1,
    margin: 20,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      800: {
        dots: false,
        items: 2,
        nav: true
      },
      480: {
        autoplay: true
      }
    }
  });

  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    margin: 20,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    navText: ['', ''],
    dotsContainer: '#custom-dots',
    responsive: {
      0: {
        autoplay: false
      },
      480: {
        autoplay: true
      },
      800: {
        dots: false
      }
    }
  });

  owlAdvantages();


  choosePaymentMethod();

  function choosePaymentMethod() {
    $('.repayment-cases input:radio[name="repayment-choose"]').change(function() {
      $('.repayment-tab').fadeOut();
      if ($(this).is(':checked') && $(this).attr('id') == 'repayment-choose-1') {
        $('#repayment-tab-1').fadeIn();;
      } else if ($(this).is(':checked') && $(this).attr('id') == 'repayment-choose-2') {
        $('#repayment-tab-2').fadeIn();;
      }
    });
  }
  /*
  $(function() {
       jcf.replaceAll();
  });
  */


  // z-index for svg elements

  /*var svg = document.querySelector("svg");
      var rects = document.querySelectorAll(".terminal-marker");

      var i = rects.length;
      while (i--) {
          rects[i].addEventListener("mouseenter", function(e) {
              svg.appendChild(e.target);
          });
      }

  */
  $('.pgwSlideshow').pgwSlideshow();

  $("[class^=nameSlider]").each(function(i, elem) {

    var prefixSl = $(elem).text();

    var sl = $("#js-money_" + prefixSl).slider();

    $("#money-value_" + prefixSl).change(function() {
      var value = $(this).val();
      sl.slider('setValue', parseInt(value));
    });
    $("#js-money_" + prefixSl).on("slide", function(slideEvt) {
      $("#money-value_" + prefixSl).val(slideEvt.value);
      // onClickFormSlider(prefixSl);
    });
    $("#js-money_" + prefixSl).on("change", function(slideEvt) {
      $("#money-value_" + prefixSl).val(slideEvt.value.newValue);
    });
    $("#js-money_" + prefixSl).on("slideStop", function(slideEvt) {
      // анализ переключений калькулятора:
      analysisSlider(globalMoney, globalDay, prefixSl, 'money');
    });

    var sl1 = $("#js-days_" + prefixSl).slider();
    $("#day-value_" + prefixSl).change(function() {
      var defaultDay = 14;
      var value = $(this).val();
      var maxDay = $('#maxDay_' + prefixSl).val();
      var minDay = $('#minDay_' + prefixSl).val();
      maxDay = parseInt(maxDay);
      minDay = parseInt(minDay);
      var inp = sl1.slider('setValue', parseInt(value));
      if (value > maxDay || value < minDay) {
        $(this).val(defaultDay);
        sl1.slider('setValue', defaultDay);
      }
    });
    $("#js-days_" + prefixSl).on("slide", function(slideEvt) {
      $("#day-value_" + prefixSl).val(slideEvt.value);
      // onClickFormSlider(prefixSl);
    });
    $("#js-days_" + prefixSl).on("change", function(slideEvt) {
      $("#day-value_" + prefixSl).val(slideEvt.value.newValue);
    });
    $("#js-days_" + prefixSl).on("slideStop", function(slideEvt) {
      // анализ переключений калькулятора:
      analysisSlider(globalMoney, globalDay, prefixSl, 'day');
    });

  });

  // если есть Неангелы, то меняем условия:
  /*
  if ($("#div_notangels").length > 0) {

      var class_calculator_heading_top = $(".calculator-heading--top").prop('class');
      $(".calculator-heading--top").removeClass("calculator-heading--hb");
      $(".calculator-heading--top").removeClass("calculator-heading--skidka");
      $(".calculator-heading--top").addClass("calculator-heading--neangelu");

      // событие при смене слайдера-карусели:
      $(".owl-carousel-banner").on('translated.owl.carousel', function(event) {

          var item = $(".owl-item")[event.item.index];
          item = $(item).children("#div_notangels");

          if (item.length > 0) {
              $(".calculator-heading--top").removeClass("calculator-heading--hb");
              $(".calculator-heading--top").removeClass("calculator-heading--skidka");
              $(".calculator-heading--top").addClass("calculator-heading--neangelu");
          } else {
              $(".calculator-heading--top").removeClass("calculator-heading--neangelu");
              $(".calculator-heading--top").addClass(class_calculator_heading_top);
          }
      });

      reloadCred('large_main'); // запускает обновление калькулятора
  }
  */

  // если есть owl-carousel студентов, то меняем условия:
  if ($("#div_students").length > 0) {

    var class_calculator_heading_top = $(".calculator-labe-zero").prop('class');

    // событие при смене слайдера-карусели:
    $(".owl-carousel-banner").on('translated.owl.carousel', function(event) {

      var item = $(".owl-item")[event.item.index];
      item = $(item).children("#div_students");

      if (item.length > 0) {
        $(".calculator-labe-zero").addClass("hidden");
      } else {
        $(".calculator-labe-zero").removeClass("hidden");
      }
    });
  }

  // если есть элементы реструктуризации:
  if ($(".restructuring-top").length > 0) {

    // событие при нажатии на кнопку реструктуризации:
    $(".js-btn-restruct").on('click', function(event) {

      $(".restructuring-top").removeClass('hidden');
      $(".restructuring-heading.js-first").removeClass('hidden');
      $(".restructuring-wrapper.js-first").removeClass('hidden');
    });

    // событие при смене реструктуризации:
    $(".js-restruct").on('click', function(event) {

      var id = $(this).attr('data-id');

      $(".js-restruct").removeClass('active');
      $(this).addClass('active');

      $(".restructuring-heading").addClass('hidden');
      $(".restructuring-wrapper").addClass('hidden');
      $("#restructuring-heading-" + id).removeClass('hidden');
      $("#restructuring-wrapper-" + id).removeClass('hidden');
    });
  }

  $('.change-button').click(function() {
    $(this).addClass('hidden');
    $('.hidden-slider').addClass('open-slider');
  });
  $('.carousel').carousel();
  $('.js-numbers').each(function() {
    $(this).appear(function() {
      $('.js-numbers-numeral').countTo({
        onUpdate: function() {
          var val2 = document.querySelectorAll('.js-numbers-numeral');
          for (var i = 0; i < val2.length; i++) {
            var formatedNumber2 = accounting.formatNumber(val2[i].innerHTML);
            val2[i].innerHTML = formatedNumber2;
          }
          if ($('#lang')) {
            var lang = document.getElementById('lang').innerHTML;
          }

          $('#js-percent').append("<span> %</span>");
          $('#js-number-money').append("<span> грн</span>");
          if (lang == "ua") {
            $('#js-number-time').append("<span> хв</span>");
          } else if (lang == "ru") {
            $('#js-number-time').append("<span> мин</span>");
          }
        }
      });
    }, {
      accX: 0,
      accY: 0
    });
  });
  $.reject({
    reject: {
      msie7: true,
      msie8: true,
      firefox3: true,
      safari1: true,
      safari2: true,
      safari3: true,
      safari4: true,
      opera1: true,
      opera2: true,
      opera3: true,
      opera4: true,
      opera5: true,
      opera6: true,
      opera7: true,
      opera8: true,
      opera9: true,
      opera10: true,
      opera11: true,
      opera12: true,
      opera13: true,
      opera14: true,
      opera15: true,
      opera16: true,
      opera17: true,
      opera18: true,
      opera19: true,
      opera20: true,
      opera21: true
    }
  });
  $('#js-change').click(function() {
    $('.form-credit--result').css({
      'display': 'none'
    });
    $('.small-slider-holder').css({
      'display': 'block'
    });
  });
  $('.btn-save').click(function() {
    $('.small-slider-holder').css({
      'display': 'none'
    });
    $('.form-credit--result').css({
      'display': 'block'
    });
  });
  $(function($) {
    $("#card-number").mask("9999 9999 9999 9999", {
      autoclear: false
    });
    $("#card-number1").mask("9999 9999 9999 9999", {
      autoclear: false
    });
    $("#card-number2").mask("9999 9999 9999 9999", {
      autoclear: false
    });
    $("#card-number3").mask("9999 9999 9999 9999", {
      autoclear: false
    });
    $("#phone").mask("+38099 999 9999", {
      autoclear: false
    });
    $('[type="tel"]').mask("+38099 999 9999", {
      autoclear: false
    });
    $(".gift-section input[type='tel']").mask("+38099 999 9999", {
      autoclear: false
    });
    $('#login').mask("+38099 999 9999", {
      autoclear: false
    });
    $("#tel1").mask("+38999 999 9999", {
      autoclear: false
    });
    $("#work_tell").mask("+38999 999 9999", {
      autoclear: false
    });
    $("#tel2").mask("+38999 999 9999", {
      autoclear: false
    });
    $("#second-phone").mask("+38 999 999 9999", {
      autoclear: false
    });
    $("#inn").mask("9999999999", {
      autoclear: false
    });
    $("#passport").mask("aa999999", {
      autoclear: false
    });
    $("#passportSeries").mask("aa", {
      autoclear: false
    });
    $("#passportNumber").mask("999999", {
      autoclear: false
    });
    $("#passportReestr").mask("99999999-99999", {
      autoclear: false
    });
    $("#passportNumberDoc").mask("999999999", {
      autoclear: false
    });
    $("#passportOld").mask("aa999999", {
      autoclear: false
    });
    $("#colleague-phone").mask("+38099 999 9999", {
      placeholder: " "
    });
    $("#js-number-card").mask("9999 9999 9999 9999", {
      placeholder: " "
    });
    $("#js-cvv").mask("999", {
      placeholder: " "
    });
    $("#sms-code").mask("999999");
    $("#GrossMonthlyIncome").mask("9?99999999", {
      placeholder: " "
    });
    $("#Apartment").mask("9?999", {
      placeholder: " "
    });
    $("#fact_Apartment").mask("9?999", {
      placeholder: " "
    });
    $('#wayforpay-card').mask("9999 9999 9999 9999");
    $('#wayforpay-date').mask("99");
    $('#wayforpay-date1').mask("99");
    $('#wayforpay-cvv').mask("999");

    $('.js-input-card').mask("9999 9999 9999 9999");
    $('.js-input-time').mask("99/99");
    $('.js-input-cvv').mask("999");
  });
  if ($.browser.mozilla) {
    if ($.browser.version < '34') {
      $('#old-browser').modal('show');
    }
  }
  $('input, textarea').placeholder();
  switch (document.getElementById("lang").innerHTML) {
    case "ru":
      titleSelect = 'Выберите';
      titleSelectDateDay = "дд"
      titleSelectDateMonth = "мм"
      titleSelectDateYear = "гг"
      break;
    case "ua":
      titleSelect = 'Виберіть';
      titleSelectDateDay = "дд"
      titleSelectDateMonth = "мм"
      titleSelectDateYear = "рр"
      break
    case "en":
      titleSelect = 'Select';
      break
    default:
      titleSelect = 'Выберите';
  }
  var title = document.querySelectorAll('.filter-option');
  for (i = 0; i < title.length; i++) {
    if (title[i] === 'Выберите' || title[i] === 'Виберіть') {
      $('.filter-option').addClass('filter-gray');
    }
  }
  $('.selectpicker').selectpicker({
    title: titleSelect,
    dropupAuto: false
  });
  $('.selectpicker-date-day').selectpicker({
    title: titleSelectDateDay,
    dropupAuto: false
  });
  $('.selectpicker-date-month').selectpicker({
    title: titleSelectDateMonth,
    dropupAuto: false
  });
  $('.selectpicker-date-year').selectpicker({
    title: titleSelectDateYear,
    dropupAuto: false
  });
  // $('#language').selectpicker({});
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('.selectpicker').selectpicker('mobile');
  }
  $('.selectpicker').selectpicker('refresh');
  $('#js-save').click(function() {
    $('.btn-wr').removeClass('btn-wr--save');
    $('.form-slider').fadeOut();
    $('.form-change').removeClass('hidden');
  });
  $('.form-text').on('keypress', function() {
    var that = this;
    setTimeout(function() {
      var res = /[^ІіЇїЄєЁёҐґа-яА-Я0-9 - ` , . " "]/g.exec(that.value);
      that.value = that.value.replace(res, '');
    }, 0);
  });
  $('.form-number').on('keypress', function() {
    var that = this;
    setTimeout(function() {
      var res = /\D+/g.exec(that.value);
      that.value = that.value.replace(/[^\d\.]/g, '');
      that.value = that.value.replace(/\..*\./g, '');
      that.value = that.value.replace(/(?:\...).+/g, '');
    }, 0);
  });

  // people with credits popups
  randomId();

  // share-popup

  sharePopupShow();
  sharePopupClose();

});
$('#code-modal').on('shown.bs.modal', function() {
  $('#sms-code').focus()
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




function randomId() {
  var randomMin = 1,
    randomMax = 19;
  var random1 = getRandomInt(randomMin, randomMax);

  var id_item1 = "item-" + random1;

  for (i = randomMin; i <= randomMax; i++) {
    if (i != random1) {
      $('#item-' + i).removeClass('active');
    } else {
      setTimeout(function() {
        $('#item-' + random1).addClass('active');
        setTimeout(function() {
          randomId();
        }, 5000);
      }, 45000);
    }
  }
}


/*
$(document).ready(function() {

    $(document).mousemove(function(e) {

        if (e.pageY <= 2) {

            // Launch MODAL BOX
            $('#close-window').modal('show');
        }

    });

});*/

$(window).load(function() {
  setTimeout(function() {
    $('#close-window').modal('show');
  }, 50000);
});









$('.help-info').on('touchstart', function(e) {
  'use strict';
  var link = $(this);
  if (link.hasClass('hover')) {
    return true;
  } else {
    link.addClass('hover');
    $('a.taphover').not(this).removeClass('hover');
    e.preventDefault();
    return false;
  }
});
$('#js_edit-1').on("click", function(e) {
  e.preventDefault();
  var parent = $(this).closest('.personal-user--data');
  parent.find('.input-disabled').removeClass('input-disabled').removeAttr("readonly").removeClass("disabled").removeAttr("disabled");
  $('#personal-data .dropdown-toggle').removeClass("disabled");
  $(this).addClass('hidden');
  var sib = $('.personal-table-edit').siblings();
  $('#js_save-1').removeClass('hidden');
  $('#js_save-1').removeClass('hidden');
  $('#js_cancel-1').removeClass('hidden');
  var inp = parent.find('input').val();
});
$('#js_save-1').on("click", function(e) {
  var parent = $(this).closest('.personal-user--data');
  var inp = parent.find('input');
  jQuery.each(inp, function(i, val) {
    var newVal = $(this).val();
    $(this).attr('value', newVal);
  })
});
$('#js_edit-2').on("click", function(e) {
  e.preventDefault();
  var parent = $(this).closest('.personal-user--data');
  parent.find('.input-disabled').removeClass('input-disabled').removeAttr("readonly").removeClass("disabled").removeAttr("disabled");
  $('#employment .dropdown-toggle').removeClass("disabled");
  $(this).addClass('hidden');
  var sib = $('.personal-table-edit').siblings();
  $('#js_edit-2').addClass('hidden');
  $('#js_save-2').removeClass('hidden');
  $('#js_cancel-2').removeClass('hidden');
  var inp = parent.find('input').val();
});
$('#js_save-2').on("click", function(e) {
  var parent = $(this).closest('.personal-user--data');
  var inp = parent.find('input');
  jQuery.each(inp, function(i, val) {
    var newVal = $(this).val();
    $(this).attr('value', newVal);
  })
});
var val = document.querySelectorAll('.format-number');
for (var i = 0; i < val.length; i++) {
  var formatedNumber = accounting.formatNumber(val[i].innerHTML);
  val[i].innerHTML = formatedNumber;
}

function windowHeight() {
  var wh = document.documentElement;
  return self.innerHeight || (wh && wh.clientHeight) || document.body.clientHeight;
}

function scrollBarHeight() {
  var wHeight = windowHeight();
  var hHeight = $('.header').outerHeight();
  var sidebarHeight = wHeight - hHeight;
  $('.fixed-bar').css({
    'max-height': sidebarHeight + 'px',
  });
}




$(window).resize(function() {
  if ($(window).width() > 1025) {
    $(".fixed-bar").stick_in_parent({
      offset_top: 100
    })
  }

  menuOverflow();
  stickyCalcHeight();
  $('.btn-authorize--get').click(function() {

    $('.sticky-calc').addClass('active');

    stickyCalcHeight();

    $(this).attr('disabled', 'disabled');
  });


  $('.js-calc-popup').click(function() {
    $('.sticky-calc').removeClass('active');
    $('.header').css('top', '0px');
    $('.btn-authorize--get').removeAttr('disabled');
  });




  if ($(window).width() < 820) {
    $('.js-advantages-slider').owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      navText: ['', '']
    });
  }

});
$(document).ready(function() {
  var wHeight = windowHeight();
  var hHeight = $('.header').outerHeight();
  var sidebarHeight = wHeight - hHeight;
  var howHeight = $('.js-how').outerHeight();



  if ($(window).width() > 1025) {
    $(".fixed-bar").stick_in_parent({
      offset_top: 100
    })
  }


  if ($(window).width() < 820) {
    $('.js-advantages-slider').owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      navText: ['', '']
    });
  }



});
$('.modal-info--close').on("click", function(e) {
  $('#js-top-credit').removeClass('in');
});
if ($('.js-back-to-top').length) {
  var scrollTrigger = 100,
    backToTop = function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $('.js-back-to-top').addClass('show');
      } else {
        $('.js-back-to-top').removeClass('show');
      }
    };
  backToTop();
  $(window).on('scroll', function() {
    backToTop();
  });
  $('.js-back-to-top').on('click', function(e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 700);
  });
}
$(document).ready(function() {
  $('.numbers').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.terminal-wrapper').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.advantages').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.how-it-work').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.city-images').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.city-modes').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.banks').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });
  $('.container-security').viewportChecker({
    classToAdd: 'animated',
    offset: 100
  });




  // snap svg form map markers

});
$('input.form-capitalize').keyup(function() {
  var firstLetter = document.querySelectorAll('input.form-capitalize');
  for (i = 0; i < firstLetter.length; i++) {
    var val;
    if (firstLetter[i].value) {
      val = firstLetter[i].value.charAt(0).toUpperCase() + firstLetter[i].value.substr(1);
      firstLetter[i].value = val;
    }
  }
})
$('.fixed-bar').width($('.col-lg-3').width());
$(window).resize(function() {
  $('.fixed-bar').width($('.col-lg-3').width());
});



$(document).ready(function() {
  $('.js-seo').jScrollPane({
    arrowScrollOnHover: true
  });
  /*if ($(window).width() < 767) {
      $('.envelop-letter').jScrollPane({
          arrowScrollOnHover: true
      });
  }*/


  new ScrollFlow();
});
$('#html5-videos').lightGallery({
  selector: '.item',
  width: '80%',
  pager: false,
  byline: 0,
  badge: 0
});



function fHowHeight() {
  var howHeight = $('.js-how').outerHeight();
}



$(document).ready(function() {
  /*var myHash = location.hash;
  var position1 = myHash.indexOf('#');
  var id_selector1 = myHash.substr(position1);
  if (id_selector1) {
      $('.panel-heading').children('a').addClass('collapsed').attr('aria-expanded', 'false');
      $('.panel-heading').closest('.panel-heading').siblings('.collapse').removeClass('in');
      $(id_selector1).children('.collapsed').removeClass('collapsed').attr('aria-expanded', 'true');
      $(id_selector1).closest('.panel-heading').siblings('.collapse').addClass('in');
  }
  var top_pos = $('.header').outerHeight();
  var header_height = top_pos;
  if (id_selector1) {
      $('html, body').animate({
          scrollTop: ($(id_selector1).offset().top - header_height)
      }, 1200);
  }
  return false;*/

  $('._orinationLeft_3O .button_1O').css('margin-bottom', '65!important');
});






$(document).ready(function() {

  toggleText();
  // neangelu cities
  chooseFromSelect();

  // скрытие элемнтов
  overflowBlock();

  menuOverflow();
  $("#numbers-play").on({
    click: function() {
      $(this).hide();
      $(this).closest('.iframe-relative').children('.numbers-gif').hide();
      $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
  });
  $("#numbers-play-1").on({
    click: function() {
      $(this).hide();
      $(this).closest('.iframe-relative').children('.numbers-gif').hide();
      $('#promo1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
  });



  $(".issue-play--holder").on({
    click: function() {
      $(this).hide();
      $(this).closest('.issue-video').children('.numbers-gif').hide();
      $('.issue-step--holder').show();
      $('.issue-list').addClass('issue-hidden');
      $('.issue-step--holder').addClass('issue-visible');
      $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
  });
  $('.issue-step--holder').click(function() {
    $('.issue-list').removeClass('issue-hidden');
    $(this).hide();
    $(this).closest('.issue-video').children('.numbers-gif').show();
    $(".issue-play--holder").show();
    $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  });
  $(".issue-play--holder").on({
    click: function() {
      $(this).hide();
      $(this).closest('.iframe-relative').children('.numbers-gif').hide();
      $('#promo1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
  });

  $('.modal').on('hidden.bs.modal', function(e) {
    $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    $('#promo2')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  });



  $('.btn-user-close').click(function() {
    $('.info-user').removeClass('active');
  });

  $('.btn-authorize--get').click(function() {
    $('.sticky-calc').addClass('active');
    stickyCalcHeight();
    $(this).attr('disabled', 'disabled');
  });



  $('.js-calc-popup').click(function() {
    $('.sticky-calc').removeClass('active');
    $('.header').css('top', '0px');
    $('.btn-authorize--get').removeAttr('disabled');
  });

  $('.js_AnotherNumber').click(function() {
    onClickAnotherNumber(); // Click кнопки "Ввести другой номер"
  });

  $('#autocomplete').click(function() {
    $('.js-address').removeClass('hidden');
  });

  $('#buttonLogin').click(function() {
    onClickLogin(); // Click кнопки "Войти" в момент входа в ЛК
  });

  // запускаем onKeyUpPhone для получения фокуса и начальных значений телефона:
  if (($('#flagForm').val() == 0) && ($('#regCodereg').val() == '')) {
    onKeyUpPhone('phone');
  }

  // Событие Paste на Input:
  $("input").on("paste", function(event) {
    // console.log('paste');
    pageInputType.paste = true;
    pageInputType.lastTime = Date.now();
  })

  // Событие input на Input:
  $("input").on("input", function(event) {
    // console.log('input');
    pageInputType.input = true;
    pageInputType.lastTime = Date.now();
    return false;
  })

  // Событие keydown на Input:
  $("input").on("keydown", function(event) {
    // console.log('keydown');
    // console.log(event);

    if (!pageInputKeys.startTime) { // Если еще не было ввода:
      pageInputKeys.startTime = Date.now();
    }
    if (event.keyCode == 8) { // Backspace
      pageInputKeys.Backspace++;
    }
    if (event.keyCode == 46) { // Delete
      pageInputKeys.Delete++;
    }
    if (event.ctrlKey && event.keyCode == 67) { // Ctrl + C
      pageInputKeys.CtrlC++;
    }
    if (event.ctrlKey && event.keyCode == 86) { // Ctrl + V
      pageInputKeys.CtrlV++;
    }
    pageInputKeys.KeysCount++;

    // console.log(pageInputKeys);
    // console.log((pageInputType.lastTime - pageInputKeys.startTime) / 1000);

    return true;
  })

  // Событие show - открытие модального окна:
  $('#modal_auth').on('shown.bs.modal', function() {
    var dataSitekey = $("#buttonLogin1").attr("data-sitekey");
    if (dataSitekey != '0') {
      var widgetId = grecaptcha.render("buttonLogin1", {
        "sitekey": dataSitekey,
        "callback": "onReCaptchaVerifyAuth"
      });
      grecaptcha.reset(widgetId);
    }
  });

});



function stickyCalcHeight() {
  var stickyCalcHeight = $('.sticky-calc.active').outerHeight();
  $('.header').css('top', stickyCalcHeight);
}


function preloader(immune, background, color) {


  if (immune == true) {
    $("body > div.preloader").addClass('immune');
  }

  if (background == 'white') {
    $("body > div.preloader").addClass('white');
  } else if (background == 'black') {
    $("body > div.preloader").addClass('black');
  }

  if (color == 'red') {
    $("body > div.preloader span.loading-bar").addClass('red-colored');
    $("body > div.preloader i.radial-loader").addClass('red-colored');
  } else if (color == 'blue') {
    $("body > div.preloader span.loading-bar").addClass('blue-colored');
    $("body > div.preloader i.radial-loader").addClass('blue-colored');
  } else if (color == 'green') {
    $("body > div.preloader span.loading-bar").addClass('green-colored');
    $("body > div.preloader i.radial-loader").addClass('green-colored');
  } else if (color == 'yellow') {
    $("body > div.preloader span.loading-bar").addClass('yellow-colored');
    $("body > div.preloader i.radial-loader").addClass('yellow-colored');
  }

}




$(document).ready(function($) {

  $(window).load(function() {

    setTimeout(function() {
      $('.js-tooltip').addClass('active');
      $('.js-tooltip .close').click(function() {
        $(this).closest('.js-tooltip').css('display', 'none');
      });
    }, 12000);
  });

});







function inWindow(s) {
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var currentEls = $(s);
  var result = [];
  currentEls.each(function() {
    var el = $(this);
    var offset = el.offset();
    if (scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
      result.push(this);
  });
  return $(result);
}

$(document).scroll(function() {
  var boxesInWindow = inWindow(".user-data-table tr");

  boxesInWindow.addClass("visible");
});
$(document).ready(function() {
  var boxesInWindow = inWindow(".user-data-table tr");

  boxesInWindow.addClass("visible");
  elementToTop();
});

$('#reg-slider').on('shown.bs.collapse', function() {
  $('#slider_collapse').hide(500);
})
$('#reg-slider').on('hidden.bs.collapse', function() {
  $('#slider_collapse').show(500);
})

function elementToTop() {
  $('.registration-anchor').click(function() {
    var header_height = $('.header').outerHeight();
    $('html, body').animate({
      scrollTop: ($('.block-sum').offset().top - header_height)
    }, 1200);
  });
}

function sharePopupShow() {
  setTimeout(function() {
    $('.share-popup').addClass('active');
    /* setInterval(function() {
         $('.share-popup').toggleClass('active');
     }, 40000);*/
  }, 20000);
}



function sharePopupClose() {
  $('.btn-user-close').click(function() {
    $(this).closest('.share-popup').removeClass('active');
  });
}


function anchorLink() {
  $(document).on('click', '.navbar-nav a[href*="#"]', function() {
    var target = $(this).attr('href');
    headerHeight = $('.header').outerHeight(true);
    collapseHeight = $('.navbar-collapse.in').outerHeight(true);

    var position = target.indexOf('#');
    var id_selector = target.substr(position);

    if (window.innerWidth <= 767) {
      $('html, body').animate({
        scrollTop: ($(id_selector).offset().top - collapseHeight)
      }, 1200);
    } else {
      $('html, body').animate({
        scrollTop: ($(id_selector).offset().top - headerHeight)
      }, 1200);
    }

    return false;
  });

}


var elementDefault = $('.js-full-menu > li');
var elementDefault_1 = $('.second-nav > li');

function menuOverflow() {
  if ($(window).width() < 1025 && $(window).width() > 767) {
    var l = $('.js-full-menu > li').length;
    if (l > 3) {
      var el = $('.js-full-menu > li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))');
      el.appendTo('.more-menu .dropdown-menu');
      $('.js-full-menu > li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))').remove();
    }

    var l1 = $('.second-nav li').length;
    if (l1 > 3) {
      var el1 = $('.second-nav li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))');
      el1.appendTo('.js-second-more .dropdown-menu');
      $('.second-nav li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))').remove();
    }
  } else {
    $('.js-full-menu > li').remove();
    elementDefault.appendTo('.js-full-menu');
    $('.second-nav > li').remove();
    elementDefault_1.appendTo('.second-nav');
  }
}

function navbarClose() {
  $('.js-navbar-close').click(function() {
    $('.navbar-collapse').removeClass('in');
  });
}

function overflowBlock() {
  $('.js-neangelu-all-city').click(function() {
    $('.js-neangelu-city-list').addClass('full-height');
    $(this).addClass('hidden');
    $('.js-neangelu-part-city').removeClass('hidden');
    $('.neangelu-city-item').show(200);
  });
  $('.js-neangelu-part-city').click(function() {
    $('.js-neangelu-city-list').removeClass('full-height');
    $(this).addClass('hidden');
    $('.js-neangelu-all-city').removeClass('hidden');
    $('html, body').animate({
      scrollTop: ($('.neangelu-tickets').offset().top - 120)
    }, 1200);
  });
}



function chooseFromSelect() {
  $('#neangelu-ticket').on('hidden.bs.select', function(e) {
    var value = $('#neangelu-ticket').find('option:selected').val();

    var element = $('.js-neangelu-city-list').find('#' + value + '');

    $('.neangelu-city-item:not(#' + value + ')').hide(200);
    $('#' + value + '').show(200);
  });

  $('#neangelu-ticket').change(function(e) {
    var value = $('#neangelu-ticket').find('option:selected').val();
    $('.neangelu-city-item:not(#' + value + ')').hide(200);
    $('#' + value + '').show(200);
  });


}

function owlAdvantages() {
  var $owl = $('.js-advantages-slider');
  if ($(window).width() < 820) {
    $('.js-advantages-slider').owlCarousel({
      items: 1,
      loop: true,
      nav: false,
      dots: true,
      navText: ['', ''],
      responsive: {

        800: {
          dots: false,
          nav: false
        }
      }
    });
  } else {
    /*$owl.owlCarousel('destroy');
    $owl.owlCarousel({touchDrag: false, mouseDrag: false});*/
  }
}








function toggleText() {
  setInterval(function() {
    $('.how-widget-t').toggleClass('active');
    $('.how-widget-q').toggleClass('active');
  }, 5000);
}





$(document).ready(function() {

  // Grayscale images on Safari and Opera browsers
  if (getBrowser() == 'opera' || getBrowser() == 'safari') {
    var $images = $(".container-img img"),
      imageCount = $images.length,
      counter = 0;

    // One instead of on, because it need only fire once per image
    $images.one("load", function() {
      // increment counter every time an image finishes loading
      counter++;
      if (counter == imageCount) {
        // do stuff when all have loaded
        grayscale($('.container-img img'));
        $(".container-img img").hover(
          function() {
            grayscale.reset($(this));
          },
          function() {
            grayscale($(this));
          }
        );
      }
    }).each(function() {
      if (this.complete) {
        // manually trigger load event in
        // event of a cache pull
        $(this).trigger("load");
      }
    });
  };


  // Grayscale images only on browsers IE10+ since they removed support for CSS grayscale filter
  if (getInternetExplorerVersion() >= 10) {
    $('.container-img img').each(function() {
      var el = $(this);
      el.css({
        "position": "absolute"
      }).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({
        "position": "absolute",
        "z-index": "5",
        "opacity": "0"
      }).insertBefore(el).queue(function() {
        var el = $(this);
        el.parent().css({
          "width": this.width,
          "height": this.height
        });
        el.dequeue();
      });
      this.src = grayscaleIE10(this.src);
    });



    // Quick animation on IE10+
    $('.container-img img').hover(
      function() {
        $(this).parent().find('img:first').stop().animate({
          opacity: 1
        }, 200);
      },
      function() {
        $('.img_grayscale').stop().animate({
          opacity: 0
        }, 200);
      }
    );



    $('.no-active img').each(function() {
      var el = $(this);
      el.css({
        "position": "absolute"
      }).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({
        "position": "absolute",
        "z-index": "5",
        "opacity": "0"
      }).insertBefore(el).queue(function() {
        var el = $(this);
        el.parent().css({
          "width": this.width,
          "height": this.height
        });
        el.dequeue();
      });
      this.src = grayscaleIE10(this.src);
    });







    function grayscaleIE10(src) {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var imgObj = new Image();
      imgObj.src = src;
      canvas.width = imgObj.width;
      canvas.height = imgObj.height;
      ctx.drawImage(imgObj, 0, 0);
      var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (var y = 0; y < imgPixels.height; y++) {
        for (var x = 0; x < imgPixels.width; x++) {
          var i = (y * 4) * imgPixels.width + x * 4;
          var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
        }
      }
      ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
      return canvas.toDataURL();
    };
  };

  // This block simply ads a corresponding class to the body tag so that we can target browsers with CSS classes
  if (getBrowser() == 'mozilla') {
    // Mozilla
    $('body').addClass('mozilla');
  } else if (getBrowser() == 'ie') {
    // IE Favourite
    $('body').addClass('ie');
  } else if (getBrowser() == 'opera') {
    // Opera
    $('body').addClass('opera');
  } else if (getBrowser() == 'safari') { // safari
    // Safari
    $('body').addClass('safari');
  } else if (getBrowser() == 'chrome') {
    // Chrome
    $('body').addClass('chrome');
  };
  if (getInternetExplorerVersion() >= 10) {
    $('body').addClass('ie11');
  };

  // Detection function to tell what kind of browser is used
  function getBrowser() {
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser.chrome = /chrome/.test(userAgent);
    $.browser.safari = /webkit/.test(userAgent);
    $.browser.opera = /opera/.test(userAgent);
    $.browser.msie = /msie/.test(userAgent) && !/opera/.test(userAgent);
    $.browser.mozilla = /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent) || /firefox/.test(userAgent);

    if ($.browser.chrome) return "chrome";
    if ($.browser.mozilla) return "mozilla";
    if ($.browser.opera) return "opera";
    if ($.browser.safari) return "safari";
    if ($.browser.msie) return "ie";
  };

  // Since IE11 can not be detected like this because the new user agent on IE11 is trying to hide as Mozilla
  // we detect IE11 with this function
  function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
      var ua = navigator.userAgent;
      var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    return rv;
  };
});

// фунции Вячеслава

function onClickSubmitContactInfo() {
  // правим action, если главная страница:
  if ($('form#clientContactInfo').attr('action') === '/') {
    $('form#clientContactInfo').attr('action', '/' + $('#language').text() + '/');
  }
  window.document.forms['clientContactInfo'].submit();
}

/*
function sendResGifts()
{
  $('html, body').animate({scrollTop: $('#gifts').offset().top}, 2000);
}*/

function promoPopup() {
  setTimeout(function() {
    $('#promocodePopup').modal('show');
  }, 900000);
}

function partnersFormOpener() {
  $('.js-open').click(function() {
    if ($('.partner-modal input:checked').length != 0) {
      $('.js-partners-form').removeClass('hidden');
      $('.form-choose').addClass('hidden');
    } else {
      $('.js-partners-form').addClass('hidden');
    }
  });

  $('.partner-modal').on('hidden.bs.modal', function(e) {
    $('.js-partners-form').addClass('hidden');
    $('.form-choose').removeClass('hidden');
  })
}

function partnersFormOpener1() {
  $(".partners-choose__wrapper input").change(function() {
    if ($('.partners-choose__wrapper input:checked').length != 0) {
      $('.js-opener-last').removeAttr('disabled');
    }
  });
}





function paswwordChecker() {
  var element = document.getElementById('password');
  var expBigLetter = /[A-Z]+/,
    expSmallLetter = /[a-z]+/,
    expNumber = /\d+/;
  if (element) {
    element.oninput = function() {
      var val = document.getElementById('password').value;

      var count = val.length;

      var big_letter = document.getElementById('big_letter');
      var small_letter = document.getElementById('small_letter');
      var number_symbol = document.getElementById('number_symbol');
      var count_letter = document.getElementById('count_letter');


      if (count >= 6) {
        count_letter.setAttribute('class', 'active');
      } else {
        count_letter.classList.remove('active');
      }


      if (expSmallLetter.test(val)) {
        small_letter.setAttribute('class', 'active');
      } else {
        small_letter.classList.remove('active');
      }
      if (expBigLetter.test(val)) {
        big_letter.setAttribute('class', 'active');
      } else {
        big_letter.classList.remove('active');
      }
      if (expNumber.test(val)) {
        number_symbol.setAttribute('class', 'active');
      } else {
        number_symbol.classList.remove('active');
      }
    }
  }

}

function giftAnchor() {
  var location = document.location.href;
  var position = location.indexOf('#');
  var id_selector = location.substr(position);
  history.pushState('', document.title, window.location.pathname);
  headerHeight = $('.header').outerHeight(true);

  if (id_selector && position >= 0) {
    setTimeout(function() {
      if (window.innerWidth <= 1300) {
        $('html, body').animate({
          scrollTop: ($(id_selector).offset().top - 0)
        }, 0);
      } else {
        $('html, body').animate({
          scrollTop: ($(id_selector).offset().top - 100)
        }, 0);
      }

    }, 500);
  }
  return false;
}

function mobileMenuClose() {
  $('.js-mobile-menu').click(function() {
    $('#js_navbar').removeClass('in');
  });
}

function prolongationBlockAnimate() {

  var animateTimePhone = 500;
  $('.js-prolongation-btn').click(function() {
    var phoneWr = $(this).closest('.prolongation-item').find('.js-prolongation-height');

    if (phoneWr.height() === 0) {

      $('.js-prolongation-height').stop().animate({
        height: '0'
      }, animateTimePhone);
      autoHeightAnimate(phoneWr, animateTimePhone);
      $('.prolongation-item').addClass('no-active');
      $(this).closest('.prolongation-item').removeClass('no-active');
    } else {
      /*phoneWr.stop().animate({ height: '0' }, animateTimePhone);*/

    }
  });

  /* Function to animate height: auto */
  function autoHeightAnimate(element, time) {
    var curHeight = element.outerHeight();
    element.outerHeight(curHeight);
    element.stop().animate({
      height: autoHeight
    }, time);
  }
}

function faqAnchor() {
  $('.faq-bar a, .footer-menu-link').on('click', function() {
    var _this = this;
    var target = $(this).attr('href');
    $("a[href*='/faq/#']").removeClass('active');
    var a = $("a[href='" + target + "']").addClass('active');
    $("a[href*='/faq/#']").removeClass('active');
    var a = $("a[href='" + target + "']").addClass('active');
    var position = target.indexOf('#');
    var id_selector = target.substr(position);

    $('html, body').animate({
      scrollTop: ($(id_selector).offset().top - 100)
    }, 1200);
    return false;



  });
}

function parallax() {

}





function hearts() {
  var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 25) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 0.5) + 0.3;
    var r_time = Math.floor(Math.random() * 10) + 5;

    //$('.heart-wrapper').append('<h2>Добавление дочернего элемента</h2>');

    $('.full-height').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;opacity:" + r_bg + ";animation-duration:" + r_time + "s'><img src='assets/images/wishes/heart.svg'></div>");

    $('.full-height').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%'><img src='assets/images/wishes/heart.svg'></div>");

    $('.heart').each(function() {
      var top = $(this).css("top").replace(/[^-\d\.]/g, '');
      var width = $(this).css("width").replace(/[^-\d\.]/g, '');
      if (top <= -100 || width >= 150) {
        $(this).detach();
      }
    });
  }, 500);
}


function randomBetween(range) {
  var min = range[0],
    max = range[1];
  if (min < 0) {
    return min + Math.random() * (Math.abs(min) + max);
  } else {
    return min + Math.random() * max;
  }
}

$.fn.equalizerAnimation = function(speed, barsHeight) {
  var $equalizer = $(this);
  setInterval(function() {
    $equalizer.find('span').each(function(i) {
      $(this).css({
        height: randomBetween(barsHeight[i]) + 'px'
      });
    });
  }, speed);
  /*$equalizer.on('click', function() {
      $equalizer.toggleClass('paused');
  });*/
}

var barsHeight = [
  [10, 15],
  [12, 17],
  [13, 15],
  [14, 17],
  [15, 20]
];
$('.equalizer').equalizerAnimation(180, barsHeight);


function wishMusic() {
  var audio = $("#wish")[0];
  if (audio) {
    audio.volume = 0.2;

    $('.paused').click(function() {
      audio.muted = true;
      $(this).addClass('hidden');
      $('.played').removeClass('hidden');
      $('.equalizer span').addClass('hidden');
    });
    $('.played').click(function() {
      $(this).addClass('hidden');
      $('.paused').removeClass('hidden');
      $('.equalizer span').removeClass('hidden');
      audio.muted = false;
    });
  }

}

function swiper() {
  var swiper = new Swiper('.js-banner', {
    breakpoints: {
      1024: {
        pagination: {
          el: '.swiper-pagination',
        }
      }
    }
  });

  var swiperProfit = new Swiper('.js-profit', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1024: {
        pagination: {
          el: '.swiper-pagination',
        }
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    }
  });

  var swiperReview = new Swiper('.js-main-review', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    breakpoints: {
      1024: {
        pagination: {
          el: '.swiper-pagination',
        }
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    }
  });

}
