var file = document.getElementById('wish-file');
var fileName;
var fileBody;
var fileBodyPath;
var fileBodyInverse;
var fileSize;

if (file) {
    file.addEventListener('change', function() {
        fileName = document.getElementById('wish-file').files[0].name;
        fileBodyPath = document.getElementById('wish-file').value;
    });
}



// 1 вариант

function previewFile() {
    var filePath = document.getElementById('wish-file').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        var path = reader.result;
        document.getElementById('loadFile').value = path;
    }
}



file.addEventListener('change', function() {
    previewFile();
});


// 2 вариант
function wishSend_Rez() {


    var name = document.getElementById('wish-name').value;
    var email = document.getElementById('wish-email').value;
    var phone = document.getElementById('wish-phone').value;
    var dream = document.getElementById('wish-heading').value;
    var dream_details = document.getElementById('wish-text').value;










    /*File.prototype.convertToBase64 = function(callback) {

        var FR = new FileReader();
        FR.onload = function(e) {
            callback(e.target.result)
        };
        FR.readAsDataURL(this);

        

    }
    var selectedFile = this.files[0];
    var ttt = selectedFile.convertToBase64(function(base64));
    console.log(ttt);*/








    Array.prototype.forEach.call(file.files, function(fileItem) {
        var y = document.getElementById('wish-file').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function() {
            fileContent = reader.result;

            fileContent = new Uint8Array(fileContent);

            str = '';

            for (i = 0; i < fileContent.length; i++) {
                str += String.fromCharCode(fileContent[i]);
            }
            
            if (loadFile) {
                document.getElementById('loadFile').value = str;
            }

            function b64EncodeUnicode(str) {
                // first we use encodeURIComponent to get percent-encoded UTF-8,
                // then we convert the percent encodings into raw bytes which
                // can be fed into btoa.
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    }));
            }

            var finalStr = b64EncodeUnicode(str);
            console.log(finalStr);
            if (loadFile) {
                document.getElementById('loadFile').value = finalStr;
            }

        });

        reader.readAsArrayBuffer(fileItem);
    });







    var url = "/ru/?ajax";

    setTimeout(function() {




        var data = {
            typeData: 'addDream',
            phone: phone,
            email: email,
            name: name,
            dream: dream,
            dream_details: dream_details,
            fileName: fileName,
            fileBody: document.getElementById('loadFile').value
        };

        console.log(data);


        $.ajax({
            url: url,
            type: 'POST',
            data: { data: data },
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
                                    document.getElementById('ajaxServerError').innerHTML = 'Вы пытаетесь загрузить файл слишком большого размера (рекоммендуемы размер 100kb)';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Ви намагаетеся завантажити файл великого розміру (рекомендовано файл до 100kb)';
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
                                    document.getElementById('ajaxServerError').innerHTML = 'Такая мечта уже существует';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Така мрія вже існує';
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


                $("#div_waiting").addClass("hidden");
                // $("#button_sendCard").removeAttr("disabled");
            }
        });
    }, 1000);
}