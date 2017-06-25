/*
 * jQuery Marquee modified (much slim down version)
 * from 
 * "jQuery liMarquee v 4.6
 * Copyright 2013, Linnik Yura | LI MASS CODE | http://masscode.ru
 * http://masscode.ru/index.php/k2/item/44-limarquee
 * Free to use
 * - 20.11.2014"
 * 
 * last Modified: 17.08.2015
 * -- Rachel
 */
(function ($) {
	var methods = {
		init: function (options) {
			var p = {
				loop: -1, 
				scrolldelay: 0,
				scrollamount: 130
			};
			
			if (options) {
				$.extend(p, options);
			}
			//instantiate by wrapping the div with relevant classes and setting the height, then clone it left and right so it seems like its continuing.
			return this.each(function () {
				var
					loop = p.loop,
					strWrap = $(this).addClass('str_wrap').data({scrollamount:p.scrollamount}),
					fMove = false;
					
				
				var code = function () {
					if(!$('.str_move',strWrap).length){
						strWrap.wrapInner($('<div>').addClass('str_move'));
					}
					
					var
					strMove = $('.str_move', strWrap).addClass('str_origin'),
					strMoveClone = strMove.clone().removeClass('str_origin').addClass('str_move_clone'),
					time = 0;

					var circCloneHor = function(){
						strMoveClone.clone().css({
							width: strMove.width()
						}).appendTo(strMove);
					}
					
					strWrap.height('60px')
				
					strMove.css({
							left: -strWrap.width()
						});
					strWrap.height(strMove.outerHeight());
					
					circCloneHor();
					var leftPos = -(strMove.width());
					
					var
						strMoveLeft = strWrap.width(),
								k1 = 0,
								timeFunc1 = function () {
									var
									fullS = Math.abs(leftPos),
									time = (fullS / strWrap.data('scrollamount')) * 1000;
									if (parseFloat(strMove.css('left')) != 0) {
										fullS = (fullS + strWrap.width());
										time = (fullS - (strWrap.width() - parseFloat(strMove.css('left')))) / strWrap.data('scrollamount') * 1000;
									}
									return time;
								},
								moveFuncId1 = false,
								moveFunc1 = function () {
									if (loop != 0) {
										strMove.stop(true).animate({
											left: leftPos
										}, timeFunc1(), 'linear', function () {
											$(this).css({
												left:0
											});
											if (loop != -1) {
												loop--;
											}
											moveFuncId1 =  setTimeout(moveFunc1, p.scrolldelay);
										});
									}
								};
								strWrap.data({
									moveId: moveFuncId1	,
									moveF : moveFunc1
								})
								moveFunc1();
					
						};
						
					code();
					
					strWrap.data({
						ini:code
					})
					
			});
		},
		update: function () {
			var el = $(this);
			var str_origin = $('.str_origin',el);
			var str_move_clone = $('.str_move_clone',el);
			str_origin.stop(true);
			str_move_clone.remove();
			el.data('ini')();
		},
		destroy: function () {
			
			var el = $(this);
			var elMove = $('.str_move',el);
			
			$('.str_move_clone',el).remove();
			
			elMove.stop(true);

			if(elMove.length){
				var context = elMove.html();
				elMove.remove();
				el.html(context);
			}
	
		},
		pause: function(){	
			var el = $(this);
			var elMove = $('.str_move',el);
			elMove.stop(true);
		}, 
		play: function(){
			var el = $(this);
			el.data('moveF')();	
			
		}		
	};
	$.fn.coyMarquee = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('method ' + method + ' in this function does not exist');
		}
	};
})(jQuery);