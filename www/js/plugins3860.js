// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

$(document).ready(function() {
    var mobile = ($(window).width() <= 960)?true:false;
    var phone = ($(window).width() <= 480)?true:false;

    // slider
    if ($('.slider').length) {
        $('.slider').slick({
            slide: 'div',
            dots: true
        });
    }

    if (!phone && $('.promotion.js-slider').length) {

        $('.promotion.js-slider').slick({
            slide: '.slide',
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    if ($('.js-testimonials').length) {
        $('.js-testimonials').slick({
            slide: '.testimonials-item',
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    // selectize
    if ($('.js-carModel').length) {
        $('.js-carModel').selectize({
           plugins: ['remove_button'],
            labelField: 'model',
            valueField: 'model',
            searchField: ['model'],
            delimiter: ',',
            persist: false,
            maxOptions:5,
            maxItems: 5,
            isSearch:1,
            onItemAdd: function(){this.blur()},
            create: function(input) {
                return {
                    "model": input,
                    "id": input
                }
            },
            load: function(query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: '/carModelsList?model='+encodeURIComponent(query),
                    dataType: 'json',
                    success: function(res) {
                        callback(res);
                    }
                })
            }
        });
    }
    
	// selectize
    if ($('.js-carModel-form').length) {
    	 $('.js-carModel-form').selectize({
             plugins: ['remove_button'],
              labelField: 'model',
              valueField: 'model',
              searchField: ['model'],
              delimiter: ',',
              persist: false,
              maxOptions:5,
              maxItems: 5,
              onItemAdd: function(){this.blur()},
              create: function(input) {
                  return {
                      "model": input,
                      "id": input
                  }
              },
              load: function(query, callback) {
                  if (!query.length) return callback();
                  $.ajax({
                      url: '/carModelsList?model='+encodeURIComponent(query),
                      dataType: 'json',
                      success: function(res) {
                          callback(res);
                      }
                  })
              }
          });
    }
    if ($('.js-carModel-homepage').length) {
        $('.js-carModel-homepage').selectize({
           plugins: ['remove_button'],
            labelField: 'model',
            valueField: 'model',
            searchField: ['model'],
            delimiter: ',',
            isSearch:1,
            persist: false,
            maxOptions:5,
            maxItems: 5,
            dropdownParent:'body',
            onItemAdd: function(){this.blur()},
            create: function(input) {
                return {
                    "model": input,
                    "id": input
                }
            },
            load: function(query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: '/carModelsList?model='+encodeURIComponent(query),
                    dataType: 'json',
                    success: function(res) {
                        callback(res);
                    }
                })
            }
        });
    }
    
    $('.js-carType').selectize({
        plugins: ['remove_button'],
        onItemAdd: function(){this.blur()}
    });

    // datepicker

    var datepickerConfig = {
        firstDay: 1,
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        minDate: 0,
        maxDate: '+3m',
        nextText: '',
        prevText: '',
        dateFormat: 'd M yy'
    }

    $('.js-datepicker-single').datepicker(datepickerConfig);

    var datepickerConfigGroup = {};
    $.extend(datepickerConfigGroup, datepickerConfig, {
        onSelect: function(selectedDate){
        	if($(this).closest('.js-datepicker-group').find(".js-datepicker-from").val() && (new Date($(this).closest('.js-datepicker-group').find(".js-datepicker-from").datepicker("getDate")).getTime()) > (new Date(selectedDate).getTime())){
        		$(this).closest('.js-datepicker-group').find(".js-datepicker-from").datepicker("setDate",selectedDate);
        	}
            if(($(this).closest('.js-datepicker-group').find('.js-datepicker-panel')).length) {
                fillPanelDate(this);
            }
        },
        beforeShowDay: highlightDates,
        numberOfMonths: (mobile?1:2)
    });

    var datepickerConfigGroupFrom = {};
    $.extend(datepickerConfigGroupFrom, datepickerConfigGroup, {
        onSelect: function( selectedDate ) {
        	if($(this).closest('.js-datepicker-group').find(".js-datepicker-to").val() && (new Date($(this).closest('.js-datepicker-group').find(".js-datepicker-to").datepicker("getDate")).getTime()) < (new Date(selectedDate).getTime())){
        		$(this).closest('.js-datepicker-group').find(".js-datepicker-to").datepicker("setDate",selectedDate);
        	}
        	//$(this).closest('.js-datepicker-group').find(".js-datepicker-to").datepicker( "option", "minDate", selectedDate);
            showSecond = true;
            if(($(this).closest('.js-datepicker-group').find('.js-datepicker-panel')).length) {
                fillPanelDate(this);
            }
        },
        onClose: function() {
            if (typeof showSecond !== 'undefined' && showSecond === true){
                $(this).closest('.js-datepicker-group').find(".js-datepicker-to").datepicker('show');
                showSecond = false;
            }
        }
    });

    $('.js-datepicker-from').datepicker(datepickerConfigGroupFrom);
    $('.js-datepicker-to').datepicker(datepickerConfigGroup);


    var datepickerConfigProxy = {};
    $.extend(datepickerConfigProxy, datepickerConfig, {
        showOn: 'button',
        dateFormat: 'dd/mm/yy',
        buttonText: '',
        onSelect: function(date) {
            date = date.split("/");
            var $thisGroup = $(this).closest('.js-datepicker-split');
            $thisGroup.find('.js-datepicker-split-day').val(date[0]);
            $thisGroup.find('.js-datepicker-split-month').val(date[1]);
            $thisGroup.find('.js-datepicker-split-year').val(date[2]);
        }
    });

    $('.js-datepicker-proxy').datepicker(datepickerConfigProxy);

    function highlightDates(date) {
        var $group = $(this).closest('.js-datepicker-group');
        var fromDate = $group.find('.js-datepicker-from').datepicker('getDate');
        var toDate = $group.find('.js-datepicker-to').datepicker('getDate');

        if (fromDate && toDate) {
            if (date > fromDate && date < toDate){
                return [true,'ui-highlight',''];
            }
            else if ( ($(this).hasClass('js-datepicker-from') && date.toString() === toDate.toString()) || ($(this).hasClass('js-datepicker-to') && date.toString() === fromDate.toString()) ){
                return [true,'ui-state-active-other',''];
            }
        }
        else if (fromDate) {
            if ($(this).hasClass('js-datepicker-to') && date.toString() === fromDate.toString()){
                return [true,'ui-state-active-other',''];
            }
        }
        else if (toDate) {
            if ($(this).hasClass('js-datepicker-from') && date.toString() === toDate.toString()){
                return [true,'ui-state-active-other',''];
            }
        }

        return [true, '','']
    }

    function fillPanelDate(el){
        var selectedDate = $(el).datepicker('getDate');
        selectedDate = moment(selectedDate).format('D/MMMM/YYYY');
        var dateArray = selectedDate.split("/");
        $thisPanel = $(el).closest('.js-datepicker-panel');
        $thisPanel.find('.js-datepicker-panel-day').text(dateArray[0]);
        $thisPanel.find('.js-datepicker-panel-month').text(dateArray[1]);
        $thisPanel.find('.js-datepicker-panel-year').text(dateArray[2]);
    }

    if ($('.js-datepicker-panel').length){
        $('.js-datepicker-panel').find('.js-datepicker-from').datepicker('setDate', new Date());
        var toDate = moment().add(1,'d').toDate();
        $('.js-datepicker-panel').find('.js-datepicker-to').datepicker('setDate', toDate);
        fillPanelDate($('.js-datepicker-from')[0]);
        fillPanelDate($('.js-datepicker-to')[0]);
        $('.js-datepicker-panel').on('click',function(){
            $(this).find('.js-datepicker-from, .js-datepicker-to').datepicker('show');
        });
    }

    $(window).resize($.debounce(250, function(){
        if ($(window).width() <= 960){
            $('.js-datepicker-from, .js-datepicker-to').datepicker('option', 'numberOfMonths', 1);
        }
        else {
            $('.js-datepicker-from, .js-datepicker-to').datepicker('option', 'numberOfMonths', 2);

        }

    }));
    
    if($('.resTable').length){
    	
    	var headertext = [],
    	headers = document.querySelectorAll(".resTable th"),
    	tablerows = document.querySelectorAll(".resTable th"),
    	tablebody = document.querySelector(".resTable tbody");

    	for(var i = 0; i < headers.length; i++) {
    	  var current = headers[i];
    	  headertext.push(current.textContent.replace(/\r?\n|\r/,""));
    	} 
    	for (var i = 0, row; row = tablebody.rows[i]; i++) {
    	  for (var j = 0, col; col = row.cells[j]; j++) {
          	if(typeof headertext[j] === 'undefined'){
        		headertext[j]='';
        	} 
    	    col.setAttribute("data-th", headertext[j]);
    	  } 
    	}
    }
    $('.card-figure img').error(function(){
        $(this).attr('src', '/images/default/carpic-cards.jpg');
    });
});