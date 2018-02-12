(function($){"use strict";var w=window,doc=document,maxTopPos,minTopPos,defaults={scrollArea:w,duration:200,lockBottom:true,delay:0,easing:'linear',stickToBottom:false,cssTransition:false},supportsTransitions=(function(){var i,s=doc.createElement('p').style,v=['ms','O','Moz','Webkit'],prop='transition';if(s[prop]=='')return true;prop=prop.charAt(0).toUpperCase()+prop.slice(1);for(i=v.length;i--;)
if(s[v[i]+prop]=='')
return true;return false;})(),Sticky=function(settings,obj){this.settings=settings;this.obj=$(obj);};Sticky.prototype={init:function(){if(this.obj.data('_stickyfloat'))
return false;var that=this,raf=w.requestAnimationFrame||w.webkitRequestAnimationFrame||w.mozRequestAnimationFrame||w.msRequestAnimationFrame||function(cb){return w.setTimeout(cb,1000 / 60);};$(w).ready(function(){that.rePosition(true);$(that.settings.scrollArea).on('scroll.sticky',function(){raf($.proxy(that.rePosition,that));});$(w).on('resize.sticky',function(){raf(that.rePosition.bind(that))});});this.obj.data('_stickyfloat',that);},rePosition:function(quick,force){var $obj=this.obj,settings=this.settings,objBiggerThanArea,objFartherThanTopPos,pastStartOffset,duration=quick===true?0:settings.duration,setActive=true,areaScrollTop=this.settings.scrollArea==w?w.scrollY?w.scrollY:doc.documentElement.scrollTop:this.settings.scrollArea.scrollTop,areaHeight=this.settings.scrollArea==w?doc.documentElement.offsetHeight:this.settings.scrollArea.offsetHeight;this.areaViewportHeight=this.settings.scrollArea==w?doc.documentElement.clientHeight:this.settings.scrollArea.clientHeight;this.stickyHeight=$obj[0].clientHeight;$obj.stop();if(settings.lockBottom)
maxTopPos=$obj[0].parentNode.clientHeight-this.stickyHeight-settings.offsetBottom;if(maxTopPos<0)
maxTopPos=0;pastStartOffset=areaScrollTop>settings.startOffset;objFartherThanTopPos=$obj.offset().top>(settings.startOffset+settings.offsetY);objBiggerThanArea=this.stickyHeight>this.areaViewportHeight;if(((pastStartOffset||objFartherThanTopPos)&&!objBiggerThanArea)||force){this.newpos=areaScrollTop-settings.startOffset+settings.offsetY;if(settings.stickToBottom)
this.newpos+=this.areaViewportHeight-this.stickyHeight-settings.offsetY*2;if(this.newpos>maxTopPos&&settings.lockBottom){this.newpos=maxTopPos;setActive=false;}
if(this.newpos<settings.offsetY){this.newpos=settings.offsetY;setActive=false;}
else if(areaScrollTop<settings.startOffset&&!settings.stickToBottom)
this.newpos=settings.offsetY;$obj.toggleClass('sf--active',setActive);if(duration<5||(settings.cssTransition&&supportsTransitions))
$obj[0].style.top=this.newpos+'px';else
$obj.stop().delay(settings.delay).animate({top:this.newpos},duration,settings.easing);this.settings.onReposition&&this.settings.onReposition(this);}},update:function(opts){if(typeof opts==='object'){if(!opts.offsetY||opts.offsetY=='auto')
opts.offsetY=getComputed(this.obj).offsetY;if(!opts.startOffset||opts.startOffset=='auto')
opts.startOffset=getComputed(this.obj).startOffset;this.settings=$.extend({},this.settings,opts);this.rePosition(false,true);}
return this.obj;},destroy:function(){$(this.settings.scrollArea).off('scroll.sticky');$(w).off('resize.sticky');this.obj.removeData();return this.obj;}};function getComputed($obj){var p=$obj.parent(),ob=parseInt(p.css('padding-bottom')),oy=parseInt(p.css('padding-top')),so=p.offset().top;return{startOffset:so,offsetBottom:ob,offsetY:oy};}
$.fn.stickyfloat=function(option,settings){return this.each(function(){var $obj=$(this);if(typeof document.body.style.maxHeight=='undefined')
return false;if(typeof option==='object')
settings=option;else if(typeof option==='string'){if($obj.data('_stickyfloat')&&typeof $obj.data('_stickyfloat')[option]=='function'){var sticky=$obj.data('_stickyfloat');return sticky[option](settings);}
else
return this;}
var $settings=$.extend({},defaults,getComputed($obj),settings||{});var sticky=new Sticky($settings,$obj);sticky.init();});};})(jQuery);