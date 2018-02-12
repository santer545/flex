// console.log("Скрипт test работает");

// var parent_url = decodeURIComponent(document.location.hash.replace(/^#/, ''));
var parent_url = decodeURIComponent(document.location.hash);
// var parent_url =  decodeURIComponent(document.location.href.replace(/^.*Href=/, ''));
// console.log('parent_url = ' + parent_url);

function send(msg) {
	console.log(parent_url);
	XD.postMessage(msg, parent_url, parent);
}

function resize_canvas() {
	console.log('resize_canvas');
	// send($('body').height());
}

/* 
 * a backwards compatable implementation of postMessage
 * by Josh Fraser (joshfraser.com)
 * released under the Apache 2.0 license.  
 *
 * this code was adapted from Ben Alman's jQuery postMessage code found at:
 * http://benalman.com/projects/jquery-postmessage-plugin/
 * 
 * other inspiration was taken from Luke Shepard's code for Facebook Connect:
 * http://github.com/facebook/connect-js/blob/master/src/core/xd.js
 *
 * the goal of this project was to make a backwards compatable version of postMessage
 * without having any dependency on jQuery or the FB Connect libraries
 *
 * my goal was to keep this as terse as possible since my own purpose was to use this 
 * as part of a distributed widget where filesize could be sensative.
 * 
 */

// everything is wrapped in the XD function to reduce namespace collisions
var XD = function(){
  
    var interval_id,
    last_hash,
    cache_bust = 1,
    attached_callback,
    window = this;
    
    return {
        postMessage : function(message, target_url, target) {
            
           console.log('postMessage test');

           if (!target_url) { 
                return; 
            }
    
            target = target || parent;  // default to parent
    
            if (window['postMessage']) {
                // the browser supports window.postMessage, so call it with a targetOrigin
                // set appropriately, based on the target_url parameter.
                target['postMessage'](message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1'));

            } else if (target_url) {
                // the browser does not support window.postMessage, so set the location
                // of the target to target_url#message. A bit ugly, but it works! A cache
                // bust parameter is added to ensure that repeat messages trigger the callback.
                target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
            }
        },
  
        receiveMessage : function(callback, source_origin) {
            
            // console.log('receiveMessage test');

            // browser supports window.postMessage
            if (window['postMessage']) {
                // bind the callback to the actual event associated with window.postMessage
                if (callback) {
                    attached_callback = function(e) {
                        if ((typeof source_origin === 'string' && e.origin !== source_origin)
                        || (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
                        	console.log('return false source_origin = ' + source_origin + " e.origin = " + e.origin);
                        	return !1;
                        }
                        callback(e);
                    };
                }
                if (window['addEventListener']) {
                    window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
                } else {
                    window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
                }
            
            } else {
                // a polling loop is started & callback is called whenever the location.hash changes
                interval_id && clearInterval(interval_id);
                interval_id = null;

                if (callback) {
                    interval_id = setInterval(function(){
                        var hash = document.location.hash,
                        re = /^#?\d+&/;
                        if (hash !== last_hash && re.test(hash)) {
                            last_hash = hash;
                            callback({data: hash.replace(re, '')});
                        }
                    }, 100);
                }
            }   
        }
    };
}();

function createWidget(config) {
	
	// console.log("Скрипт createWidget работает");
	
	var Util = {
		extendObject: function(a, b) {
			for(prop in b){
				a[prop] = b[prop];
			}
			return a;
		},
		proto: 'https:' == document.location.protocol ? 'https://' : 'http://'
	}

	var options = Util.extendObject({
		sat_id: 0,
		// domain: "dev.mycredit.com.ua/ru/satellites/registration",
		domain: "mycredit.ua/ru/satellites/registration",
		// bg_color: "FFFFFF",
		container_id: '',
		money: 51,
		days: 9,
		width: '100%',
		height: '100%'
	}, config);

	//options.widget_url = [Util.proto, options.domain, "/?", "id=", options.id, "&bg_color=", options.bg_color].join("");
	options.widget_url = [
		Util.proto, options.domain, "/?", "sat_id=", options.sat_id, "&money=", options.money, "&days=", options.days, 
	].join("");
	// options.widget_url += "#" + encodeURIComponent(document.location.href);
	// options.widget_url += "#" + (document.location.href);
	 options.widget_url += "&parentUrl=" + encodeURIComponent(document.location.href) + '/';
	// options.widget_url += "#" + (document.location.href);
	// options.widget_url = "#" + (document.location.href);
	
	// console.log("options.widget_url = " + options.widget_url);
	// console.log(options);

	Widget = {
		created: false,
		widgetElement: null,
		show: function() {
			if (this.created)
				return;
			this.widgetElement = document.createElement('div');
			this.widgetElement.setAttribute('id', 'widget_container');
			this.widgetElement.setAttribute('class',"embed-responsive embed-responsive-16by9");

			this.widgetElement.innerHTML = ' \
				<iframe class="embed-responsive-item" id="widget_iframe" src="' + options.widget_url 
					+ '" scrolling="yes" width="' + options.width 
					+ '" height="' + options.height + '" frameborder="0"></iframe>';

/*			
			this.widgetElement.innerHTML = ' \
				<iframe class="" id="widget_iframe" src="' + options.widget_url 
					+ '" scrolling="no" width="' + options.width 
					+ '" height="' + options.height + '" frameborder="0"></iframe>';
*/
			if (options.container_id && document.getElementById(options.container_id)) {
				document.getElementById(options.container_id).appendChild(this.widgetElement);
			} else {
				document.body.insertBefore(this.widgetElement, document.body.nextSibling);
			}
			this.widgetElement.style.display = 'block';
			this.widgetElement.style.height = '100vh';
			this.created = true;
		}
	}

	XD.receiveMessage(function(message) {
		console.log("message = " + message.data);
		if (message.data > 0 && document.getElementById("widget_iframe"))
		{
			document.getElementById("widget_iframe").height = message.data;
			// console.log("высота " + message.data + " прописана");
		}
	// }, Util.proto + options.domain);
	// }, Util.proto + options.domain.replace( /([^:]+:\/\/[^\/]+).*/, '$1'));
	}, (Util.proto + options.domain).replace( /([^:]+:\/\/[^\/]+).*/, '$1'));

	Widget.show();

}

//resize_canvas();
// createWidget(widgetOptions);
