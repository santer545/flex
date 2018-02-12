$(document).ready(function() {
    februaryValidate();
    customInput();
    setLike();
    $('.wish-text').jScrollPane({
        arrowScrollOnHover: true
    });
});


function wishSend() {

    var $input = $("#wish-file");
    var fd = new FormData;

    fd.append('typeData', 'addDream');
    fd.append('loadFile', $input.prop('files')[0]);
    fd.append('name', document.getElementById('wish-name').value);
    fd.append('email', document.getElementById('wish-email').value);
    fd.append('phone', document.getElementById('wish-phone').value);
    fd.append('dream', document.getElementById('wish-heading').value);
    fd.append('dream_details', document.getElementById('wish-text').value);

    var url = "/ru/?ajax";

    $.ajax({
        url: url,
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json',
        success: function(json) {
            if (json) {
                var js = json;
                var lang = document.getElementById('lang').innerText;
                console.log(js);
                if (js.message == 'OK') {
                    // envelop animations
                    $('.envelop-wrapper').addClass('active');

                    setTimeout(function() {
                        $('.envelop-inverse').css('visibility', 'visible');
                    }, 3000);
                    setTimeout(function() {
                        $('.envelop-typing').addClass('active');
                    }, 3500);
                    setTimeout(function() {
                        $('.envelop-wrapper').addClass('z-index');
                    }, 1000);
                    setTimeout(function() {
                        $('.envelop-wrapper').addClass('sended');
                        $('.mail-box-top').addClass('opened');
                        $('.mail-box').addClass('opened');
                    }, 4000);
                    setTimeout(function() {
                        $('.mail-box-top').removeClass('opened');
                        $('.mail-box').removeClass('opened');
                        $('.february-final').addClass('active');
                    }, 7000);
                    setTimeout(function() {
                        $('.envelop-letter').css({ 'overflow': 'hidden', 'height': '100px', 'opacity': '0' });
                    }, 300);
                } else {
                    document.getElementById('ajaxServerError').classList.remove('hidden');
                    switch (js.errorType) {
                        case 'NoData':
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Не хватает данных';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Не вистачає даних';
                            }
                            break;
                        case 'NoTemplateEmail':
                            $('[type="email"]').closest('div').addClass('has-error').removeClass('has-success');
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Не правильный email';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Не вірний email';
                            }
                            break;
                        case 'existPhone':
                            $('[type="tel"]').closest('div').addClass('has-error').removeClass('has-success');
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Пользователь с таким телефоном уже существует';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Користувач с таким телефоном вже існує';
                            }
                            break;
                        case 'existEmail':
                            $('[type="email"]').closest('div').addClass('has-error').removeClass('has-success');
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Пользователь с таким email уже существует';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Користувач с таким email вже існує';
                            }
                            break;
                        case 'maxFileSize':
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Вы пытаетесь загрузить файл слишком большого размера (рекоммендуемы размер до 200kb)';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Ви намагаетеся завантажити файл великого розміру (рекомендовано файл до 200kb)';
                            }
                            break;
                        case 'errorPutFile':
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Ошибка загрузки файла';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Помилка завантаження файлу';
                            }
                            break;
                        case 'errorPutDream':
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Ваша мечта не записалась';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Вашу мрію не зафіксовано';
                            }
                            break;
                        case 'existDream':
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Вы уже являетесь участником акции';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Ви вже є учасником акції';
                            }
                            break;
                        case 'NoFileType':
                            if (lang == 'ru') {
                                document.getElementById('ajaxServerError').innerHTML = 'Картинка должна быть в одном из трех форматов(jpg, png, gif)';
                            } else {
                                document.getElementById('ajaxServerError').innerHTML = 'Картинка повинна бути в одному з трьох форматів(jpg, png, gif)';
                            }
                            break;
                        default:
                            document.getElementById('ajaxServerError').innerHTML = 'Системная ошибка. Повторите свой запрос еще раз!';
                            break;
                    }
                    /*document.getElementById('ajaxServerError').innerHTML = js.error;*/
                }
            };
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Сообщение об ошибке от сервера: ' + textStatus); // вывод JSON в консоль
        }
    });
}




function customInput() {
    document.querySelector("html").classList.add('js');

    var fileInput = document.getElementById("wish-file"),
        button = document.querySelector(".input-file-trigger"),
        the_return = document.querySelector(".file-return");
    if (button && fileInput) {
        button.addEventListener("keydown", function(event) {
            if (event.keyCode == 13 || event.keyCode == 32) {
                fileInput.focus();
            }
        });
        button.addEventListener("click", function(event) {
            fileInput.focus();
            return false;
        });
        fileInput.addEventListener("change", function(event) {
            if (document.getElementById('wish-file').files[0].size > 200000) {
                console.log('to much!');
                the_return.classList.remove('file-return');
                the_return.classList.add('error-text');
                the_return.innerHTML = 'Ваш файл весит слишком много(рекомендуемый размер не больше 100 килобайт!)';
                document.getElementById('wish-file').value = '';
            } else {
                the_return.classList.add('file-return');
                the_return.classList.remove('error-text');
                the_return.innerHTML = this.files[0].name;
            }
        });
    }
}




function februaryValidate() {
    // validate
    $('.js-wish').on("click", function() {

        if (validate($(this).parents('.envelop-wrapper').find(".js_validate"))) {

            // Ajax send
            wishSend();



        }

        return validate($(this).parents('.envelop-wrapper').find(".js_validate"));
    });
}



function setLike() {
    var like = document.getElementsByClassName('wish-like');
    for (i = 0; i < like.length; i++) {
        like[i].addEventListener('click', function(e) {

            if (!this.classList.contains("active")) {
                this.classList.add("active");

                var dreamId = $(this).closest('form').find('.js-dream').val();
                var url = "/ru/?ajax";
                var data = {
                    typeData: 'addDreamLike',
                    dreamId: dreamId
                };

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: { data: data },
                    dataType: 'json',
                    success: function(json) {
                        if (json) {
                            var js = json;
                            // console.log(js);
                            if (js.message == 'OK') {
                                $("#dreams-rating-" + dreamId).val(js.rating);
                                $("#span-rating-" + dreamId).text(js.rating);
                            }
                        };
                    },

                    error: function(jqXHR, textStatus, errorThrown) {
                        // console.log(jqXHR); // вывод JSON в консоль
                        console.log('Сообщение об ошибке от сервера: ' + textStatus); // вывод JSON в консоль
                        // console.log(errorThrown); // вывод JSON в консоль
                    }
                });
            }
        });
    }
}