$(document).ready(function(){

    var mobile = ($(window).width() <= 960)?true:false;

    // Dropdown
    $('.js-dropdown .js-dropdown-toggle').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parent('.js-dropdown').toggleClass('is-expanded');
        $('.js-dropdown.is-expanded').not($(this).parent()).removeClass('is-expanded');
    });

    $(document).on('click', function(){
        $('.js-dropdown').removeClass('is-expanded');
    });

    // Toggle
    $('.js-toggle').on('click', '.js-toggle-button', function(e){
        if (!$(this).hasClass('checker')){
            e.preventDefault();
        }
        else if (!$(e.target).is('input')){
            return;
        }
       $(this).closest('.js-toggle').toggleClass('is-expanded').siblings('.is-expanded').removeClass('is-expanded');
        if ($(this).closest('.js-toggle').hasClass('js-toggle--mobile')){
            $('body').css('overflow','hidden');
        }
        e.stopPropagation();
    });
    $('.js-toggle-close').click(function(){
        $(this).closest('.js-toggle').removeClass('is-expanded');
        if ($(this).closest('.js-toggle').hasClass('js-toggle--mobile')){
            $('body').css('overflow','initial');
        }
    });

    // Tab
    // -- for tab buttons
    $(".js-tab .tab-nav").on('click', '.button', function(e){
        e.preventDefault();
        $(this).addClass('is-active').siblings('.is-active').removeClass('is-active');
        var target = $(this).attr('href');
        showTab(target);
    });

    // -- for tab selector
    $(".js-tab .tab-nav").on('change', 'select', function(e){
        e.preventDefault();
        var target = $(this).val();
        showTab(target);
    });

    // reveal tab
    function showTab(target) {
        $('.tab-content').find(target).addClass('is-active').siblings('.is-active').removeClass('is-active');
        $('.slick-slider').slickSetOption('accessibility',true,true); //refresh slick slider using random option
    }

    // Grouping button
    $('.js-grouping--button').on('click','.button', function(e){
        e.preventDefault();
        var groupingHeight = $(this).closest('.js-grouping--button').outerHeight();
        $(this).addClass('is-active').siblings('.is-active').removeClass('is-active');
        var target = $(this).attr('href');
        if (target.charAt(0) == '#'){
            var targetTop = $(target).offset().top;
            $('html, body,document').animate({
                'scrollTop': targetTop - groupingHeight - 10
            });

        }
    });
    
    // Mobile Tab
    $('.js-mobileTab').on('click','a',function(e){
        e.preventDefault();
        $(this).addClass('is-active').siblings('.is-active').removeClass('is-active');
        var target = $(this).attr('href');
        $(target).parent('.mobileTab-content').addClass('is-active').siblings('.is-active').removeClass("is-active");
    })

    $('.js-mobileNav-toggle').click(function(e){
        e.preventDefault();
        $this = $(this);
        $('.mobileNav').addClass('is-active');
        if ($this.hasClass('is-active')){
            $this.removeClass('is-active')
            $('.mobileNav.is-active').removeClass('is-active');
            $('body.nav-open').removeClass('nav-open')
        }
        else {
            $this.addClass('is-active');
            $('.mobileNav').addClass('is-active');
            $('body').addClass('nav-open');
        }
    });

    // Sticky
    var $sticky = $('.js-sticky');
    var stickyGap = 0; //pixels
    if ($sticky.length){
        var stickyTop = $sticky.offset().top;
        var stickyHeight = $sticky.height();
        var footerOffset = $('.footer-container').offset().top;
        function stickyScroll(){
            if ($(window).scrollTop() >= (stickyTop - stickyGap)) {
                if (!$sticky.next().hasClass('stickyShim')){
                    $sticky.after('<div class="stickyShim"></div>').next().css('height',stickyHeight);
                }
                $sticky.css({
                    'position': 'fixed',
                    'width': $sticky.parent().width(),
                    'z-index': 3,
                    'top': 0 + stickyGap
                });
                if($('#similarCars').offset()){
                	if ($sticky.offset().top + stickyHeight >= $('#similarCars').offset().top && $sticky.hasClass('view-carLinks')) {
                        $sticky.hide();
                    }
                    else {
                        $sticky.show();
                    }
                }
                              
                if ($sticky.offset().top + stickyHeight >= footerOffset && $sticky.hasClass('js-help-questions')) {
                    $sticky.css({
                        'position': '',
                        'top': ''
                    }).addClass('is-anchored');
                }
                else {
                    $sticky.removeClass('is-anchored');
                }

            }
            else {
                $sticky.css({
                    'position': 'static',
                    'width' : 'auto'
                }).next('.stickyShim').remove();
            }

        }
        //$(window).scroll($.throttle(120, stickyScroll)); // with throttle
        $(window).scroll( stickyScroll);
    }



    // close cardPopup
    $('.js-browse-list').on('click','.cardPopup-hide',function(e){
        e.preventDefault();
        $('.cardPopup').slideUp();
        $('.cardPopup').detach();
        
        $('.card.is-expanded').removeClass('is-expanded').parent('li').css('margin-bottom','');
    });

    // Help
    $('.js-help-questions').on('click','a',function(e){
        e.preventDefault();
        $(this).parent('li').addClass('is-active').siblings('.is-active').removeClass('is-active');
        var target = $(this).attr('href');
        var targetTop = $(target).offset().top;
        $('html,body,document').animate({
            'scrollTop': targetTop
        });
    });

    // Homepage more button
    $('.pageBanner-more-button').click(function(e){
        e.preventDefault();
        var height = $('.pageBanner').height();
        $('html,body,document').animate({
            scrollTop : height
        });
    });

    // Form validation
    $('.js-validate').validate({
        highlight: function(element) {
            $(element).parent().addClass("is-alert");
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("is-alert");
        }
    });

    // login / guest checkout selection
    $('.js-checkoutOptions').on('click', 'a',function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        $(this).addClass('is-active').siblings('.is-active').removeClass('is-active');
        $(target).addClass('is-active is-expanded').siblings('.is-active').removeClass('is-active is-expanded');
    });

    // payment next on mobile (detail-payment.html)
    $('.js-payment-next').click(function(e){
        e.preventDefault();
        $('.mobile-payment-1').removeClass('is-active');
        $('.mobile-payment-2').addClass('is-active');
        $(window).scrollTop(0);
    });
});

function initSelectionWidget() {
    var selectedCars,
        selectionController;
    var duration;
    var selectionList = $('.js-selectionWidget-list');
    var selectionPane = $('.js-selectionWidget-pane');
    var selectionChauffeur = selectionList.hasClass('js-selectionWidget-chauffeur');

    selectedCars = [];

    selectionList.on('click','.js-card', function(e){
        e.preventDefault();
        var $this = $(this);
        if ($this.data('id') && $this.data('model')){
            selectionController.toggle($this);
        }
        else {
            console.error('Selected card is missing id and model data.');
        }
    });

    selectionPane.on('click','.js-remove', function(e){
        e.preventDefault();
        var carID = $(this).data('id');
        var theCard = selectionList.find('.card[data-id="'+carID+'"]');
        selectionController.remove(theCard);
    });


    $("#mode").on('change', function(){
    	updateSelectionPane();
    	disableFields();
    });
    disableFields();
    $(".js-datepicker-from").datepicker( 'option' , 'onClose', function() { updateSelectionPane();} ); 
    $(".js-datepicker-to").datepicker( 'option' , 'onClose', function() { updateSelectionPane();} ); 

    $("#starttime").on('change', function(){
    	updateSelectionPane();
    });

    $("#endtime").on('change', function(){
    	updateSelectionPane();
    });
    
    selectionController = {
        toggle: function (card) {
            var result = $.grep(selectedCars, function(e){
                return e.id == card.data("id");
            });
            if (result.length > 0) {
                // if selected car already exists in selectedCars, remove car
                this.remove(card);
            }
            else {
                // if selected car does not exist in selectedCars, add car
                this.add(card);
            }
        },

        add: function(card) {
            var newCar = {
                id: card.data('id'),
                model: card.data('model')
            }
            if (selectionChauffeur){
                // clear selectedCars
                while (selectedCars.length) {
                    selectedCars.pop();
                }
                selectedCars.push(newCar);
                card.addClass('is-selected').parent().siblings().find('.is-selected').removeClass('is-selected');
                card.find('.card-button').html('<span class="icon icon--tick"></span> Selected');
            }
            else {
                selectedCars.push(newCar)
                card.addClass('is-selected');
                card.find('.checker-label').text('Selected');
            }
            updateSelectionPane();
        },

        remove: function (card) {
            selectedCars = selectedCars.filter(function(el) {
               return el.id !== card.data("id");
            });
            card.removeClass('is-selected');
            card.find('.checker-label').text('Select');
            if (selectionChauffeur){
                card.find('.card-button').html('<span class="icon icon--tick"></span> Select');
            }
            updateSelectionPane();
        }
    }
    function disableFields(){
    	if($('#mode').val()=="PerTrip"){
    		$("label[for='enddate']").html("Return Date");
    		$("#enddate").prop('disabled', true);
    		$("#endtime").prop('disabled', true);
    		$("#endtime").closest( ".selector" ).addClass('is-disabled');
    		$("#enddate").val('');
    	}else{
    		$("label[for='enddate']").html("Return Date <span class=\"required\">*</span>");
    		$("#enddate").prop('disabled', false);
    		$("#endtime").prop('disabled', false);
    		$("#endtime").closest( ".selector" ).removeClass('is-disabled');
    	}
    }
    function findDuration(startdate,starttime,enddate,endtime){
    	var start,end;
    	if(startdate== null || startdate== ''|| enddate== null || enddate== ''){
    		start = new Date();
    		start.setHours(starttime.substr(0,starttime.indexOf(":")));
        	start.setMinutes(starttime.substr(starttime.indexOf(":")+1));
        	end = new Date();
        	end.setHours(endtime.substr(0,endtime.indexOf(":")));
        	end.setMinutes(endtime.substr(endtime.indexOf(":")+1));
    	}else{
	    	start = new Date(startdate+' '+starttime);
	    	end = new Date(enddate+' '+endtime);	
	    }
    	var diff = ( end - start ) / 1000 / 60 / 60;
    	if (isNaN(diff) || diff < 3) diff = 3;
    	return Math.ceil(diff);
    }
    function calculatePrice(duration, mode , hourly, pertrip){
    	var estprice = 0.00;
    	if(mode == 'Hourly'){
    		estprice = (hourly * duration).toFixed(2);
    		return estprice;	
    	}
    	if(mode == 'PerTrip'){
    		estprice = (pertrip).toFixed(2);
    		return estprice;
    	}
    }
    function updateSelectionPane() {

        if(selectedCars.length > 0 ){
            selectionPane.addClass('is-active');
            $('body').addClass('selectionPane-active');
        }
        else {
            selectionPane.removeClass('is-active');
            $('body').removeClass('selectionPane-active');
        }

        if (!selectionChauffeur){
            selectionPane.find('ul').empty();
            $.each(selectedCars, function(i,e){
                var imgSrc = selectionList.find('.card[data-id="'+ e.id+'"] img').attr('src');
                selectionPane.find('ul').append('<li>' +
                '<a href="" data-id="'+ e.id +'" class="icon icon--close-small selectionPane-remove js-remove"></a>' +
                '<figure> <img src="'+imgSrc+'" alt=""/></figure>' +
                '<span class="selectionPane-model">' + e.model + '</span>' +
                '</li>');
            });
        }

        if (selectionChauffeur){
            var theCar = selectedCars[0];
            var imgSrc = selectionList.find('.card[data-id="'+ theCar.id+'"] img').attr('src');
            var hourly = parseFloat(selectionList.find('.card[data-id="'+ theCar.id+'"] span.card-hourly').html());
            var pertrip = parseFloat(selectionList.find('.card[data-id="'+ theCar.id+'"] span.card-pertrip').html());
            $("input[id=model]").val(theCar.model);
            //selectionPane.find('span.card-pricing-value').html('$'+calculatePrice(findDuration($("#startdate").val(),$("#starttime").val(),$("#enddate").val(),$("#endtime").val()), $("#mode").val() , hourly, pertrip));
            selectionPane.find('figure img').attr('src',imgSrc).end().find('.js-selectionPane-model').text(theCar.model);
            var seasonalStart = selectionList.find('.card[data-id="'+ theCar.id+'"] div.startSeason').html();
            var seasonalEnd = selectionList.find('.card[data-id="'+ theCar.id+'"] div.endSeason').html();
           
           if (((new Date($("#startdate").val()).getTime()  >= new Date(seasonalStart).getTime())	&&
	      			  (new Date($("#startdate").val()).getTime() <= new Date(seasonalEnd).getTime()))
	      			||
	      			 ((new Date($("#enddate").val()).getTime() >= new Date(seasonalStart).getTime())	&&
	      			  (new Date($("#enddate").val()).getTime() <= new Date(seasonalEnd).getTime()))	
	      			){
        	   var minHours = selectionList.find('.card[data-id="'+ theCar.id+'"] div.minhours').html();
        	   var pricetitle = selectionList.find('.card[data-id="'+ theCar.id+'"] div.price-title').html();
               var shourly = selectionList.find('.card[data-id="'+ theCar.id+'"] div.card-seasonal-disposal').html();
               var spertrip = selectionList.find('.card[data-id="'+ theCar.id+'"] div.card-seasonal-transfer').html();
               
               if($('#mode').val()=="PerTrip"){ 
            	   selectionPane.find('.js-selectionPane-model').html(theCar.model+' <span class="tag">$'+spertrip+'/hr due to the '+pricetitle+' peak-period</span>');
               }else{
            	   selectionPane.find('.js-selectionPane-model').html(theCar.model+' <span class="tag">$'+shourly+'/hr and min. '+minHours+' hour charge due to the '+pricetitle+' peak-period</span>');
               }
               var currDuration = findDuration($("#startdate").val(),$("#starttime").val(),$("#enddate").val(),$("#endtime").val());
               if (isNaN(currDuration) || currDuration < minHours) currDuration = minHours;
           	
               selectionPane.find('span.card-pricing-value').html('$'+calculatePrice(currDuration, $("#mode").val() , parseFloat(shourly), parseFloat(spertrip)));     
    	       
           }else{
	           selectionPane.find('span.card-pricing-value').html('$'+calculatePrice(findDuration($("#startdate").val(),$("#starttime").val(),$("#enddate").val(),$("#endtime").val()), $("#mode").val() , hourly, pertrip));     
	       }
        }

    }
}

function reloadLongTermWidget(){
	selectionList = $('.js-selectionWidget-list');
    selectionPane = $('.js-selectionWidget-pane');
    selectionChauffeur = selectionList.hasClass('js-selectionWidget-chauffeur');

    if(selectedCars.length > 0){
    	for(var i=0; i<selectedCars.length; i++){
    		var carid = selectedCars[i].id;
    		var thisCar = selectionList.find('.card[data-id="'+carid+'"]');
    		if(thisCar.length){
    			thisCar.addClass("is-selected");
    		}
    	}
    }

    selectionList.on('click','.js-card', function(e){
        e.preventDefault();    
        var $this = $(this);
        if ($this.data('id') && $this.data('model')){
            selectionController.toggle($this);
            //console.log(selectedCars.toString());
        }
        else {
            console.error('Selected card is missing id and model data.');
        }
    });

    selectionPane.on('click','.js-remove', function(e){
        e.preventDefault();
        var carID = $(this).data('id');
        var theCard = selectionList.find('.card[data-id="'+carID+'"]');
        if(theCard.length){
        	selectionController.remove(theCard);
        }else{
        	selectedCars = selectedCars.filter(function(el) {
                return el.id !== carID;
             });
        	updateSelectionPane();
        }     
    });

    selectionController = {
            toggle: function (card) {
                var result = $.grep(selectedCars, function(e){
                    return e.id == card.data("id");
                });
                if (result.length > 0) {
                    // if selected car already exists in selectedCars, remove car
                	delete imgArray[card.data("id")];
                	this.remove(card);              
                }
                else {
                    // if selected car does not exist in selectedCars, add car
                    if(selectedCars.length < 5){
                    	var imgSrc = card.find('img').attr('src');
                    	imgArray[card.data("id")] = imgSrc;
                    	this.add(card);                	
                    }else{
                    	alert("Maximum number of cars selected.");
                    } 
                }
            },

            add: function(card) {
                var newCar = {
                    id: card.data('id'),
                    model: card.data('model')
                }
                if (selectionChauffeur){
                    // clear selectedCars
                    while (selectedCars.length) {
                        selectedCars.pop();
                    }
                    selectedCars.push(newCar);
                    card.addClass('is-selected').parent().siblings().find('.is-selected').removeClass('is-selected');
                    card.find('.card-button').html('<span class="icon icon--tick"></span> Selected');
                }
                else {
                    selectedCars.push(newCar)
                    card.addClass('is-selected');
                    card.find('.checker-label').text('Selected');
                }
                updateSelectionPane();
            },

            remove: function (card) {
                selectedCars = selectedCars.filter(function(el) {
                   return el.id !== card.data("id");
                });
                card.removeClass('is-selected');
                card.find('.checker-label').text('Select');
                if (selectionChauffeur){
                    card.find('.card-button').html('<span class="icon icon--tick"></span> Select');
                }
                updateSelectionPane();
            }
        }

    function updateSelectionPane() {
        if(selectedCars.length > 0 ){
            selectionPane.addClass('is-active');
            $('body').addClass('selectionPane-active');
        }
        else {
            selectionPane.removeClass('is-active');
            $('body').removeClass('selectionPane-active');
        }

        if (!selectionChauffeur){
            selectionPane.find('ul').empty();
            $.each(selectedCars, function(i,e){
                //var imgSrc = selectionList.find('.card[data-id="'+ e.id+'"] img').attr('src');
            	var imgSrc = imgArray[e.id];
                selectionPane.find('ul').append('<li>' +
                '<a href="" data-id="'+ e.id +'" class="icon icon--close-small selectionPane-remove js-remove"></a>' +
                '<figure> <img src="'+imgSrc+'" alt=""/></figure>' +
                e.model +
                '</li>');
                var thiscard = selectionList.find('.card[data-id="'+ e.id+'"]');
                //adds selected indicator cars chosen
                thiscard.addClass('is-selected');
                thiscard.find('.checker-label').text('Selected');
            });
        }

        if (selectionChauffeur){
            var theCar = selectedCars[0];
            var imgSrc = selectionList.find('.card[data-id="'+ theCar.id+'"] img').attr('src');
            var hourly = parseFloat(selectionList.find('.card[data-id="'+ theCar.id+'"] span.card-hourly').html());
            var pertrip = parseFloat(selectionList.find('.card[data-id="'+ theCar.id+'"] span.card-pertrip').html());
            $("input[id=model]").val(theCar.model);
            selectionPane.find('span.card-pricing-value').html('$'+calculatePrice(findDuration($("#startdate").val(),$("#starttime").val(),$("#enddate").val(),$("#endtime").val()), $("#mode").val() , hourly, pertrip));
            selectionPane.find('figure img').attr('src',imgSrc).end().find('.js-selectionPane-model').text(theCar.model);
        }

    }
}

function initLongTermSelectionWidget(selectedCars) {
    var selectionController;
    var duration;
    var selectionList = $('.js-selectionWidget-list');
    var selectionPane = $('.js-selectionWidget-pane');
    var selectionChauffeur = selectionList.hasClass('js-selectionWidget-chauffeur');
    
    /*
    if(selectedCars.length > 0){
    	for(var i=0; i<selectedCars.length; i++){
    		var carid = selectedCars[i].id;
    		var thisCar = selectionList.find('.card[data-id="'+carid+'"]');
    		if(thisCar.length){
    			thisCar.addClass("is-selected");
    		}
    	}
    }
       
    selectionList.on('click','.js-card', function(e){
        e.preventDefault();    
        var $this = $(this);
        if ($this.data('id') && $this.data('model')){
            selectionController.toggle($this);
            //console.log(selectedCars.toString());
        }
        else {
            console.error('Selected card is missing id and model data.');
        }
    });

    selectionPane.on('click','.js-remove', function(e){
        e.preventDefault();
        var carID = $(this).data('id');
        var theCard = selectionList.find('.card[data-id="'+carID+'"]');
        if(theCard.length){
        	selectionController.remove(theCard);
        }else{
        	selectedCars = selectedCars.filter(function(el) {
                return el.id !== carID;
             });
        	updateSelectionPane();
        	console.log(selectedCars);
        }
    });
    */
    
    $("#mode").on('change', function(){
    	updateSelectionPane();
    	disableFields();
    });
    disableFields();
    $(".js-datepicker-from").datepicker( 'option' , 'onClose', function() { updateSelectionPane();} ); 
    $(".js-datepicker-to").datepicker( 'option' , 'onClose', function() { updateSelectionPane();} ); 

    $("#starttime").on('change', function(){
    	updateSelectionPane();
    });

    $("#endtime").on('change', function(){
    	updateSelectionPane();
    });
    
    /*
    selectionController = {
        toggle: function (card) {
            var result = $.grep(selectedCars, function(e){
                return e.id == card.data("id");
            });
            if (result.length > 0) {
                // if selected car already exists in selectedCars, remove car
            	delete imgArray[card.data("id")];
            	this.remove(card);              
            }
            else {
                // if selected car does not exist in selectedCars, add car
                if(selectedCars.length < 5){
                	var imgSrc = card.find('img').attr('src');
                	imgArray[card.data("id")] = imgSrc;
                	this.add(card);                	
                }else{
                	alert("Maximum number of cars selected.");
                } 
            }
        },

        add: function(card) {
            var newCar = {
                id: card.data('id'),
                model: card.data('model')
            }
            if (selectionChauffeur){
                // clear selectedCars
                while (selectedCars.length) {
                    selectedCars.pop();
                }
                selectedCars.push(newCar);
                card.addClass('is-selected').parent().siblings().find('.is-selected').removeClass('is-selected');
                card.find('.card-button').html('<span class="icon icon--tick"></span> Selected');
            }
            else {
                selectedCars.push(newCar)
                card.addClass('is-selected');
                card.find('.checker-label').text('Selected');
            }
            updateSelectionPane();
        },

        remove: function (card) {
            selectedCars = selectedCars.filter(function(el) {
               return el.id !== card.data("id");
            });
            card.removeClass('is-selected');
            card.find('.checker-label').text('Select');
            if (selectionChauffeur){
                card.find('.card-button').html('<span class="icon icon--tick"></span> Select');
            }
            updateSelectionPane();
        }
    }
    */
    
    function disableFields(){
    	if($('#mode').val()=="PerTrip"){
    		$("label[for='enddate']").html("Return Date");
    		$("#enddate").prop('disabled', true);
    		$("#endtime").prop('disabled', true);
    		$("#enddate").val('');
    	}else{
    		$("label[for='enddate']").html("Return Date <span class=\"required\">*</span>");
    		$("#enddate").prop('disabled', false);
    		$("#endtime").prop('disabled', false);
    	}
    }
    function findDuration(startdate,starttime,enddate,endtime){
    	var start,end;
    	if(startdate== null || startdate== ''|| enddate== null || enddate== ''){
    		start = new Date();
    		start.setHours(starttime.substr(0,starttime.indexOf(":")));
        	start.setMinutes(starttime.substr(starttime.indexOf(":")+1));
        	end = new Date();
        	end.setHours(endtime.substr(0,endtime.indexOf(":")));
        	end.setMinutes(endtime.substr(endtime.indexOf(":")+1));
    	}else{
	    	start = new Date(startdate+' '+starttime);
	    	end = new Date(enddate+' '+endtime);	
	    }
    	var diff = ( end - start ) / 1000 / 60 / 60;
    	if (isNaN(diff) || diff < 3) diff = 3;
    	return diff;
    }
    function calculatePrice(duration, mode , hourly, pertrip){
    	var estprice = 0.00;
    	if(mode == 'Hourly'){
    		estprice = (hourly * duration).toFixed(2);
    		return estprice;	
    	}
    	if(mode == 'PerTrip'){
    		estprice = (pertrip).toFixed(2);
    		return estprice;
    	}
    }
    
    /*
    function updateSelectionPane() {

        if(selectedCars.length > 0 ){
            selectionPane.addClass('is-active');
            $('body').addClass('selectionPane-active');
        }
        else {
            selectionPane.removeClass('is-active');
            $('body').removeClass('selectionPane-active');
        }

        if (!selectionChauffeur){
            selectionPane.find('ul').empty();
            $.each(selectedCars, function(i,e){
                //var imgSrc = selectionList.find('.card[data-id="'+ e.id+'"] img').attr('src');
            	var imgSrc = imgArray[e.id];
                selectionPane.find('ul').append('<li>' +
                '<a href="" data-id="'+ e.id +'" class="icon icon--close-small selectionPane-remove js-remove"></a>' +
                '<figure> <img src="'+imgSrc+'" alt=""/></figure>' +
                e.model +
                '</li>');
                var thiscard = selectionList.find('.card[data-id="'+ e.id+'"]');
                //adds selected indicator cars chosen
                thiscard.addClass('is-selected');
                thiscard.find('.checker-label').text('Selected');
            });
        }

        if (selectionChauffeur){
            var theCar = selectedCars[0];
            var imgSrc = selectionList.find('.card[data-id="'+ theCar.id+'"] img').attr('src');
            var hourly = parseFloat(selectionList.find('.card[data-id="'+ theCar.id+'"] span.card-hourly').html());
            var pertrip = parseFloat(selectionList.find('.card[data-id="'+ theCar.id+'"] span.card-pertrip').html());
            $("input[id=model]").val(theCar.model);
            selectionPane.find('span.card-pricing-value').html('$'+calculatePrice(findDuration($("#startdate").val(),$("#starttime").val(),$("#enddate").val(),$("#endtime").val()), $("#mode").val() , hourly, pertrip));
            selectionPane.find('figure img').attr('src',imgSrc).end().find('.js-selectionPane-model').text(theCar.model);
        }

    }
    */
    
}

function initBrowseWidget(popularCarsInput,state){	
	var ajaxRequests = new Array();
	var popularCars = popularCarsInput;
    var $browseList = $('.js-browse-list');
    var $pagination = $('.js-pagination');
    var carsData,
        pageCount,
        pageFirstCar,
        pageLastCar,
        currentPage = 0,
        carsPerPage = 15,
        $paginationPageItems;
    var activeElement,
        dateTo,
        dateToFormatted,
        dateFrom,
        dateFromFormatted,
        model,
        modelID;
    var stateObj;
    var suggestionsAjax=null;
    var searchSerialize;
    var searchLocation=null;
    //setstate
	$(window).on("popstate",function(e){
		if(e.originalEvent.state){
			restoreState(e.originalEvent.state);
		}
	});
	$(window).resize(function(event) {
		if($('.cardPopup').length){
			setTimeout(function(){
				$('.cardPopup').parent('li').css('margin-bottom', $('.cardPopup').height() + 50 +'px');
				}, 1000);
		}
	});
    if(typeof stateObj === 'undefined'){
    	var value;
	    if(value=(new RegExp('[?&]data=([^&]*)')).exec(location.search)){
	    	try{
	        stateObj=JSON.parse(atob(value[1]));
	    	}catch(e){
	    		//:)
	    	}
	    }
    }
    $('#clear_filter').click(function(e){ e.preventDefault();resetFilter();});
    $('#searchMobileSubmit').click(function() { 
		submitSearch();
		 var divTag = $(".l-browse-content").first();
	     $('html,body,document').animate({scrollTop: divTag.offset().top},'slow');
		//$('div.js-toggle--mobile').removeClass("is-expanded");
	});
    $('#searchSubmit').click(function() { 
		submitSearch();
	});
    $('#sortBy').change(function(){submitFilter();});
	$('#filterForm input[type="checkbox"]').change(function() {submitFilter();});
	$('#rating').change(function() {submitFilter();});
	$('#budget').change(function() {submitFilter();});
	$('#age').change(function() {submitFilter();});
	$('#drivingExp').change(function() {submitFilter();});
	$('#carMake').change(function() {submitFilter();});
	
    // initial populate
	var currentSearch='';
	searchSerialize = $("#searchForm :input[value!='']").serialize().replace('rangeStart=&','').replace('rangeEnd=&','').replace('&address=selected','').replace('address=selected','');
	if(searchSerialize){
		currentSearch = searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','');
	}else{
		currentSearch = $("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','');
	}
		
	showLoading();
	if(ajaxRequests[ajaxRequests.length - 1]) {
        ajaxRequests[ajaxRequests.length - 1].abort();
    }
	
	if(typeof stateObj === 'undefined'){
		ajaxRequests[ajaxRequests.length] = $.ajax({
	        url: '/browseCarList',
	        data: currentSearch + '&' + addWeddingParam(),
	        beforeSend:showLoading,
	        dataType: 'json'
	    }).done(function(data){
	    	carsData = data;
	        pageCount = (Math.ceil(data["total"] / carsPerPage));
	       
	    	if (window.history && window.history.pushState){
	    		pushHistoryState('init');
	    	}
        	carsPerPage = 15;
	        generateResults();
	    }).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
	}else{
		restoreState(stateObj);
	}
	function pushHistoryState(description){
		if (window.history && window.history.pushState){  
			var stateObj;
			if(model){
				stateObj={action:description, search:searchSerialize, filter:$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&',''), searchForm:$("#searchForm :input[value!='']").serialize().replace('rangeStart=&','').replace('rangeStart=&','').replace('&address=selected','').replace('address=selected',''), sortby:$('#sortBy').val(), mid: modelID , model: model};
			}else{
				stateObj={action:description, search:searchSerialize, filter:$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&',''), searchForm:$("#searchForm :input[value!='']").serialize().replace('rangeStart=&','').replace('rangeStart=&','').replace('&address=selected','').replace('address=selected',''), sortby:$('#sortBy').val()};
			}
			if(currentPage>0){
				stateObj['page']=currentPage;
			}
			var locationParam = '';
			if(searchLocation){
				locationParam = '&region='+searchLocation;
			}
			history.pushState(stateObj,description,"?data="+btoa(JSON.stringify(stateObj))+locationParam);
		}
	}
	
	 // Use the browser's built-in functionality to quickly and safely escape the
	 // string
	 function escapeHtml(str) {
	     var div = document.createElement('div');
	     div.appendChild(document.createTextNode(str));
	     return div.innerHTML;
	 };
	 
	//set the filters back
	function setFilters(state){
		$('#sortBy').val(escapeHtml(state.sortby));
		var carTypeSelectizer=$('.js-carType')[0].selectize;
		var carModelSelectizer=$('.js-carModel')[0].selectize;
		$.each(state.searchForm.split('&'), function (index, elem) {
			 	var vals = elem.split('=');
		        if(decodeURIComponent(vals[0])=="types[]"){
		        	var carTypeName = escapeHtml(decodeURIComponent(vals[1].replace(/\+/g, '%20')));
		        	carTypeSelectizer.addOption({id: carTypeName, model: carTypeName});
		        	carTypeSelectizer.refreshOptions();
		        	carTypeSelectizer.addItem(decodeURIComponent(carTypeName));
		        }else if(vals[0]=="makemodel"){
		        	var cars = escapeHtml(decodeURIComponent(vals[1].replace(/\+/g, '%20')).trim());
		        	if(cars.length>0){
			        	$.each(cars.split(","), function (index, elem) {
			        		var carmodelName = elem;
				        	carModelSelectizer.addOption({id: carmodelName, model: carmodelName});
				        	carModelSelectizer.refreshOptions();
				        	carModelSelectizer.addItem(carmodelName);	        		
			        	});
		        	}
		        }else{
		        	if(vals[0] && vals[1]){
		        	$("[name='" + vals[0] + "']").val(escapeHtml(decodeURIComponent(vals[1].replace(/\+/g, '%20'))));
		        	}
		        }
			});
		$.each(state.filter.split('&'), function (index, elem) {
			var vals = elem.split('=');
				if(decodeURIComponent(vals[0])=="options[]"){
					$("input[name='" + escapeHtml(decodeURIComponent(vals[0].replace(/\+/g, '%20'))) + "'][value='"+escapeHtml(decodeURIComponent(vals[1].replace(/\+/g, '%20')))+"']").prop( "checked", true );
				}else{
					$("[name='" + escapeHtml(vals[0]) + "']").val(escapeHtml(decodeURIComponent(vals[1].replace(/\+/g, '%20'))));
				}
			});
	}
	function restoreState(state){
		setFilters(state);
		if(state.search){
			currentSearch = escapeHtml(state.search)+'&'+escapeHtml(state.filter);
		}else{
			currentSearch = escapeHtml(state.filter);
		}
	    if(state.page){
	    	currentPage=escapeHtml(state.page);
	    }
		if(state.action=="viewAllModel"){
			if(state.model){			
				model = escapeHtml(state.model);
			}
			if(state.mid){			
				modelID = escapeHtml(state.mid);
			}
			
			$("#l_mid").val(escapeHtml(modelID));
			$("#viewAll").val("true");
			ajaxRequests[ajaxRequests.length] =  $.ajax({
	            url: '/browseSpecificCarsList?mid='+modelID+'&viewAll=true',
	            data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
	            beforeSend: showLoading,
	            dataType: 'json'
	        }).done(function(data) {
	        	carsData=data;
            	carsPerPage = data["counter"];
            	carsData['total']=data["counter"];
	        	pageCount = 1;
	        	currentPage=0;
	        	generateResults();
	            $('.js-pagination').html('&nbsp;');
	        }).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
		}else{
			$("#l_mid").val('');
			$("#viewAll").val('');
			ajaxRequests[ajaxRequests.length] = $.ajax({
			        url: '/browseCarList?page='+(currentPage+1),
			        data: currentSearch+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
			        beforeSend:showLoading,
			        dataType: 'json'
			    }).done(function(data){
			    	carsData = data;
			        pageCount = (Math.ceil(data["total"] / carsPerPage));
					carsPerPage = 15;
			        generateResults();
					if(state.action=="selectModel"){
						model   = escapeHtml(state.model);
						modelID = escapeHtml(state.mid);
						$("#l_mid").val(modelID);
						selectCacheModel(modelID,currentSearch);
					}
			    }).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });	
		}
	}
    function hideData(){
    	$('#viewAllHeader').hide();
    	$('.l-browse-cards').hide();
    	$('.l-browse-tools').hide();
    	$('.pagination').hide();
    }
    
    function showData(){
    	$('.l-browse-cards').show();
    	$('.l-browse-tools').show();
    	$('.pagination').show();
        $('.l-browse-list img').error(function(){
            $(this).attr('src', '/images/default/carpic-cards.jpg');
        });
    }
    
    function generateResults(pageNum){
    	if(carsData['total']>0){
        	if($('#viewAll').val()=='true'){
        		$('#viewAllHeader').html('<h3 class="cardPopup-title"><div class="model-header">'+escapeHtml(model)+' </div><span>Showing '+carsData['total']+' of '+carsData['total']+' car models</span></h3>');
        		$('#viewAllHeader').show();
        		$('.js-pagination').html('&nbsp;');
        	}
    		if(pageNum){
    			populateBrowse(pageNum);
    		}else{
    			populateBrowse();
    		}
            paginationFunc();
            showContent();
    	}else{
    		hideLoading();
    		$('#noResults').show();	
    	    suggestionsAjax=$.ajax({
    	        url: '/recommended-cars',
    	        data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+'&sortBy='+$("#sortBy").val()
    	    }).done(function(data){
    	    	$('#suggestion-list').html(data);
    	    }).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
    	}
    }
    function showLoading(){
    	$("#suggestions").hide();
    	$("#errors").hide();
    	if(suggestionsAjax){
    		suggestionsAjax.abort();
    	}
    	$('#suggestion-list').empty();
		$('#noResults').hide();
    	$("#loadDiv").show();
        if($('.companyMarquee').length){
        	if($('.companyMarquee').data( "moveF") !== undefined){
        		$('.companyMarquee').coyMarquee('play');
        	}else{
        		if($.isFunction($.fn.coyMarquee)){
        			$('.companyMarquee').coyMarquee();
        		}
        	}
        }
    	$('html,body,document').animate({scrollTop: 0},'slow');
    	hideData();
    }
    function hideLoading(){
    	if($('.companyMarquee').length){
    		if($('.companyMarquee').data("moveF") !== undefined ){
    			$('.companyMarquee').coyMarquee('pause');
    		}
        }
    	$("#loadDiv").hide();
    }
    
    function showContent(){
    	showData();
    	hideLoading();
    }
    
    function renderRating(rating){
    	var ratingDisplay='';
    	var rating = (rating * 2).toFixed() / 2;
    	for (i = 0; i < 5; i++) { 
    		if((i < (rating-1)) || (rating%1 == 0 && ((rating-1) == i))){
    			ratingDisplay += '<span class="icon icon--star-full"></span>';
    		}else{
    			if((rating%1!= 0) && i == parseFloat(rating.toString().split(".")[0])){
    				ratingDisplay += '<span class="icon icon--star-half"></span>';
    			}else{
    				ratingDisplay += '<span class="icon icon--star-empty"></span>';
    			}
    		}
    	}
    	return ratingDisplay;
    }
    function populateBrowse(pageNum) {
        if (!pageNum) {
            pageNum = currentPage;
        }

        $browseList.empty();

        pageFirstCar = carsPerPage * pageNum;
        pageLastCar = pageFirstCar + carsPerPage;
        if (pageLastCar > carsData["total"]) {
            pageLastCar = carsData["total"];
        }
        var searchedLocation = carsData["searchedLocation"];
        var cars=carsData["results"];
        var carlength = 0;
        if(cars){
        	carlength = cars.length;
        }
        var msg = carsData["message"];
        var msgType = carsData["messageType"];
        if(msg && msgType){
        	if(msgType){
        		$("#suggestionMsg").html('<p>'+msg+'</p>');
        		$("#suggestions").show();
        		$(".tiptip").tipTip({
        			activation: "hover",
        			keepAlive: false,
        			delay: 0,
        			attribute: "title",
        			defaultPosition: "top"
        		});
        	}
        }
        //for (var i = pageFirstCar; i < pageLastCar; i++) {
        var advanceBooking,car,carPriceDisplay,viewCar,location,stackLink,carMalaysia,popular,goView,probation;
        for (var i = 0; i < carlength; i++) {
            car = cars[i];
            advanceBooking='';
            viewCar='<div class="card-button">View car</div>';
            ratingDiv= '<div class="cardtag-rating"><span class="noReviewDesc">No Ratings Yet</span></div>';
            if(car.rating != 0 && car.ratingNo !=0){
            	ratingDiv = '<div class="cardtag-rating">'+renderRating(car.rating)+'<span class="reviewDesc">'+((car.ratingNo>1)?car.ratingNo+' Ratings':car.ratingNo+' Rating')+'</span></div>';
            }
            if(searchedLocation!=""){
            	 location = '<div class="card-overlay"><span class="icon icon--location"></span>' + searchedLocation + '<div class="cardtag-companyname">'+car.companyName+'</div> <div class="cardtag-companytype">'+car.companyType+'</div>'+ratingDiv+'</div>';
            	 if(searchedLocation!=car.address){
            		 advanceBooking='<li><span class="icon icon--stopwatch"></span>Advance Booking</li>';
            	 }
            }else{
            	 location = '<div class="card-overlay"><span class="icon icon--location"></span>' + car.address + '<div class="cardtag-companyname">'+car.companyName+'</div> <div class="cardtag-companytype">'+car.companyType+'</div>'+ratingDiv+'</div>';
            }
            stackLink ='';
            
            carMalaysia = '<li><span class="icon icon--tick"></span>Malaysia</li>'
            probation = '<li><span class="icon icon--probation"><span class="path1"></span><span class="path2"></span></span>Probation</li>'
            
            	
            carPriceDisplay='<div class="card-callout">As low as<span>$'+car.price+'</span>/weekday</div>';
            if(car.counter<=1){
            	 carPriceDisplay='<div class="card-callout">Get it at<span>$'+car.price+'</span>/weekday</div>';
                 	
            }
            if($('#viewAll').val()=="true"){
            	carPriceDisplay='<div class="card-callout">Get it at<span>$'+car.price+'</span></div>';
            }
            
            goView = car.buttonUrl;
            popular = '';
        	if($.inArray(car.id,popularCars)!==-1){
        		popular=' <span class="tag card-tag">Most popular</span>';
        	}
            if(car.goMalaysia!=true){
            	carMalaysia='';
            }else{
            	carMalaysia = '<li><span class="icon icon--tick"></span>Malaysia</li>';
            }
            if(car.minExp > 0){
            	probation='';
            }
            if(car.counter>1){
            	viewCar='<div class="card-button">View all '+ car.counter +'</div>';
            	stackLink=' card--stack';
            	location = '';
            	//carMalaysia='';
            	goView='#';
            	popular='';
            	probation='';
            }
            if(carMalaysia!='' || probation!=''){
            	carMalaysia='<br/>'+carMalaysia;
            }
            var carIconName=car.modeltype.toString().replace(/\s/g, '').toLowerCase();
            if (carIconName=='sports'){
            	carIconName='supercar';
            }
            var browseItem = $('<li>' +
            '<a href="'+goView+'" class="card'+stackLink+'" data-model="'+car.model+'" data-model-id="'+car.mid+'">' +
            popular +
            '<figure class="card-figure">' +
            carPriceDisplay +
            '<img src="' + car.img + '"/>' +
            location +
            '</figure>' +
            '<div class="card-body">' +
            '<h4 class="card-title">' + car.model + '</h4>' +
            '<div class="card-features"><ul>' +
            '<li><span class="icon icon--'+carIconName+'"></span>' + car.modeltype + '</li>' +
            '<li><span class="icon icon--passenger"></span>' + car.passenger + '</li>' +
            carMalaysia +
            probation +
            advanceBooking +
            '</ul></div>' +
            '</div>' +
            viewCar +
            '</a>' +
            '</li>');

            $browseList.append(browseItem);

        }
    }

    function paginationFunc() {
	    	$pagination.empty();
	        // build pagination-list pages
	        var paginationPages = "";
	        var paginationClass = (0 == currentPage)?'is-active':'';
	        paginationPages += '<li class="js-pagination-page '+ paginationClass +'"><a href="">1</a></li>';
	        paginationPages += '<li class="pagination-gap-front pagination-gap is-disabled"><span>&hellip;</span></li>';  	
	      
	        for ( var j = 1; j < pageCount-1; j++) {
	            paginationClass = (j == currentPage)?'is-active':'';
	            paginationPages += '<li class="js-pagination-page '+ paginationClass +'"><a href="">'+ (j+1) +'</a></li>';
	        }
	        paginationPages += '<li class="pagination-gap-end pagination-gap is-disabled"><span>&hellip;</span></li>';  	

	        if(pageCount>1){
	        	paginationClass = (pageCount == currentPage)?'is-active':'';
	        	paginationPages += '<li class="js-pagination-page '+ paginationClass +'"><a href="">'+ (pageCount) +'</a></li>';
	        }
	        var totalCars=carsData["total"];
	        if(totalCars){
		        $pagination.html('<span class="pagination-text tiny">'+ (pageFirstCar+1) +' - ' + pageLastCar +' of ' + carsData["total"] +' car models</span>' +
		        '<ul class="pagination-list">' +
		        '<li class="is-disabled js-pagination-prev"><a href="#"><span class="icon icon--arrow-left"></span></a></li>' +
		        '<li class="js-pagination-next"><a href="#"><span class="icon icon--arrow-right"></span></a></li>' +
		        '</ul>');
	        }else{
	            $pagination.first().html('<span class="pagination-text tiny">'+ 0 +' - ' + 0 +' of ' + 0 +' car models</span>' +
	                    '<ul class="pagination-list">' +
	                    '<li class="is-disabled js-pagination-prev"><a href="#"><span class="icon icon--arrow-left"></span></a></li>' +
	                    '<li class="js-pagination-next is-disabled"><a href="#"><span class="icon icon--arrow-right"></span></a></li>' +
	                    '</ul>');
	        }
	        if(pageCount>1){
		        $pagination.not('.js-pagination-arrows').find('.js-pagination-prev').after(paginationPages);
		        $paginationPageItems = $pagination.find('.js-pagination-page');
		        if (!$paginationPageItems.last().hasClass('is-active') && totalCars && totalCars>15){
		            $pagination.find('.js-pagination-next').removeClass('is-disabled');
		        }else{
		            $pagination.find('.js-pagination-next').addClass('is-disabled');
		        }
		        //prevent calling twice?
		        $pagination.unbind();
		        $pagination.on('click','a', function(e){
		            e.preventDefault();
		            var $listItem = $(this).closest('li');
		            if ($listItem.hasClass('js-pagination-prev') && !$listItem.hasClass('is-disabled')) {
		                currentPage--;
		            }
		            else if ($listItem.hasClass('js-pagination-next') && !$listItem.hasClass('is-disabled')) {
		                currentPage++;
		            }
		            else if ($listItem.hasClass('js-pagination-page')){
		                currentPage = $paginationPageItems.index($listItem);
		            }
		            getPaginatedCars(currentPage);
		//            populateBrowse(currentPage);	        
		        });
		        updatePagination();
	    }else{
	        	$('.pagination-list').hide();
	    }
        function getPaginatedCars(pageNum){
        	$("#l_mid");
        	if(ajaxRequests[ajaxRequests.length - 1]) {
    	        ajaxRequests[ajaxRequests.length - 1].abort();
    	    }
    	    ajaxRequests[ajaxRequests.length] = $.ajax({
                url: '/browseCarList?page='+(pageNum+1),
                data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
                beforeSend:showLoading,
                dataType: 'json'
            }).done(function(data) {
            	carsData=data;
            	pushHistoryState('navigatePage');
            	generateResults(pageNum);
            	updatePagination();
            });
        }
        function updatePagination(){
            $('.pagination-text').text((pageFirstCar+1) + ' - ' + pageLastCar + ' of ' + carsData["total"] + ' car models');
            $paginationPageItems.eq(currentPage).addClass('is-active').siblings('.is-active').removeClass('is-active');
            
            
            if (!$paginationPageItems.first().hasClass('is-active')){
                $pagination.find('.js-pagination-prev').removeClass('is-disabled');
            }
            else {
                $pagination.find('.js-pagination-prev').addClass('is-disabled');
            }

            if (!$paginationPageItems.last().hasClass('is-active')){
                $pagination.find('.js-pagination-next').removeClass('is-disabled');
            }
            else {
                $pagination.find('.js-pagination-next').addClass('is-disabled');
            }
            
            if($paginationPageItems.size()>5){
            	$paginationPageItems.show();
            	var start = currentPage-2;
            	var end = currentPage+2;
            	
            	if(end<4){
            		end=4;
            	}
            	if(end<pageCount){
            		$paginationPageItems.not($('.js-pagination-page:lt('+end+')')).hide();
            	}
            	if(start>(pageCount-5)){
            		start=pageCount-5;
            	}
            	
            	if(currentPage<3){
            		$pagination.find('.pagination-gap-front').hide();
            	}
        		if(currentPage>(pageCount-4)){
            		$pagination.find('.pagination-gap-end').hide();
            	}
            	if(start>-1){
            		$paginationPageItems.not($('.js-pagination-page:gt('+start+')')).hide();
            	}
            }else{
            	$pagination.find('.pagination-gap-front').hide();
            	$pagination.find('.pagination-gap-end').hide();
            }
            //first and last always show;
            $paginationPageItems.first().show();
            $paginationPageItems.last().show();
        }
    }

    // click handler
    $browseList.on('click', '.card--stack', function(e){
        e.preventDefault();
        activeElement = this;
        dateFrom = $('.js-browse-filter .js-datepicker-from').val();
        dateTo = $('.js-browse-filter .js-datepicker-to').val();
        model = $(this).data('model');
        modelID = $(this).data('model-id');
        if (dateFrom) {
            dateFromFormatted = moment(dateFrom,'D MMMM YYYY').format('YYYY-MM-DD');
        }
        if (dateTo) {
            dateToFormatted = moment(dateTo,'D MMMM YYYY').format('YYYY-MM-DD');
        }

        getCars(modelID);
    });

    function selectCacheModel(mid,currentSearch){
    	activeElement = $('a[data-model-id="'+mid+'"]');
        dateFrom = $('.js-browse-filter .js-datepicker-from').val();
        dateTo = $('.js-browse-filter .js-datepicker-to').val();
        model = $('a[data-model-id="'+mid+'"]').data('model');
        modelID = $('a[data-model-id="'+mid+'"]').data('model-id');
    	
    	$('#l_mid').val(mid);
	    if(ajaxRequests[ajaxRequests.length - 1]) {
	        ajaxRequests[ajaxRequests.length - 1].abort();
	    }
	    ajaxRequests[ajaxRequests.length] = $.ajax({
            url: '/browseSpecificCarsList?mid='+modelID,
            data: currentSearch+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
            beforeSend:showDetailLoading,
            dataType: 'json'
        }).done(function(data){populateCardPopup(data);}).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
    }
   

    function getCars(modelID){
    	var makeModelSelectizer=$('.js-carModel')[0].selectize;
    	var carmodel = model;    
    	makeModelSelectizer.addOption({id: carmodel, model: carmodel});
    	//makeModelSelectizer.refreshOptions();
    	makeModelSelectizer.addItem(carmodel);
    	$('#l_mid').val(modelID);
	    if(ajaxRequests[ajaxRequests.length - 1]) {
	        ajaxRequests[ajaxRequests.length - 1].abort();
	    }
	    ajaxRequests[ajaxRequests.length] = $.ajax({
            url: '/browseSpecificCarsList?mid='+modelID,
            data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+ '&' + addWeddingParam(),
            beforeSend:showDetailLoading,
            dataType: 'json'
        }).done(function(data){
        	populateCardPopup(data);
        	pushHistoryState('selectModel');
    	}).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
    }
    
    function showDetailLoading(){
    	$('.card.is-expanded').removeClass('is-expanded').parent('li').css('margin-bottom','');
        $('.cardPopup').slideUp();
    	$('.cardPopup').detach();
    	var $popup = $('<div id="model-list" class="cardPopup" >' +
    			'<div class="cardPopup-header">'+
    	        '<h3 class="cardPopup-title">'+$(activeElement).data('model')+'</h3>'+
    			'<div style="padding-top:10px;padding-bottom:30px; text-align:center;"><img class="spinner" src="/images/loading_grey.gif" alt="Loading ...please wait."/>Loading ...please wait...</div>'+
    		    '</div></div>');
    	$(activeElement).addClass('is-expanded').parent().append($popup);
    	$(activeElement).parent('li').css('margin-bottom',210 + 'px');
    	$('.cardPopup').slideDown();
    	$(document).trigger("ABhookStart");
    }
    
    function getAllCars(modelID){
    	$('#viewAll').val('true');
    	if(ajaxRequests[ajaxRequests.length - 1]) {
	        ajaxRequests[ajaxRequests.length - 1].abort();
	    }
	    ajaxRequests[ajaxRequests.length] =  $.ajax({
            url: '/browseSpecificCarsList?mid='+modelID+'&viewAll=true',
            data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
            beforeSend: showLoading,
            dataType: 'json'
        }).done(function(data) {
        	carsData=data;
        	carsPerPage = data["counter"];
        	carsData['total']=data["counter"];
        	pushHistoryState('viewAllModel');
        	pageCount = 1;
        	currentPage=0;
        	generateResults();
            $('.js-pagination').html('&nbsp;');
        }).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
    }

    
    function populateCardPopup(data){
    	var currentCount=6;
    	var viewAll='<div class="cardPopup-more"><a class="button button--block" data-model-id="'+modelID+'">View all ('+data['counter']+')</a></div>';
    	if(data['counter']<=6){
    		currentCount=data['counter'];
    		viewAll='';
    	}

        var $popup = $( '<div><div class="cardPopup-header">'+
                '<h3 class="cardPopup-title">'+$(activeElement).data('model')+' <span>Showing '+currentCount+' of '+data['counter']+' for this model</span></h3>'+
                '<a class="cardPopup-hide"><span class="icon icon--close"></span></a>'+
                '</div>'+
                '<ul class="l-browse-list l-browse-list--3"></ul>'+
                viewAll+'</div>');
        var carMalaysia,popular,carIconName,probation,location,advanceBooking;
        var searchedLocation = data["searchedLocation"];
        var cardata=data['results'];
        
        $.each(cardata, function(index, car){
            carMalaysia = '<li><span class="icon icon--tick"></span>Malaysia</li>'
            probation = '<li><span class="icon icon--probation"><span class="path1"></span><span class="path2"></span></span>Probation</li>';
            advanceBooking='';
            popular='';
        	if($.inArray(car.id,popularCars)!==-1){
        		popular=' <span class="tag card-tag">Most popular</span>';
        	}
           	if(car.goMalaysia!=true){
                carMalaysia='';
            }
            if(car.minExp > 0){
            	probation='';
            }
            if(carMalaysia!='' || probation!=''){
            	carMalaysia='<br/>'+carMalaysia;
            }
            carIconName=car.modeltype.toString().replace(/\s/g, '').toLowerCase();
            if (carIconName=='sports'){
            	carIconName='supercar';
            }
            ratingDiv= '<div class="cardtag-rating"><span class="noReviewDesc">No Ratings Yet</span></div>';
            if(car.rating != 0 && car.ratingNo !=0){
            	ratingDiv = '<div class="cardtag-rating">'+renderRating(car.rating)+'<span class="reviewDesc">'+((car.ratingNo>1)?car.ratingNo+' Ratings':car.ratingNo+' Rating')+'</span></div>';
            }
            if(searchedLocation!=""){
           	 location = '<div class="card-overlay"><span class="icon icon--location"></span>' + searchedLocation + '<div class="cardtag-companyname" >'+car.companyName+'</div> <div class="cardtag-companytype">'+car.companyType+'</div>'+ratingDiv+'</div>';
           	 if(searchedLocation!=car.address){
           		 advanceBooking='<li><span class="icon icon--stopwatch"></span>Advance Booking</li>';
           	 }
           }else{
           	 location = '<div class="card-overlay"><span class="icon icon--location"></span>' + car.address + '<div class="cardtag-companyname">'+car.companyName+'</div> <div class="cardtag-companytype">'+car.companyType+'</div>'+ratingDiv+'</div>';
           }
            
            $popup.find('.l-browse-list').append('<li>' +
            '<a href="'+car.buttonUrl+'" class="card">' +
            popular+
            '<figure class="card-figure">' +
            '<div class="card-callout">Get it at<span>$'+car.price+'</span></div>'+
            '<img src="'+car.img+'"/>'+
            location+
            '</figure>' +
            '<div class="card-body">'+
            //'<h4 class="card-title">'+car.model+'</h4>' +
            '<div class="card-features"><ul>'+
            '<li><span class="icon icon--'+carIconName+'"></span>'+car.modeltype+'</li>' +
            '<li><span class="icon icon--passenger"></span>'+car.passenger+'</li>' +
            carMalaysia +
            probation +
            advanceBooking +
            '</ul></div>' +
            '</div>'+
            '<div class="card-button">View car</div>'+
            '</a>' +
            '</li>');
        });
        $(activeElement).parent().find('.cardPopup').empty();
        $(activeElement).parent().find('.cardPopup').append($popup);
        //var cardPopupCount =  $popup.find('.l-browse-list > li');
        $(activeElement).siblings('.cardPopup').slideDown(function(){
        	setTimeout(function(){
        	var cardPopupHeight = $(activeElement).parent().find('.cardPopup').height();
        	var extendHeight = 50;
        	$(activeElement).parent('li').css('margin-bottom', cardPopupHeight + extendHeight +'px');
        	}
        	,100);
        });
        $('.cardPopup-more').on('click','a', function(e){
            e.preventDefault();
            $('.cardPopup').slideDown();
            getAllCars($(this).data('model-id'));
        });
        //delay animation.
        $('.cardPopup img').error(function(){
            $(this).attr('src', '/images/default/carpic-cards.jpg');
        });
        var aTag = $("#model-list");
        var new_offset = aTag.offset().top  - $('.header').height() + 6;
        setTimeout(function(){$('html,body,document').animate({scrollTop: new_offset},'slow');},1000);   
        $(document).trigger("ABhookEnd");
    }
    
    function getSearchedCars(){
    	 if($('#l_mid').val() && $('#viewAll').val()){
    		var modelID=$('#l_mid').val();
        	if(ajaxRequests[ajaxRequests.length - 1]) {
    	        ajaxRequests[ajaxRequests.length - 1].abort();
    	    }
    	    ajaxRequests[ajaxRequests.length] =  $.ajax({
                url: '/browseSpecificCarsList?mid='+modelID+'&viewAll=true',
                data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
                beforeSend: showLoading,
                dataType: 'json'
            }).done(
            		function(data) {
                    	carsData=data;
                    	carsPerPage = data["counter"];
                    	carsData['total']=data["counter"];
                    	pageCount = 1;
                    	currentPage=0;
                    	pushHistoryState('searchModel');
            			generateResults();
                        $('.pagination-list').hide();
            		}
            ).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
    	}else{
	    	if(ajaxRequests[ajaxRequests.length - 1]) {
		        ajaxRequests[ajaxRequests.length - 1].abort();
		    }
		    ajaxRequests[ajaxRequests.length] = $.ajax({
	            url: '/browseCarList',
	            data: searchSerialize+'&'+$("#filterForm :input[value!='']").serialize().replace('l_mid=&','').replace('carMake=&','').replace('budget=&','')+'&sortBy='+$("#sortBy").val() + '&' + addWeddingParam(),
	            beforeSend:showLoading,
	            dataType: 'json'
	        }).done(function(data) {
	        	carsData=data;
            	pageCount = (Math.ceil(data["total"] / carsPerPage));	        	
	        	carsPerPage=15;
                currentPage = 0;
                pushHistoryState('searchModel');
                generateResults();
	        }).fail(function (jqXHR, textStatus, errorThrown) { displayError(jqXHR, textStatus, errorThrown); });
    	}
    }
    
    function displayError(jqXHR, textStatus, errorThrown){
    	if(!(jqXHR.readyState == 0 && textStatus=='abort')) {
    		var msg='<p>Oops, it seems that there was a problem getting your request.Please try again.('+jqXHR.status+'-'+textStatus+errorThrown+')</p>';
    		hideLoading();
    		if(jqXHR.status === 0) { msg = '<p>There seems to be some problem connecting to Drive.SG. Please try again later.</p>'; }
    		$("#errorMsg").html(msg);
    		$("#errors").show();
    		hideData();
    		$('html,body,document').animate({scrollTop: 0},'slow');
    	}
    }
    
    function submitSearch(){
    	searchSerialize = $("#searchForm :input[value!='']").serialize().replace('rangeStart=&','').replace('rangeEnd=&','').replace('&address=selected','').replace('address=selected','');
    	searchLocation = ($("#address").val() !== "" && $("#address").val() !== "selected")?$("#address :selected").parent().attr('label').toLowerCase():null;
    	$('#l_mid').val('');
    	$('#viewAll').val('');
    	getSearchedCars();
    }
    
    function submitFilter(){
    	getSearchedCars();
    }
    
    function resetFilter(){
    	$('#filterForm input[type="checkbox"]').removeAttr("checked");
    	$('#budget').prop('selectedIndex', 0);
    	$('#age').prop('selectedIndex', 5);
    	$('#drivingExp').prop('selectedIndex', 3);
    	$('#carMake').prop('selectedIndex', 0);
    	submitFilter();
    }
    
    function addWeddingParam(){
    	var weddingparam = '';
    	if (window.location.href.indexOf("/wedding") > -1) {
    		weddingparam = 'urltype=wedding';
    	}

    	return weddingparam;
    }
    
    if (!Array.prototype.filter)
    	{
    	    Array.prototype.filter = function(fun /*, thisp */)
    	    {
    	        "use strict";
    	
    	        if (this === void 0 || this === null)
    	            throw new TypeError();
    	
    	        var t = Object(this);
    	        var len = t.length >>> 0;
    	        if (typeof fun !== "function")
    	            throw new TypeError();
    	
    	        var res = [];
    	        var thisp = arguments[1];
    	        for (var i = 0; i < len; i++)
    	        {
    	            if (i in t)
    	            {
    	                var val = t[i]; // in case fun mutates this
    	                if (fun.call(thisp, val, i, t))
    	                    res.push(val);
    	            }
    	        }
    	
    	        return res;
    	    };
    	}
}