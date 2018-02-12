var numberInput = 0;
var visibleCount = 4;

var flagRunQuery = false,
    flagPlayCred = false,   // флаг анимации калькулятора
    flagReg = {phone : false, reCaptcha : true},   // флаги для регистрации
    globalMoney = '0',  // сумма после reloadCred()
    globalDay = '0',    // дней после reloadCred()
    globalTimeStopSlider = 0;   // дата/время после reloadCred(). До первого изменения равен 0

// массив префиксов мобильных телефонов:
arrPrefix = ['39','50','63', '66', '67', '68', '73', '91','92', '93', '95', '96', '97', '98', '99'];

//
var getValueIndex = $('#span_value').text();
var getDayIndex = $('#span_days').text();

var initialValueIndex = getValueIndex;
var initialDaysIndex = getDayIndex;



$(document).ready(function() {

    if ($('#buttonGetCode') && ((($('#phone').val() !== undefined) ? $('#phone').val().length : 0) < 10)) {
        
        // выключаем кнопку "Получить код СМС" (так как Гугл устанавливает ее активной)
        setTimeout(function(){
            // console.log("buttonGetCode disabled");
            $('#buttonGetCode').attr('disabled', true);
            $('.rc-anchor').addClass('hidded');
            $('.rc-anchor-normal-footer smalltext').addClass('hidden');
        }, 1000);
        
        // запускает обновление счетчика:
        var timerId = setInterval(function() {
            refreshCounters();
        }, 20000);
    }

    if ($('#verify').length) {
        $('.button.success.large').prop('disabled', false);
        $('#menu').addClass('hidden');
    }
     

    $('body').on('keyup','.cyrillic',function(){
        var oldValue = $(this).val();
        var newValue = oldValue.replace(/[^а-яА-ЯїЇєЄіІёЁ ]/g,"");
        $(this).val(newValue);
    });

    function hideErrors(){


        var textLenght = $(this).val().length;
        var emptySelectMarker =  $(this).attr('data-empty');

        var hideDivSelector = $(this).attr('data-error');
        var errorClass = $(this).attr('data-errorClass');
        var hideDiv = $(hideDivSelector);


        if(hideDiv.length === 0) {
           return false;
        }

        if($(this)[0][emptySelectMarker] !== undefined){
            var selectedEmpty = $(this)[0][emptySelectMarker].value == $(this).val();
            textLenght = selectedEmpty?0:1;
        }

        if(textLenght === 0){
            hideDiv.show();
            $(this).addClass(errorClass);
        }else{
            hideDiv.hide();
            $(this).removeClass(errorClass);
        }
    }

    $('.hideError').each(hideErrors);

    $(document).on('keyup change','.hideError',hideErrors);

        /*bootstrap slider*/

        $("#js-money").slider();

        $("#js-money").on("slide", function(slideEvt) {
            $("#money-value").val(slideEvt.value);
        });

        $("#js-days").slider();

        $("#js-days").on("slide", function(slideEvt) {
            $("#day-value").val(slideEvt.value);
        });

      function dec(a, b, c, s) {
        var variants = [a, b, c];
        var index = s % 100;
        if (index >=11 && index <= 14) {
            index = 0;
        } else {
            index = (index %= 10) < 5 ? (index > 2 ? 2 : index): 0;
        }
        return(variants[index]);
      }



    function addDays(theDate, days) {

        return new Date(theDate.getTime() + days*24*60*60*1000); //обработка даты
    }


     var swiper45 = new Swiper('#value', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        centeredSlides: true,
        freeMode: true,
        roundLengths: true,
        freeModeSticky: true,
        speed: 300,
        initialSlide: initialValueIndex,
        onSlideChangeEnd:function(){
             
            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней

            $("#select-price").val(price);
            $("#select-day").val(days); 

            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             

            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы
            $('#give .resul-value').html(Math.round(result)+'&#8372;'); // добавления результата суммы  
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            


            //страница регистрации

            $('#take .loan-sum').html(price+'&#8372;');
            $('#give .result-days').text(countDay  +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear());
            $('#value-res .resul-value').html(Math.round(result)+'&#8372;');

        },

         onTouchEnd:function(){
             
            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней

            $("#select-price").val(price);
            $("#select-day").val(days); 

            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             

            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы
            $('#give .resul-value').html(Math.round(result)+'&#8372;'); // добавления результата суммы  
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            


            //страница регистрации

            $('#take .loan-sum').html(price+'&#8372;');
            $('#give .result-days').text(countDay  +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear());
            $('#value-res .resul-value').html(Math.round(result)+'&#8372;');

        }
    });

     var swiper43 = new Swiper('#days', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        centeredSlides: true,
        freeMode: true,
        roundLengths: true,
        freeModeSticky: true,
        speed: 300,
        initialSlide: initialDaysIndex,
        onSlideChangeEnd:function(){
             

            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней


            $("#select-price").val(price);
            $("#select-day").val(days);

            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days); 

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             

            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы
            $('#give .resul-value').html(Math.round(result)+'&#8372;'); // добавления результата суммы  
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            


            //страница регистрации

            $('#take .loan-sum').html(price+'&#8372;');
            $('#give .result-days').text(countDay  +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear());
            $('#value-res .resul-value').html(Math.round(result)+'&#8372;');

        },

         onTouchEnd:function(){
             
            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней

            $("#select-price").val(price);
            $("#select-day").val(days); 

            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             

            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы
            $('#give .resul-value').html(Math.round(result)+'&#8372;'); // добавления результата суммы  
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            


            //страница регистрации

            $('#take .loan-sum').html(price+'&#8372;');
            $('#give .result-days').text(countDay  +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear());
            $('#value-res .resul-value').html(Math.round(result)+'&#8372;');

        }
    });


    var swiperPreview = new Swiper('.swiper-preview', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        setWrapperSize: true
    });




    // Custom select
    //$('select').prettyDropdown();
    $('select:has(option)').prettyDropdown();

    // Tabs
    if ($('#example-tabs')) {
        var elem = new Foundation.Tabs($('#example-tabs'));
    }
  

  $('#accept-slider').on('down.zf.accordion', function(e) {
        var swiper1 = new Swiper('#value', {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            centeredSlides: true,
            freeMode: true,
            roundLengths: true,
            freeModeSticky: true,
            speed: 300,
            initialSlide: initialValueIndex,
            onSlideChangeEnd:function(){

            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней
            
            $("#select-price").val(price);
            $("#select-day").val(days);
            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);
             

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             
            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']; 

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы 
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            
             
             var selectValue = parseInt($('.select-value').text());
             var selectDay = parseInt($('.select-days').text());

            //страница оформления кредита

            //var lastProc =  (selectValue / 100) * procent * selectDay;
            ///var lastResult = selectValue + lastProc;
            //$('#give .calculator-money').html( Math.round(lastResult)+'&#8372');

        },

        onTouchEnd:function(){

            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней
            
            $("#select-price").val(price);
            $("#select-day").val(days);
            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);
             

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             
            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']; 

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы 
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            
             
             var selectValue = parseInt($('.select-value').text());
             var selectDay = parseInt($('.select-days').text());

            //страница оформления кредита

            //var lastProc =  (selectValue / 100) * procent * selectDay;
            ///var lastResult = selectValue + lastProc;
            //$('#give .calculator-money').html( Math.round(lastResult)+'&#8372');

        }

        });

        var swiper2 = new Swiper('#days', {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            centeredSlides: true,
            freeMode: true,
            roundLengths: true,
            freeModeSticky: true,
            speed: 300,
            initialSlide: initialDaysIndex,
            onSlideChangeEnd:function(){

            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней

           
            $("#select-price").val(price);
            $("#select-day").val(days);

            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);


            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;


            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             
            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']; 

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы 
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            
        },

        onTouchEnd:function(){

            //главная страница
            var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
            var days = parseInt($('#days .swiper-slide-active').text());  //получение дней
            
            $("#select-price").val(price);
            $("#select-day").val(days);
            $('#money-value-submit').val(price);
            $('#day-value-submit').val(days);
             

            var dayRes = dec("дней", "день", "дня", days);  //склонение дней
            $('#take .calculator-money').html(price+'&#8372;');    //добавление в поле занимаете (суммы)
            $('#take .calculator-days').text('На '+ days+ ' '+dayRes); //добавление в поле занимаете (дней)

            var procent = parseFloat($('.procent').text()); //получение %
            var proc =  (price / 100) * procent * days;
            var result = price + proc;

            var date = new Date();
            var dateMonth = date.getMonth();
            var getDate = date.toString();
            var getDay = getDate.substr(7,3);
             
            var date = new Date();
            var newDate = addDays(date, days);
            var getDay = date.setTime(newDate);
            var countDay = date.getDate();
            var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']; 

            $('#give .calculator-money').html(Math.round(result)+'&#8372;'); // добавления результата суммы 
            $('#give .calculator-days').text(countDay +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear()); // добавления результата дней
            
             
             var selectValue = parseInt($('.select-value').text());
             var selectDay = parseInt($('.select-days').text());

            //страница оформления кредита

            //var lastProc =  (selectValue / 100) * procent * selectDay;
            ///var lastResult = selectValue + lastProc;
            //$('#give .calculator-money').html( Math.round(lastResult)+'&#8372');

        }
        });
    });

    // open menu 
    openMenu();

    openMenuPhone();





    // close menu
    /*openMenuClose ();*/
    openMenuClose();

    openMenuPhoneClose();

      $("#card-number").inputmask("9999 9999 9999 9999", {
        autoclear: false,
        placeholder: "-"
    });



    $('#phone').inputmask("+380 99 999 9999");
    $('#phone-1').inputmask("+380 99 999 9999");
    $('#phone-2').inputmask("+380 99 999 9999");
    $('#work_tell').inputmask("+380 99 999 9999");
    $('#code').inputmask("999999");
    
    $("#passportSeries").inputmask("aa");
    $("#passportNumber").inputmask("999999");
    $("#inn").inputmask("9999999999");
    $("#passportReestr").inputmask("99999999-99999");
    $("#passportNumberDoc").inputmask("999999999");



    $('.datepicker-here').datepicker({
        // Можно выбрать тольо даты, идущие за сегодняшним днем, включая сегодня
        minDate: new Date(1942,02,01),
        maxDate: new Date(1999,11,31),
        classes: 'test',
        autoClose: true,
        position: 'top left'
    });
    

    $('#regPass').datepicker({
        minDate: new Date(2007,02,01),
        maxDate: new Date(2017,11,31),
        classes: 'test',
        autoClose: true,
        position: 'top left'
    });


    /*$(".tabs-title").on("click", function(e) {
        if ($(this).hasClass("disabled")) {
            e.preventDefault();
            return false;
        } else {
            var flagform = $('#flagForm').val();
            switch (e.currentTarget.id) {
                case "li_1":
                    $('#li_1').removeClass('success');
                    if (flagform > 1) {
                        $('#li_2').addClass('success').removeClass('is-active');
                    }
                    if (flagform > 2) {
                        $('#li_3').addClass('success').removeClass('is-active');
                    }
                    break;
                case "li_2":
                    $('#li_1').addClass('success').removeClass('is-active');

                    if (flagform > 1) {
                        $('#li_2').removeClass('success');
                    }
                    if (flagform > 2) {
                        $('#li_3').addClass('success').removeClass('is-active');
                    }
                    break;
                case "li_3":
                    $('#li_1').addClass('success').removeClass('is-active');
                    $('#li_2').addClass('success').removeClass('is-active');
                    $('#li_3').removeClass('success');
                    break;
            }
        }
    });
    $('.js_validate [type="submit"]').on("click", function() {
        return validate($(this).parents(".js_validate"));
    });*/





    /*$(function() {
        $('#dpt').fdatepicker({
            closeButton: false,
            format: 'mm.dd.yyyy',
        });
    });*/

   loadRegistrationStep();




    /*$('.js_validate [type="submit"]').on("click", function() {
        return validate($(this).parents(".js_validate"));
    });*/

    $('.js_edit').click(function() {
        $(this).closest('.js-reg-calc').find('button').addClass('active');
        $(this).closest('.js-reg-calc').find('.js_edit').css('display', 'none');
    });


});



function openMenu() {
    $('#js-gamburger').click(function() {
        $('.js-nav').addClass('active');
        $('.js-overlay').addClass('active');
    });
}

function openMenuPhone() {
    $('.js-phone').click(function() {
        $('.js-nav-phone').addClass('active');
        $('.js-overlay').addClass('active');
    });
}

function openMenuClose() {
    $('.js-close').click(function(event) {
        $('.js-nav').removeClass('active');
        $('.js-overlay').removeClass('active');
    });
}

function openMenuPhoneClose() {
    $('.js-close').click(function(event) {
        $('.js-nav-phone').removeClass('active');
        $('.js-overlay').removeClass('active');
    });
}

$(document).on("pageinit", ".wrapper", function() {
    $(document).on("swipeleft", ".wrapper", function(e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#right-panel").panel("open");
            } else if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});

registrationSlider()

function registrationSlider() {

    

    $('.js-calc-top-cash').click(function() {
        $('.js-reg-calc-cash').addClass('active');
    });
    $('.js-calc-top-time').click(function() {
        $('.js-reg-calc-time').addClass('active');
    });

    $('.js-calc-close').click(function() {
        $('.js-reg-calc-cash').removeClass('active');
        $('.js-reg-calc-time').removeClass('active');
    });



}


function loadRegistrationStep() {
    $('.js-load-step').click(function() {
  
       console.log('loadRegistrationStep');

        var val = validate($(this).parents(".js_validate"));
        
        
        if (val) {

            var closest = $(this).closest('.load-step');
            var next = closest.next('.load-step');
            var nextExists = next.length > 0;
            if (nextExists) {
            closest.removeClass('active');
            next.addClass('active');
            next.find('.js-required').attr('required', 'required');

            } else {

            $(this).parents('.load-step').removeClass('active');
            $(this).parents('.load-step').next('.load-step').addClass('active');
            $(this).parents('.load-step').next('.load-step').find('.js-required').attr('required', 'required');
        }
    }



    });
}




function onClickSubmitSlider(prefix) {

    // анализ переключений калькулятора:
    // analysisSlider(globalMoney, globalDay, prefix);
    //ga('send', 'pageview', '/poluchit-dengi');  // аналитика
    window.document.forms['form_slider_' + prefix].submit();
}



$('#res-pass').hide();

function onClickSubmitForgot() {

    // делаем временно кнопку неактивной:
    $('#buttonSendPhone').attr('disabled', true);
    
    var recoveryPassword = document.getElementById("recoveryPassword").value;
    console.log(recoveryPassword);
    recoveryPassword = recoveryPassword.replace(/\s|\(|\)/g,""); // удаляем пробельные символы и скобки
    var flag = false; // признак недопустимости номера / email
    
    if (/^(\+380\d{9})$/.test(recoveryPassword)) {  // phone
        
        var strNum = recoveryPassword.replace(/\D+/g,"");   // оставляем только цифры
        if (recoveryPassword.substring(0, 4) !== '+380') {
            flag = true;
        } else {
            var prefix = strNum.substring(3, 5);    // префикс оператора
            flag = true;
            // массив префиксов мобильных телефонов:
            arrPrefix.forEach(function(item, i, arr) {
                if (item == prefix) flag = false;
            });
        }
        // если недопустимый номер:
        if (flag) {
            $("#recoveryPassword").val("+380"); // начальное значение
            $("#recoveryPassword").focus(); // установить фокус
            $("#recoveryPassword").selectionStart = 4;  // позиция курсора 
            $("#spanRecoveryPassword").removeClass("hidden");
            $("#divRecoveryPassword").addClass("has-error");
            $("#span_api_error").addClass("hidden");
            console.log('phone не соответствует');
        } else {
            $("#recoveryPassword").val("+" + strNum);   // значение типа +380671111111
            $("#phone").val("+" + strNum);  // значение типа +380671111111
            $("#spanRecoveryPassword").addClass("hidden");
            $("#divRecoveryPassword").removeClass("has-error").addClass('has-success');
            $("#span_api_error").removeClass("hidden");
            console.log('phone соответствует');
        }

    } else if (/^[^@]+@([^@]+\.)+[^@]+$/.test(recoveryPassword)) {  // e-mail
        $("#spanRecoveryPassword").addClass("hidden");
        $("#divRecoveryPassword").removeClass("has-error").addClass('has-success');
        $("#email").val(recoveryPassword);  // значение email
        $("#span_api_error").removeClass("hidden");
        console.log('e-mail соответствует');
    } else {
        flag = true;
        $("#spanRecoveryPassword").removeClass("hidden");
        $("#divRecoveryPassword").addClass("has-error");
        $("#span_api_error").addClass("hidden");
        console.log('e-mail не соответствует');
    }
    
    if (!flag) {
        window.document.forms['forgotForm'].submit();
    } else {
        $('#buttonSendPhone').removeAttr('disabled');
    };
}



function onClickSubmitReg(form, prefix) {
    
    // console.log('form = ' + form); 

    //if (validate($(this).parents(".js_validate"))) {
        if (form === 'js-form-1') {
            
            //ga('send', 'event', 'Dalee1', 'Click'); // аналитика Google
            // yaCounter37666645.reachGoal('clickContacts');    // аналитика Yandex
            // eval("yaCounter" + YandexMetrikaId + ".reachGoal('clickContacts');");    // аналитика Yandex
    
            window.document.forms["js-form-1"].submit();
        }
        if (form === 'js-form-1-1') {
            
            //ga('send', 'event', 'Kod', 'Click');    // аналитика Google
            $("#sms-phone").val($("#phone").val());
            window.document.forms["js-form-1-1"].submit();
        }
        if (form === 'js-form-1-2') {
            
            //ga('send', 'event', 'Kabinet', 'Click');    // аналитика Google
            window.document.forms["js-form-1-2"].submit();
        }
        if (form == 'js-form-2') {
            
            //ga('send', 'event', 'Dalee2', 'Click'); // аналитика Google
            // yaCounter37666645.reachGoal('clickPersonalData');    // аналитика Yandex
            // eval("yaCounter" + YandexMetrikaId + ".reachGoal('clickPersonalData');");    // аналитика Yandex
            
            window.document.forms["js-form-2"].submit();
        }
        if (form == 'js-form-3') {
            
            //ga('send', 'event', 'Dalee3', 'Click'); // аналитика Google
            // yaCounter37666645.reachGoal('clickEmployment');  // аналитика Yandex
            // eval("yaCounter" + YandexMetrikaId + ".reachGoal('clickEmployment');");  // аналитика Yandex

            window.document.forms['js-form-3'].submit();
        }

        if (form == 'cardsForm') {
            
            //ga('send', 'event', 'Dalee4', 'Click'); // аналитика Google
            // yaCounter37666645.reachGoal('clickEmployment');  // аналитика Yandex
            // eval("yaCounter" + YandexMetrikaId + ".reachGoal('clickBankCard');");    // аналитика Yandex
            
            $("#verifyOK").val('OK');
            window.document.forms['cardsForm'].submit();
            
            // location.href = prefix;
        }
    //}
}


/*
function onClickSubmitReg(form, prefix) {

    if (form == 'js-form-3') {
        submitCredit(prefix);
        return true;
    }
 
    if (form === 'js-form-1-1') {
        $("#sms-phone").val($("#phone").val());
 
    }
    if (form == 'cardsForm') {
 
        $("#verifyOK").val('OK');
 
    }
    window.document.forms[form].submit();
 
} */


function onClickSubmitConfirmDog() {

    var credit_id = $("#credid").val();
    var amount = $("#amount").val();
    
    var data = {
        "ecommerce": {
            "currencyCode": "UAH",
            "purchase": {
                "actionField": {
                    "id" : credit_id,
                    "goal_id" : "27341109"  // Цель "clickAgreement" (ID цели (число). Указывается, если данное действие и было целью.)
                },
                "products": [
                    {
                        //"id": "1",
                        "name": "Кредит",
                        "price": parseFloat(amount),
                        "brand": "MyCredit"
                        //"category": "Одежда/Мужская одежда/Толстовки и свитшоты",
                        //"variant": "Оранжевый цвет"
                    },
                ]
            }
        }
    };  
    
    // console.log(data);
    
    // dataLayer.push(data); // покупка продукта (кредита) для Yandex
    
    // ga('send', 'pageview', '/poluchil-sms-soglasen');   // аналитика
    // eval("yaCounter" + YandexMetrikaId + ".reachGoal('clickAgreement');");   // аналитика Yandex

    window.document.forms['form_dog'].submit();
}

function validateMyData () {
    
    if (validate($("#myData"))) {
        $("#span_myData").addClass('hidden');
    } else {
        $("#span_myData").removeClass('hidden');
    };
    if (validate($("#myData2"))) {
        $("#span_myData2").addClass('hidden');
    } else {
        $("#span_myData2").removeClass('hidden');
    };
}

function onKeyUpPhone(idPhone) {

    var str = $("#" + idPhone).val();
    var strNum = str.replace(/\D+/g,"");    // оставляем только цифры
    
    //console.log('str= '+str);
    //console.log('strNum= '+strNum);
    
    if (strNum.length > 4) {
        var flag = false; // признак недопустимости номера
        
        if (str.substring(0, 4) !== '+380') {
            flag = true;
        } else {
            var prefix = strNum.substring(3, 5);    // префикс оператора
            flag = true;
            // массив префиксов мобильных телефонов:
            arrPrefix.forEach(function(item, i, arr) {
                //console.log('item='+item);
                if (item == prefix) flag = false;
            });
        }
        
        // если недопустимый номер:
        if (flag) {
            $("#" + idPhone).val("+380");   // начальное значение
            strNum = '380';
            $("#" + idPhone).inputmask("+38999 999 9999", {
                autoclear: false
            });
            $("#" + idPhone).focus();   // установить фокус
            $("#" + idPhone).selectionStart = 4;    // позиция курсора 
        }

        // делаем активными/неактивными элементы формы:
        if ((strNum.length == 12) && (document.getElementById("regCodereg").value.length == 0)) {
            $('#buttonGetCode').prop("disabled", false); 
            flagReg.phone = true;
        } else {
            $('#buttonGetCode').attr('disabled', true);
            flagReg.phone = false;
        }
        //console.log(flagReg);

    }
    
    return true;
}


/**
 * обрабатывает onkeyUp на поле ввода промокода
 */
function onkeyUpPromoCode() {
    
    $('#buttonRefreshProduct').removeAttr('disabled');
    return false;
}


//скрыть формы получения кода и проверку на авторизацию




function onReCaptchaExpired() {

    $('#buttonGetCode').attr('disabled', true);
    flagReg.reCaptcha = false;

    // console.log('onReCaptchaExpired ok');
    // console.log(flagReg);
}


/**
 * обрабатывает событие проверки каптчи на стороне клиента
 * @param response
 */
function onReCaptchaVerify(response) {
    
    if (flagReg.phone) {
        $('#buttonGetCode').removeAttr('disabled');
    }

    flagReg.reCaptcha = true;

    // console.log('onReCaptchaVerify ok');
    // console.log('g-recaptcha-response = ' + $("#g-recaptcha-response").val());
    // console.log(flagReg);
     
    // отправляем каптчу на проверку, и открываем форму ввода кода: 
    onClickGetCode();
}

function onClickGetCode() {
console.log(flagReg);
	if (!flagReg.phone || !flagReg.reCaptcha) return false;
    
    //ga('send', 'pageview', '/poluchit-kod-na-telefon'); // аналитика
    $("#mobile-phone").val($("#phone").val());
    //sendCodeReg($("#phone").val(), $("#captcha").val());  // отправляем код
    //var phoneNumber = $("#phone").val();
    //var recaptcha = $("#g-recaptcha-response").val();
    //console.log(phoneNumber);
    //console.log(recaptcha );
    sendCodeReg($("#phone").val(), $("#g-recaptcha-response").val());   // отправляем код
}


function sendCodeReg(phone, captcha) {
    
    // получаем язык сайта 
    var lang = document.getElementById('lang').innerHTML;
    
    var url = "/ru/?ajax";  
    var data = {
            typeData: 'sendCodeReg',
            phone: phone,

            // captcha: captcha, 
            // captcha1: window.btoa(captcha), 
            captcha1: captcha, 
            lang: lang 
        };

    // console.log(data);
    
    $.ajax({
        url: url,
        type: 'POST',
        data: {data: data},
        dataType: 'json',
        //dataType: 'html',
        success: function(json){
            if(json) {
                //var js = JSON.parse(json);
                var js = json;
                if (js.message == 'OK') {
                    $("#errorCaptcha").addClass("hidden");
                    // $("#code-modal").modal("show");  // показать модальное окно ввода кода
                    $("#div_code").removeClass("hidden");   // показать поля ввода кода
                    $('#buttonGetCode').addClass('hidden', true);
                    $('#phone').attr('disabled', true);
                } else if (js.message == 'existPhone') {
                    $('#phone').attr('disabled', true);
                    $('#buttonGetCode').addClass("hidden");
                    $('#login').val($('#phone').val());
                    $("#div_auth").removeClass("hidden");   // показать поля ввода пароля на вход
                } else {
                    $("#errorCaptcha").removeClass("hidden");
                    grecaptcha.reset(); // сброс капчи
                    //$('#buttonGetCode').attr('disabled', true);
                    flagReg.reCaptcha = false;
                    console.log(js.message_details);
                }
                // console.log(js);
            };
        },
    
        error: function(jqXHR, textStatus, errorThrown){
            // console.log(jqXHR); // вывод JSON в консоль
            console.log('Сообщение об ошибке от сервера: '+textStatus); // вывод JSON в консоль
            // console.log(errorThrown); // вывод JSON в консоль
        }
    });

}



function onChangeAgree() {
    
    if ($("#test1").prop('checked')) {
        $('#buttonCreateCredit').removeAttr('disabled');
    } else {
        $('#buttonCreateCredit').attr('disabled', true);
    }
}

function refreshInputs() {
    var inputs = $(".js-for-input");
    //console.log(inputs);
    //console.log(numberInput);
    var inputsLength = inputs.length;
    var numberInputFirst = numberInput;
    $(inputs).addClass("hidden").removeClass("load-step").removeClass("active");
    for (var i = numberInput; i < numberInputFirst + visibleCount; i++) {
        if (i == inputsLength) break;
        numberInput ++;
        //console.log(numberInput);
        $(inputs[i]).removeClass("hidden").addClass("load-step").addClass("active");
    }
    
    // if (numberInput > inputsLength - visibleCount + 1) {
	$('#buttonCreateCredit').unbind('click');
    if (!$("#tr_check").hasClass("hidden")) {
    	$("#buttonCreateCredit").on("click", function() {

            if (validate($(this).parents(".js_validate"))) {
                 onClickSubmitReg("js-form-3", "average_main");
            }
        });
    } else {
        $("#buttonCreateCredit").on("click", function() {

            //console.log('click');
            if (validate($(this).parents(".js_validate"))) {
                refreshInputs();
            }
        });   
    }
}

function onChangeMainSource(isReg) {

    //console.log('testfunctionMainSource');

    $(".js-for-input").addClass('hidden');
    
    var selectedType = $("#mainSource").val();
    $('#dateSource').val(selectedType);

    switch (selectedType) {
        case "8":   // Зарплата

        if (isReg) {

                if (!$("#tr_workType").hasClass("js-for-input")) $("#tr_workType").addClass("js-for-input");  // Вид деятельности
                if (!$("#tr_company").hasClass("js-for-input")) $("#tr_company").addClass("js-for-input");    // Название компании
                if (!$("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").addClass("js-for-input");          // Должность
                if (!$("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").addClass("js-for-input");  // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").addClass("js-for-input");  // Стаж работы:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").addClass("js-for-input load-step active").removeClass("hidden");
                $('#dolj').attr('required', true);
 
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input");    // Планируете ли искать новую работу?

        } else {
            
                if ($("#tr_workType").hasClass("hidden")) $("#tr_workType").removeClass("hidden");  // Вид деятельности
                if ($("#tr_company").hasClass("hidden")) $("#tr_company").removeClass("hidden");    // Название компании
                if ($("#tr_dolj").hasClass("hidden")) $("#tr_dolj").removeClass("hidden");          // Должность
                if ($("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").removeClass("hidden");  // Рабочий телефон компании
                if ($("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").removeClass("hidden");    // Стаж работы
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью
                $('#costFamily').attr('required', true);
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн )
                $('#GrossMonthlyIncome').attr('required', true);
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                $('#oftenPay').attr('required', true);
        }
            break;
    
        case "9":   // Нет дохода

        if (isReg) {

               
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input");    // Стаж работы:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input");    // Стаж работы:
                if ($("#tr_GrossMonthlyIncome").hasClass("js-for-input") && $("#tr_GrossMonthlyIncome").hasClass("load-step") && $("#tr_GrossMonthlyIncome").hasClass("active")) $("#tr_GrossMonthlyIncome").removeClass("js-for-input load-step active").addClass("hidden");    // Месячный доход
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input");    // Планируете ли искать новую работу?

        } else {
        
                if (!$("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").addClass("hidden");    // Месячный доход ( грн ):
                $('#GrossMonthlyIncome').removeAttr('required');
                if (!$("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").addClass("hidden");  // Следующее получение дохода:
                if (!$("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").addClass("hidden");    // Как часто Вы получаете доход
                $('#oftenPay').removeAttr('required');
                if (!$("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").addClass("hidden");    // Расходы на семью:
                $('#costFamily').removeAttr('required');
        }
            break;
    
        default:

        if (isReg) {

 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input");    // Стаж работы:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").addClass("js-for-input load-step active").removeClass("hidden");
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input");    // Планируете ли искать новую работу?

        } else {

                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн )
                $('#GrossMonthlyIncome').attr('required', true);
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                $('#oftenPay').attr('required', true);
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью
                $('#costFamily').attr('required', true);
        }
            break;
    }

    // пересчет BusynessType
    onChangeBusynessType("isReg", "mainSource");
}




/**
 * Показывает поля в зависимости от Типа паспорта
 */
function onchangePassportType(passportType) {
    
    //console.log('passportType');
    var selectedType = $("#passportType").val();
    var selectedType = passportType;
    //console.log(selectedType );

    // получаем значение выбранного элемента года паспорта
    var selectedOption = $("#PassportRegistrationYear :selected").val();

    // получаем год рождения:
    var yearB = parseInt($("#year :selected").val());
    // получаем текущий год:
    var dateReal = new Date();
    var year = dateReal.getFullYear();
    
    // Такое очищение, походу, работает во всех браузерах нормально.
    var list = document.getElementById('PassportRegistrationYear');
    //console.log('очистка PassportRegistrationYear в количестве ' + list.length);
    while (list.length > 0) list.options[0] = null;

    // добавляет нужные option от NumberBegin до NumberEnd
    function addOptionYear( NumberBegin, NumberEnd) {
        
        for (var i = NumberBegin; i <= NumberEnd; i++) {
            // получаем текст элемента
            var optionText = i.toString();
            list.options[i - NumberBegin] = new Option(optionText, optionText, false, false);
            //console.log('Добавление ' + list.options[i].text);
        };
    
        //console.log('selectedOption=' + selectedOption);
        $("#PassportRegistrationYear [value='" + selectedOption + "']").attr("selected", "selected");
        //console.log(selectedOption);
        // устанавливаем selected методом из bootstrap
        $('#PassportRegistrationYear').val(selectedOption);
    
        $("#PassportRegistrationYear").trigger("chosen:updated");
        // метод для обновления select с классом selectpicker
        $("#PassportRegistrationYear").prettyDropdown('update');
    }
    
    switch (selectedType) {

        case "0": // Выбрать

          //console.log(selectedType + ' case0');
           
            // добавление options:
            addOption(['4', '6', '9', '11']);
 
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if (!$("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
           
            /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
            }*/
           
            if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
            if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
        }
            break;

        case "1":   // Паспорт старого образца
            //console.log('passportType1');
            if ($("#passportType_1_2").hasClass("hidden")) $("#passportType_1_2").removeClass("hidden");    // делаем видимыми поля ввода данных паспорта

            if ($("#passportType_1").hasClass("hidden")) $("#passportType_1").removeClass("hidden");    // Паспорт старого образца
            if (!$("#passportType_2").hasClass("hidden")) $("#passportType_2").addClass("hidden");  // Паспорт нового образца
            // устанавливаем required соответственно:
            $('#passportSeries').attr('required', true);
            $('#passportNumber').attr('required', true);
            $('#passportReestr').removeAttr('required');
            $('#passportNumberDoc').removeAttr('required');
            
            // $('#passportOld').attr('required', true);
            // $('#passportNew').removeAttr('required');
            
            if (yearB > 1977) {
                addOptionYear(yearB + 16, year);    // добавляет список годов от и до
            } else {
                addOptionYear(1994, year);  // добавляет список годов от и до
            }

            break;
    
        case "2":   // Паспорт нового образца
            
            //console.log('passportType2');
            if ($("#passportType_1_2").hasClass("hidden")) $("#passportType_1").removeClass("hidden");  // делаем видимыми поля ввода данных паспорта

            if (!$("#passportType_1").hasClass("hidden")) $("#passportType_1").addClass("hidden");  // Паспорт старого образца
            if ($("#passportType_2").hasClass("hidden")) $("#passportType_2").removeClass("hidden");    // Паспорт нового образца
            // устанавливаем required соответственно:
            $('#passportSeries').removeAttr('required');
            $('#passportNumber').removeAttr('required');
            $('#passportReestr').attr('required', true);
            $('#passportNumberDoc').attr('required', true);
            
            // $('#passportOld').removeAttr('required');
            // $('#passportNew').attr('required', true);
            
            if (yearB > 2000) {
                addOptionYear(yearB + 14, year);    // добавляет список годов от и до
            } else {
                addOptionYear(2015, year);  // добавляет список годов от и до
            }

            break;
    
        default:
            if ($("#passportType_1").hasClass("hidden")) $("#passportType_1").removeClass("hidden");    // Паспорт старого образца
            if (!$("#passportType_2").hasClass("hidden")) $("#passportType_2").addClass("hidden");  // Паспорт нового образца
            //$('#passportSeries').attr('required', true);
            //$('#passportNumber').attr('required', true);
            //$('#passportReestr').removeAttr('required');
            //$('#passportNumberDoc').removeAttr('required');
            $('#passportOld').attr('required', true);
            $('#passportNew').removeAttr('required');
            
            if (yearB > 1977) {
                addOptionYear(yearB + 16, year);    // добавляет список годов от и до
            } else {
                addOptionYear(1994, year);  // добавляет список годов от и до
            }

            break;
    }
}



 
function submitCredit(prefix) {

    // анализ переключений калькулятора:
    // analysisSlider(globalMoney, globalDay, prefix);

   var price = parseInt($('#value .swiper-slide-active').text()); //получение суммы
   var days = parseInt($('#days .swiper-slide-active').text());  //получение дней
    
    document.getElementById("day-value-submit").value = days;
    if(window.document.forms['form_credit'] != null) {

        //ga('send', 'event', 'Application', 'Click');    // аналитика Google
        //eval("yaCounter" + YandexMetrikaId + ".reachGoal('clickApplication');");    // аналитика Yandex

        window.document.forms['form_credit'].submit();
    }

    
    // console.log('money='+money+' days='+days+'');
    
    return false;
}



function onclickRefreshProduct() {
    
    // удаляем данные, если были:
    document.getElementById("money-value-submit").value = '';
    document.getElementById("day-value-submit").value = '';

    if(window.document.forms['form_credit'] != null) window.document.forms['form_credit'].submit();
    
    // console.log('onclickRefreshProduct');
}

function onChangeBusynessType(isReg, fromElement) {

    //console.log('testfuntion');
   
    var selectedType = $("#BusynessType").val();
 
    $(".js-for-input").addClass('hidden');
 
    if (fromElement == undefined) {
       
        // Такое очищение, походу, работает во всех браузерах нормально.
        var list = document.getElementById('mainSource');
        //console.log('очистка mainSource в количестве ' + list.length);
        while (list.length > 0) list.options[0] = null;
    }
 
    // добавляет нужные option
    function addOption( arrNumber) {
       
        if (!(fromElement == undefined)) return;
 
        if (arrNumber.length > 0) {
            $("#tr_mainSource").removeClass("hidden");
 
            // перебор массива требуемых option:
            arrNumber.forEach (function(item, i, arr) {
                // получаем текст элемента из общего селекта
                var optionText = $("#mainSourceStandard option[value='" + item + "']").html();
                list.options[i] = new Option(optionText, item, false, false);
                // console.log('Добавление ' + list.options[i].text);
            });
   
            //console.log('list = ');
            //console.log(list);

            // получаем значение выбранного элемента
            var selectedOption = $("#mainSourceStandard :selected").val();
            //console.log('selectedOption=' + selectedOption);
            $("#mainSource [value='" + selectedOption + "']").attr("selected", "selected");
            // устанавливаем selected методом из bootstrap
            //$("#prettydropdown-mainSourceStandard").addClass("hidden");
            $('#mainSource').prettyDropdown('val', selectedOption);
   
            $("#mainSource").trigger("chosen:updated");
            // метод для обновления select с классом selectpicker
            $("#mainSource").prettyDropdown().refresh();
            //$("#mainSource").refresh();
        } else {
            $("#tr_mainSource").addClass("hidden");
        }
    }
   
    switch (selectedType) {
        case "1":   // // Работаю

            //console.log(selectedType + ' case1');
   
            // удаление лишних options (от последнего к первому!!!):
            //delOption([10, 9, 1]);
 
            // добавление options:
            addOption(['6',  '8', '11']);
 
            if (isReg) {
 
                if (!$("#tr_workType").hasClass("js-for-input")) $("#tr_workType").addClass("js-for-input");  // Вид деятельности
                if (!$("#tr_company").hasClass("js-for-input")) $("#tr_company").addClass("js-for-input");    // Название компании
                if (!$("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").addClass("js-for-input");          // Должность
                if (!$("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").addClass("js-for-input");  // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").addClass("js-for-input");    // Стаж работы:
                $('#dolj').attr('required', true);
 
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if ($("#tr_workType").hasClass("hidden")) $("#tr_workType").removeClass("hidden");  // Вид деятельности
                if ($("#tr_company").hasClass("hidden")) $("#tr_company").removeClass("hidden");    // Название компании
                if ($("#tr_dolj").hasClass("hidden")) $("#tr_dolj").removeClass("hidden");         // Должность
                $('#dolj').attr('required', true);
 
                if ($("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").removeClass("hidden");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").removeClass("hidden");    // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                // if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");   // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
        }
            break;
       
        case "2": // Предприниматель

            //console.log(selectedType + ' case2');
           
            // добавление options:
            addOption(['6', '8', '11', '12']);
 
            if (isReg) {
 
                if (!$("#tr_workType").hasClass("js-for-input")) $("#tr_workType").addClass("js-for-input ");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if ($("#tr_workType").hasClass("hidden")) $("#tr_workType").removeClass("hidden");  // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
        }
            break;
           
        case "3": // Не работаю

            //console.log(selectedType + ' case3');
           
            // добавление options:
            addOption(['5', '6', '9', '11']);
 
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
               
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
            }
 
            break;
           
        case "4": // Учусь

            //console.log(selectedType + ' case4');
           
            // добавление options:
            addOption(['1', '6', '8', '9', '11']);
 
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if (!$("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").addClass("js-for-input load-step active");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").addClass("js-for-input");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").addClass("js-for-input");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").addClass("js-for-input");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").addClass("js-for-input");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").addClass("js-for-input");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").addClass("js-for-input");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").addClass("js-for-input");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if ($("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").removeClass("hidden");  // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").removeClass("hidden");    // Специализация факультета
                if ($("#tr_qualification").hasClass("hidden")) $("#tr_qualification").removeClass("hidden");    // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").removeClass("hidden");  // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").removeClass("hidden");  // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").removeClass("hidden");  // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").removeClass("hidden");  // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("hidden")) $("#tr_studentID").removeClass("hidden");    // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
        }
 
            break;
           
        case "5": // Пенсионер

            //console.log(selectedType + ' case5');
           
            // добавление options:
            addOption(['2', '6', '8', '9', '11']);
 
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
            }
 
            break;
           
        case "6": // Инвалид

            //console.log(selectedType + ' case6');
           
            // добавление options:
            addOption(['2', '3', '6', '8', '9', '11']);
 
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if (!$("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").addClass("js-for-input"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
           
                if ($("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").removeClass("hidden");    // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
 
            }
 
            break;

           
        case "7": // Домохозяйка / Домохозяин

            //console.log(selectedType + ' case7');
           
            // добавление options:
            addOption(['6', '9', '11']);
           
 
            if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
 
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
 
            }
 
            break;
           
        case "8": // Декрет

          //console.log(selectedType + ' case8');
           
            // добавление options:
            addOption(['4', '6', '9', '11']);
 
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
                if (!$("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
           
            /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
            }*/
           
            if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
            if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
        }
            break;
           
        case "9": // Уволена / Уволен

            //console.log(selectedType + ' case9');
           
            // добавление options:
            addOption(['3', '5', '6', '9', '11']);
 
             if (isReg) {
 
                if (!$("#tr_workType").hasClass("js-for-input")) $("#tr_workType").addClass("js-for-input");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if (!$("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").addClass("js-for-input");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").addClass("js-for-input");    // Планируете ли искать новую работу?
 
            } else {
           
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if ($("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").removeClass("hidden");  // Расходы на семью:
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн ):
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода:
                if ($("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").removeClass("hidden");  // Как часто Вы получаете доход
                if ($("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").removeClass("hidden");    // Цель получения займа
                if ($("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").removeClass("hidden");    // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if ($("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").removeClass("hidden");    // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").removeClass("hidden");  // Планируете ли искать новую работу?
            }
 
            break;
 
        default:
            // добавление options:

            //console.log(selectedType + ' caseDEFuLT');

            addOption([]);
           
             if (isReg) {
 
                if ($("#tr_workType").hasClass("js-for-input")) $("#tr_workType").removeClass("js-for-input load-step active");  // Вид деятельности
                if ($("#tr_company").hasClass("js-for-input")) $("#tr_company").removeClass("js-for-input load-step active");    // Название компании
                if ($("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").removeClass("js-for-input load-step active");          // Должность
                if ($("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").removeClass("js-for-input load-step active");  // Рабочий телефон компании:
                if ($("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").removeClass("js-for-input load-step active");    // Стаж работы:
                $('#dolj').attr('required', true);
 
 
                if ($("#tr_groupDisability").hasClass("js-for-input")) $("#tr_groupDisability").removeClass("js-for-input load-step active"); // Группа инвалидности
                if ($("#tr_nameUniversity").hasClass("js-for-input")) $("#tr_nameUniversity").removeClass("js-for-input load-step active");    // Название учебного заведения:
                if ($("#tr_Specializationfaculty").hasClass("js-for-input")) $("#tr_Specializationfaculty").removeClass("js-for-input load-step active");  // Специализация факультета
                if ($("#tr_qualification").hasClass("js-for-input")) $("#tr_qualification").removeClass("js-for-input load-step active");  // Степень/квалификация после выпуска
                if ($("#tr_isBudget").hasClass("js-for-input")) $("#tr_isBudget").removeClass("js-for-input load-step active");    // Бюджет или контракт?
                if ($("#tr_formTraining").hasClass("js-for-input")) $("#tr_formTraining").removeClass("js-for-input load-step active");    // Форма обучения:
                if ($("#tr_isFirstEducation").hasClass("js-for-input")) $("#tr_isFirstEducation").removeClass("js-for-input load-step active");    // Получаете первое высшее образование?
                if ($("#tr_beginLearn").hasClass("js-for-input")) $("#tr_beginLearn").removeClass("js-for-input load-step active");    // Когда Вы начали учиться
                if ($("#tr_studentID").hasClass("js-for-input")) $("#tr_studentID").removeClass("js-for-input load-step active");  //  Номер студенческого билета
 
                if ($("#tr_reasonDismissal").hasClass("js-for-input")) $("#tr_reasonDismissal").removeClass("js-for-input load-step active");  // Причина увольнения:
                if ($("#tr_planNewJob").hasClass("js-for-input")) $("#tr_planNewJob").removeClass("js-for-input load-step active");    // Планируете ли искать новую работу?
 
            } else {
 
                if (!$("#tr_groupDisability").hasClass("hidden")) $("#tr_groupDisability").addClass("hidden");  // Группа инвалидности
 
                if (!$("#tr_workType").hasClass("hidden")) $("#tr_workType").addClass("hidden");    // Вид деятельности
                if (!$("#tr_company").hasClass("hidden")) $("#tr_company").addClass("hidden");  // Название компании
                if (!$("#tr_dolj").hasClass("hidden")) $("#tr_dolj").addClass("hidden");            // Должность
                $('#dolj').removeAttr('required');
 
                if (!$("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").addClass("hidden");    // Рабочий телефон компании:
                if (!$("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").addClass("hidden");  // Стаж работы:
                if (!$("#tr_costFamily").hasClass("hidden")) $("#tr_costFamily").addClass("hidden");    // Расходы на семью:
                if (!$("#tr_GrossMonthlyIncome").hasClass("hidden")) $("#tr_GrossMonthlyIncome").addClass("hidden");    // Месячный доход ( грн ):
                if (!$("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").addClass("hidden");  // Следующее получение дохода:
                if (!$("#tr_oftenPay").hasClass("hidden")) $("#tr_oftenPay").addClass("hidden");    // Как часто Вы получаете доход
                if (!$("#tr_purposeLoan").hasClass("hidden")) $("#tr_purposeLoan").addClass("hidden");  // Цель получения займа
                if (!$("#tr_sumPayLoans").hasClass("hidden")) $("#tr_sumPayLoans").addClass("hidden");  // Сумма платежей по кредитам
                //if ($("#tr_sourceIncome").hasClass("hidden")) $("#tr_sourceIncome").removeClass("hidden");    // Есть ли у Вас источник дохода
               
                if (!$("#tr_nameUniversity").hasClass("hidden")) $("#tr_nameUniversity").addClass("hidden");    // Название учебного заведения:
                if (!$("#tr_Specializationfaculty").hasClass("hidden")) $("#tr_Specializationfaculty").addClass("hidden");  // Специализация факультета
                if (!$("#tr_qualification").hasClass("hidden")) $("#tr_qualification").addClass("hidden");  // Степень/квалификация после выпуска
                if (!$("#tr_isBudget").hasClass("hidden")) $("#tr_isBudget").addClass("hidden");    // Бюджет или контракт?
                if (!$("#tr_formTraining").hasClass("hidden")) $("#tr_formTraining").addClass("hidden");    // Форма обучения:
                if (!$("#tr_isFirstEducation").hasClass("hidden")) $("#tr_isFirstEducation").addClass("hidden");    // Получаете первое высшее образование?
                if (!$("#tr_beginLearn").hasClass("hidden")) $("#tr_beginLearn").addClass("hidden");    // Когда Вы начали учиться
                if (!$("#tr_studentID").hasClass("hidden")) $("#tr_studentID").addClass("hidden");  // Номер студенческого билета
               
                /*if ($("#tr_mainSource").hasClass("hidden") && ( $('input[name="profile[sourceIncome]"]:checked').val() == '1')) {
                    $("#tr_mainSource").removeClass("hidden");  // Основной источник дохода
                }*/
               
                if (!$("#tr_reasonDismissal").hasClass("hidden")) $("#tr_reasonDismissal").addClass("hidden");  // Причина увольнения:
                if (!$("#tr_planNewJob").hasClass("hidden")) $("#tr_planNewJob").addClass("hidden");    // Планируете ли искать новую работу?
            }
 
            break;
    }
 
    //  проверяем mainSource
    selectedType = $("#mainSource").val();
 
    switch (selectedType) {
        case "8":   // // Зарплата
 
           if (isReg) {
 
                if (!$("#tr_workType").hasClass("js-for-input")) $("#tr_workType").addClass("js-for-input");  // Вид деятельности
                if (!$("#tr_company").hasClass("js-for-input")) $("#tr_company").addClass("js-for-input");    // Название компании
                if (!$("#tr_dolj").hasClass("js-for-input")) $("#tr_dolj").addClass("js-for-input");          // Должность
                if (!$("#tr_work_tel").hasClass("js-for-input")) $("#tr_work_tel").addClass("js-for-input");  // Рабочий телефон компании
                if (!$("#tr_vremyaorg").hasClass("js-for-input")) $("#tr_vremyaorg").addClass("js-for-input");    // Стаж работы
                if (!$("#tr_costFamily").hasClass("js-for-input")) {
                    $('#costFamily').attr('required', true);
                    $("#tr_costFamily").addClass("js-for-input");  // Расходы на семью
                }
                if (!$("#tr_GrossMonthlyIncome").hasClass("js-for-input")) {
                    $('#GrossMonthlyIncome').attr('required', true);
                    $("#tr_GrossMonthlyIncome").removeClass("js-for-input");  // Месячный доход ( грн )
                }
                if (!$("#tr_nextPay").hasClass("js-for-input")) $("#tr_nextPay").addClass("js-for-input");    // Следующее получение дохода
                if (!$("#tr_oftenPay").hasClass("js-for-input")) {
                    $('#oftenPay').attr('required', true);
                    $("#tr_oftenPay").removeClass("js-for-input");    // Как часто Вы получаете доход
                }
 
           } else {
           
                if ($("#tr_workType").hasClass("hidden")) $("#tr_workType").removeClass("hidden");  // Вид деятельности
                if ($("#tr_company").hasClass("hidden")) $("#tr_company").removeClass("hidden");    // Название компании
                if ($("#tr_dolj").hasClass("hidden")) $("#tr_dolj").removeClass("hidden");          // Должность
                if ($("#tr_work_tel").hasClass("hidden")) $("#tr_work_tel").removeClass("hidden");  // Рабочий телефон компании
                if ($("#tr_vremyaorg").hasClass("hidden")) $("#tr_vremyaorg").removeClass("hidden");    // Стаж работы
                if ($("#tr_costFamily").hasClass("hidden")) {
                    $('#costFamily').attr('required', true);
                    $("#tr_costFamily").removeClass("hidden");  // Расходы на семью
                }
                if ($("#tr_GrossMonthlyIncome").hasClass("hidden")) {
                    $('#GrossMonthlyIncome').attr('required', true);
                    $("#tr_GrossMonthlyIncome").removeClass("hidden");  // Месячный доход ( грн )
                }
                if ($("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").removeClass("hidden");    // Следующее получение дохода
                if ($("#tr_oftenPay").hasClass("hidden")) {
                    $('#oftenPay').attr('required', true);
                    $("#tr_oftenPay").removeClass("hidden");    // Как часто Вы получаете доход
                }
          }
            break;
           
        case "9":   // // Нет дохода
       
            break;
 
            if (isReg) {
 
                if (!$("#tr_GrossMonthlyIncome").hasClass("js-for-input")) {
                    $('#GrossMonthlyIncome').removeAttr('required');
                    $("#tr_GrossMonthlyIncome").addClass("js-for-input"); // Месячный доход ( грн ):
                }
                if (!$("#tr_nextPay").hasClass("js-for-input")) $("#tr_nextPay").addClass("js-for-input");  // Следующее получение дохода:
                if (!$("#tr_oftenPay").hasClass("js-for-input")) {
                    $('#oftenPay').removeAttr('required');
                    $("#tr_oftenPay").addClass("js-for-input");   // Как часто Вы получаете доход
                }
                if (!$("#tr_costFamily").hasClass("js-for-input")) {
                    $('#costFamily').removeAttr('required');
                    $("#tr_costFamily").addClass("js-for-input"); // Расходы на семью:
                }
 
            } else {
 
                if (!$("#tr_GrossMonthlyIncome").hasClass("hidden")) {
                    $('#GrossMonthlyIncome').removeAttr('required');
                    $("#tr_GrossMonthlyIncome").addClass("hidden"); // Месячный доход ( грн ):
                }
                if (!$("#tr_nextPay").hasClass("hidden")) $("#tr_nextPay").addClass("hidden");  // Следующее получение дохода:
                if (!$("#tr_oftenPay").hasClass("hidden")) {
                    $('#oftenPay').removeAttr('required');
                    $("#tr_oftenPay").addClass("hidden");   // Как часто Вы получаете доход
                }
                if (!$("#tr_costFamily").hasClass("hidden")) {
                    $('#costFamily').removeAttr('required');
                    $("#tr_costFamily").addClass("hidden"); // Расходы на семью:
                }
            }
            break;
   
        default:
            break;
    }

    numberInput = 0;
    refreshInputs();

}



function verify_card(id) {
    if (id == '') id = '0';
    document.getElementById("verify-id").value = id;
    window.document.forms['cardsForm'].submit();
    return false;
}

function widgetW4p(data) {
    console.log('on widget');
    var wayforpay = new Wayforpay();
    
    wayforpay.run(data,
        function (response) {
            // on approved             
            console.log('on approved');
        },
        function (response) {
            // on declined
            console.log('on declined');
        },
        function (response) {
            // on pending or in processing
            console.log('on pending or in processing');
        }
    );

}


function submitPay(isCurrentCard) {

    $('.js-btn-pay').attr('disabled', true);    // дизейблим кнопки оплат
    
    if (isCurrentCard == 1) {
        document.getElementById("isCurrentCard").value = "1";
    } else {
        document.getElementById("isCurrentCard").value = "0";
    }
        
    window.document.forms['form_pay'].submit();
    
    console.log('submitPay='+isCurrentCard);
    
    return false;
}


/**
 * обрабатывает изменение даты
 * @param string typeDate (Birthday | Passport)
 */
function onChangeDate(typeDate) {

    switch (typeDate) {
        case "Birthday":
            var strDate = document.getElementById('year').value + '-' + document.getElementById('month').value + '-' + document.getElementById('day').value; 
            var newDate = new Date(strDate);
            if(newDate == 'Invalid Date') {
                $("#spanErrorDateBirthday").removeClass("hidden");
                $("#dateBirthday").val("");
                $("#divErrorDateBirthday").find(".error_text").removeClass("hidden");
                $("#divErrorDateBirthday").children().addClass("has-error");
            } else {
                $("#spanErrorDateBirthday").addClass("hidden");
                $("#dateBirthday").val("newDate");
                $("#divErrorDateBirthday").find(".error_text").addClass("hidden");
                $("#divErrorDateBirthday").find(".has-error").removeClass("has-error");
            }
            break;
    
        case "Passport":
            var strDate = document.getElementById('PassportRegistrationYear').value + '-' + document.getElementById('PassportRegistrationMonth').value + '-' + document.getElementById('PassportRegistrationday').value; 
            console.log(strDate);
            console.log(new Date(strDate));
            var newDate = new Date(strDate);
            if(newDate == 'Invalid Date') {
                $("#spanErrorDatePassport").removeClass("hidden");
                $("#datePassport").val("");
                $("#divErrorDatePassport").find(".error_text").removeClass("hidden");
                $("#divErrorDatePassport").children().addClass("has-error");
            } else {
                $("#spanErrorDatePassport").addClass("hidden");
                $("#datePassport").val("newDate");
                $("#divErrorDatePassport").find(".error_text").addClass("hidden");
                $("#divErrorDatePassport").find(".has-error").removeClass("has-error");
            }
            break;
    }
    
}

function submit_credits_form(href, cred_id) {

    document.getElementById("cred_id").value = cred_id;
    document.getElementById("href").value = href;
        
    if(window.document.forms['credits_form'] != null) window.document.forms['credits_form'].submit();
    // window.document.forms['credits_form'].submit();
    
    console.log('credits_form submit');
    
    return false;
}

/**
 * обрабатывает изменение поля с Datepicker
 * @param string flag
 * @param string idDatepicker
 */
function onChangeDatepicker(flag, idDatepicker) {
    
    // console.log('onChangeDatepicker flag = '+ flag  + ' id = ' + idDatepicker);
    
    if (flag == 'onSelect') {
        var DateShow = $(idDatepicker).val();
        // сохраняем дату в правильном формате:
        $("#prolongationDdate").val(DateShow);
        DateShow = DateShow.substring(8, 10) + ' ' + getMonthLang(DateShow.substring(5, 7)) + ' ' + DateShow.substring(0, 4);
        // console.log('DateShow = '+ DateShow);
        $(idDatepicker).val(DateShow);
    }
}



//Сумма к  возврату на странице регистрации
var selectValue = parseInt($('#select-value').text());
var selectDay = parseInt($('#select-days').text());



//console.log(selectValue);
//console.log(selectDay);


function addDays(theDate, days) {

    return new Date(theDate.getTime() + days*24*60*60*1000); //обработка даты
}

var date = new Date();
var newDate = addDays(date, selectDay);
var getDay = date.setTime(newDate);
var countDay = date.getDate();
var arrMonth = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

 var procent = parseFloat($('.procent').text()); //получение %
 var procDay =  (selectValue / 100) * procent * selectDay;
 //console.log(procDay);
 var resultOfSum = selectValue + procDay;
 //console.log(resultOfSum);

 $('#give .resul-value').html( Math.round(resultOfSum)+'&#8372');
 $('#give .result-days').text(countDay  +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear());


 //Оформление кредита
 //$('#give .calculator-money').html( Math.round(resultOfSum)+'&#8372');
 //$('#give .calculator-days').text(countDay  +' ' +arrMonth[newDate.getMonth()]+' '+newDate.getFullYear());

