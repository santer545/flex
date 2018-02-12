/**
 * Файл с набором функций на JavaScript для работы с новогодними акциями
 * 
 * @author Игорь Стебаев <Stebaevin@gmail.com>
 * @copyright Copyright (c) 2017 Mycredit Company
 * @version 1.0
 * @package DesignAPI
 * @link http://www
 */

// объект для соц.сетей:
Share = {
  getParams: function(params) {
    // используем полученные параметры, 
    // либо создаем пустой объект, чтобы не было ошибок
    params = params || {};
    // в качестве url используем params.url,
    // либо адрес текущей страницы (window.location.href), если params.url не указан
    params.url = params.url || window.location.href;
    // используем params.title, либо заголовок документа
    params.title = params.title || document.title;
    // и т.п.
    params.description = params.description || '';
    params.img = params.img || '';

    return params;
  },

  vkontakte: function(params) {
    params = Share.getParams(params);
    url = 'http://vkontakte.ru/share.php?';
    url += 'url=' + encodeURIComponent(params.url);
    url += '&title=' + encodeURIComponent(params.title);
    url += '&description=' + encodeURIComponent(params.description);
    url += '&image=' + encodeURIComponent(params.img);
    url += '&noparse=true';
    Share.popup(url);
  },

  facebook: function(params) {
  	params = Share.getParams(params);
    url = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent(params.title);
    url += '&p[summary]=' + encodeURIComponent(params.description);
    url += '&p[url]=' + encodeURIComponent(params.url);
    url += '&p[images][0]=' + encodeURIComponent(params.img);
    Share.popup(url);
  },

  twitter: function(params) {
    params = Share.getParams(params);
    url = 'http://twitter.com/share?';
    url += 'text=' + encodeURIComponent(params.description);
    url += '&url=' + encodeURIComponent(params.img);
    url += '&counturl=' + encodeURIComponent(params.img);
    Share.popup(url);
  },

  popup: function(url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }
};

$(document).ready(function() {
	
    $('.js-btn-send').click(function() {

    	// console.log("js-btn-send");

    	var action = $(this).closest('form').find('input[name=Action]').val();
    	var email = $(this).closest('form').find('input[type=email]').val();
    	var tel = $(this).closest('form').find('input[type=tel]').val();

    	// console.log(action);
    	// console.log(email);
    	// console.log(tel);

    	if (validate($(this).closest('form'))) { 
    	
    		$("[name=email]").val(email);
    		$("[name=tel]").val(tel);
    		
    		var data = {
    				typeData: 'sendClientContactInfo',
    				Name: 'UserForAction',
      				Phone: tel,
      				Email: email,
    				Action: action
    			};
				
    		// отправить массив на сервер
    		// console.log("Передаем запрос 'sendClientContactInfo'");
    		sendAjax(data);
    		
    		$(this).closest('.modal.fade').modal('hide');
    	}
    });
 
    $('.js-facebook').click(function() {
    	openFacebook();
    });
 
    $('.js-google').click(function() {
    	openGoogle();
    });
 
    // событие на поле Телефон:
    $('input[type=tel]').keyup(function(event) {
    	onKeyUpPhone(event);
    });
 
});

/**
 * проверяет вводимый телефон
 * @param idPhone id поля input
 * @returns {Boolean}
 */
function onKeyUpPhone(event) {

	var tel = event.target;
	
	var arrPrefix = ['39','50','63', '66', '67', '68', '73', '91','92', '93', '95', '96', '97', '98', '99'];
	var str = $(tel).val();
	var strNum = str.replace(/\D+/g,"");	// оставляем только цифры
	
	// console.log('str='+str);
	
	if (strNum.length > 4) {
		var flag = false; // признак недопустимости номера
		
		if (str.substring(0, 4) !== '+380') {
			flag = true;
		} else {
			var prefix = strNum.substring(3, 5);	// префикс оператора
			flag = true;
			// массив префиксов мобильных телефонов:
			arrPrefix.forEach(function(item, i, arr) {
				//console.log('item='+item);
				if (item == prefix) flag = false;
			});
		}
		
		// если недопустимый номер:
		if (flag) {
			$(tel).val("+380");	// начальное значение
			strNum = '380';
			$(tel).mask("+38999 999 9999", {
	            autoclear: false
	        });
			$(tel).focus();	// установить фокус
			$(tel).selectionStart = 4;	// позиция курсора 
		}

	} else {
		if (strNum.length < 4) {
			$(tel).val("+380");	// начальное значение
			$(tel).mask("+38999 999 9999", {
	            autoclear: false
	        });
			$(tel).focus();	// установить фокус
			$(tel).selectionStart = 4;	// позиция курсора 
		}
	}
	
	return true;
}

/**
 * запускает процесс перехода в Facebook 
 * @returns
 */
function openFacebook() {
	// myWin = open("http://www.facebook.com/sharer.php?u=https://mycredit.ua/ru/novyiy-god-s-mycredit/","displayWindow","width=520,height=300,left=350,top=170,status=no,toolbar=no,menubar=no");
	
	Share.facebook({
		url: 'https://goo.gl/6fAm7F', 
		title: 'Новогодняя страна MyCredit', 
		description: 'Я нашел все подарки в Новогодней стране MyCredit! Попробуй и ты:',
		img: 'https://mycredit.ua/assets/images/facebook-share.png'
	});
	
	/*
	var url = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent('Новогодняя страна MyCredit');
    url += '&p[summary]=' + encodeURIComponent('Я нашел все подарки в Новогодней стране MyCredit! Попробуй и ты:');
    url += '&p[url]=' + encodeURIComponent('https://goo.gl/6fAm7F');
    //url += '&p[images][0]=' + encodeURIComponent(params.img);
	myWin = open(url, "displayWindow","width=520,height=300,left=350,top=170,status=no,toolbar=no,menubar=no");
	*/
	return false;
}

/**
 * запускает процесс перехода в Google+ 
 * @returns
 */
function openGoogle() {
	myWin = open("http://plus.google.com/share?url=https://mycredit.ua/ru/novyiy-god-s-mycredit/","displayWindow","width=520,height=300,left=350,top=170,status=no,toolbar=no,menubar=no");
	return false;
}

/**
 * отсылает data через ajax на локальный сервер
 * @param url
 */
function sendAjax(data) {
	
	var url = "/ru/?ajax";	

	// отправить массив на сервер
	// console.log("Передаем запрос ajax " + url);
	// console.log("Передаем запрос ajax " + data.typeData);

	$.ajax({
		url: url,
		type: 'POST',
		data: {data: data},
		dataType: 'json',
		success: function(json){
			if(json) {
				//var js = JSON.parse(json);
				var js = json;
				
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

