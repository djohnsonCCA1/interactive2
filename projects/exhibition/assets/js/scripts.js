$(document).ready(function(){

	function checkTop(){
		zIndex = 0;
		$('.desktop > div').each(function(){
			var currentZ = parseInt($(this).css('zIndex'), 10);
			if(currentZ >= zIndex){
				zIndex = currentZ + 1;
			}
		});
		return zIndex;
	}

	function sizeCheck(){
		if($(window).width() < 1400 || $(window).height() < 700){
			if($(window).width() < 800){$('.text-content-inner').attr('contentEditable', 'false');}
			var newWidth = Math.ceil($('.window').width() * 1.25) + 1;
			var newHeight = Math.ceil($('.window').height() * 1.25) + 1;
			$('body').addClass('small');
			$('.window iframe').css({width:newWidth, height:newHeight});
		}  else {
			$('body').removeClass('small');
			$('.window iframe').css({width:'', height:''});
		}
	}

	sizeCheck();

	$(window).resize(function(){
		sizeCheck();
	});

	function launchIntoFullscreen(element) {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}

	function exitFullscreen() {
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}

	$('body').on('click', '.outer:not(.inactive) .circle:nth-child(1), .outer:not(.inactive) .circle:nth-child(2)', function(){
		$(this).parents('.outer').remove();
	});

	$('body').on('click', '.outer:not(.inactive) .circle:nth-child(3)', function(){
		launchIntoFullscreen(document.documentElement);
		if($('body').hasClass('fullscreen')){exitFullscreen();}
		$('body').toggleClass('fullscreen');
	});

	$('body').on('mousedown', '.inactive .address-text', function(e){
		$('.address-text').addClass('clicked');
		setTimeout(function(){
			$('.address-text').removeClass('clicked');
		}, 500);
		e.preventDefault();
	}).on('mouseup click', '.address-text', function(e){
		if($('.browser').hasClass('inactive') || $('.address-text').hasClass('clicked')){
			console.log('no');
			e.preventDefault();
		}
	});
	

	$(document).on('mousedown', '.text.inactive', function(){
		$('.browser').addClass('inactive');
		$('.text').removeClass('inactive').css({zIndex:checkTop});
		$('.sticky').addClass('inactive');
		$('.preview').addClass('inactive');
		$('.cover').show();
	});

	$(document).on('mousedown', '.browser.inactive', function(){
		$('.text').addClass('inactive');
		$('.browser').removeClass('inactive').css({zIndex:checkTop});
		$('.sticky').addClass('inactive');
		$('.preview').addClass('inactive');
	}).on('click', '.browser', function(){
		$('.cover').hide();
	});

	$(document).on('mousedown', '.sticky.inactive', function(){
		$('.text').addClass('inactive')
		$('.browser').addClass('inactive');
		$('.sticky').removeClass('inactive').css({zIndex:checkTop});
		$('.preview').addClass('inactive');
		$('.cover').show();
	});

	$(document).on('mousedown', '.preview.inactive', function(){
		$('.text').addClass('inactive')
		$('.browser').addClass('inactive');
		$('.sticky').addClass('inactive');
		$('.preview').removeClass('inactive').css({zIndex:checkTop});
		$('.cover').show();
	});

	$(document).on('mousedown', '.tab:not(.active)', function(){
		loaded();
		var that = $(this);
		$('.tab').removeClass('active');
		that.addClass('active');
		var thisIndex = $(this).index();
		var frame = $('.window iframe').eq(thisIndex);
		var thisLink = 'http://' + that.data('link');
		if(frame.attr('src') === ''){
			frame.attr('src', thisLink);
			loadBar();
			frame.load(function(){
				loaded();
			});
		}
		$('.window iframe').removeClass('current-window');
		frame.addClass('current-window');
		$('.address-text').text($(this).data('link')).attr('href', 'http://' + $(this).data('link'));
		if(that.is('.tab-4, .tab-3, .tab-2, .tab-1')){
			var totalTabs = $('.tab').length;
			if(that.hasClass('beginning')){
				$('.tab').each(function(i){
					$(this).removeClass('tab-1 tab-2 tab-3 tab-4 tab-5 tab-6 tab-7 tab-8 tab-9 tab-10 tab-11 tab-12 tab-13 tab-14 tab-15').addClass('tab-' + (totalTabs-i));
				})
			} else {
				$('.tab').each(function(i){
					$(this).removeClass('tab-1 tab-2 tab-3 tab-4 tab-5 tab-6 tab-7 tab-8 tab-9 tab-10 tab-11 tab-12 tab-13 tab-14 tab-15').addClass('tab-' + (i+1));
				})
			}
		}
	});

	$('.text-content-inner').keydown(function(){
		$('.edited').show();
	});

	$('.outer, .sticky').draggable({
		handle:'.drag-point',
		start: function(event, ui){$(this).trigger('click');},
		cancel: '.address-bar, .circle',
		iframeFix: true
	});

	function loadBar(){
		$('.loading-bar').stop().animate({opacity:1}, 200);
		$('.loading-bar').animate({width:'20%'}, 1500).animate({width:'35%'}, 3000, 'linear').animate({width:'45%'}, 500).animate({width:'70%'}, 3200, 'linear').animate({width:'90%'}, 1200).animate({width:'100%'}, 4500, 'linear');
	}

	function loaded(){
		$('.loading-bar').stop(true,true).animate({width:'100%'}, 300, function(){
			$('.loading-bar').animate({opacity:0}, 200, function(){
				$('.loading-bar').css({width:0});
			});
		});
	}

	loadBar();

	$('.current-window').load(function(){
		loaded();
	});

	characters = ['&#9786;', '&#9785;', '&#9788;', '&#9730;', '&#8967;', '&#9757;', '&#9759;', '&#9998;', '&#9996;', '&#9992;', '&#10014;', '&#8212;', '&times;', '&asymp;', '&divide;', '&#126;', '&ne;', '&#9988;'];

	var i = 0;
	var total = characters.length;
	var symbol = $('.symbol');

	window.setInterval(function(){
		if(i === total){
			i = 0;
		}

		var character = characters[i++];
		symbol.html(character);
	}, 100);

	$('#folder').click(function(){
		// $('.outer').addClass('show');

		$('.outer').each(function(i){
		  	var outer = $(this);
		  	setTimeout(function() {
		    	outer.addClass('show');
		  	}, 100*i);
		})
	});

});




