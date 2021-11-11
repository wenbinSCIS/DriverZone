/* -------------------------------------
		CUSTOM FUNCTION WRITE HERE
-------------------------------------- */
"use strict";
jQuery(document).on('ready', function() {
	/* -------------------------------------
			SCROLLBAR
	-------------------------------------- */
	jQuery('.tg-themescrollbar').mCustomScrollbar({
		axis:"y",
	});
	/* ---------------------------------------
			STICKY HEADER
	--------------------------------------- */
	jQuery('.tg-headerfixed').scrollToFixed();
	/* -------------------------------------
			HOME BANNER SLIDER
	-------------------------------------- */
	var _tg_homeslider = jQuery('#tg-homeslider');
	_tg_homeslider.owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		nav: false,
		autoplay: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	jQuery('.owl-carousel').mouseover(function(){
		_tg_homeslider.trigger('stop.owl.autoplay');
	});
	jQuery('.owl-carousel').mouseleave(function(){
		_tg_homeslider.trigger('play.owl.autoplay',[1000]);
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_populartoursslider = jQuery('#tg-populartoursslider');
	_tg_populartoursslider.owlCarousel({
		loop: true,
		dots: false,
		nav: true,
		margin:30,
		autoplay: false,
		responsiveClass:true,
		responsive:{
			320:{ items:1, },
			639:{ items:2, },
			768:{ items:2, },
			992:{ items:3, },
			1200:{ items:3, }
		},
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_destinationsslider = jQuery('#tg-destinationsslider');
	_tg_destinationsslider.owlCarousel({
		loop: true,
		dots: false,
		nav: true,
		margin:40,
		autoplay: false,
		responsiveClass:true,
		responsive:{
			320:{ items:1, },
			568:{ items:2, },
			768:{ items:2, },
			992:{ items:2, },
			1200:{ items:3, }
		},
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			OUR GUIDES SLIDER
	-------------------------------------- */
	var _tg_guidesslider = jQuery('#tg-guidesslider');
	_tg_guidesslider.owlCarousel({
		loop: true,
		dots: false,
		nav: true,
		margin:40,
		autoplay: false,
		responsiveClass:true,
		responsive:{
			320:{ items:1, },
			568:{ items:2, },
			768:{ items:2, },
			992:{ items:2, },
			1200:{ items:3, }
		},
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_populardestinationslider = jQuery('#tg-populardestinationslider');
	_tg_populardestinationslider.owlCarousel({
		margin:30,
		dots: true,
		nav: false,
		loop: false,
		autoplay: false,
		responsiveClass:true,
		responsive:{
			320:{ items:1, },
			568:{ items:1, },
			639:{ items:2, },
			768:{ items:2, },
			992:{ items:2, },
			1200:{ items:2, }
		},
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			TESTIMONIALS SLIDER
	-------------------------------------- */
	var sync1 = jQuery("#tg-homesliderfull");
	var sync2 = jQuery("#tg-homesliderthumbnails");
	var slidesPerPage = 5;
	var syncedSecondary = true;
	sync1.owlCarousel({
		items : 1,
		loop: true,
		nav: false,
		dots: false,
		autoplay: true,
		slideSpeed : 2000,
		responsiveRefreshRate : 200,
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
	}).on('changed.owl.carousel', syncPosition);
	sync2.on('initialized.owl.carousel', function () {
		sync2.find(".owl-item").eq(0).addClass("current");
	})
	.owlCarousel({
		items : slidesPerPage,
		dots: false,
		nav: false,
		margin: 0,
		smartSpeed: 200,
		slideSpeed : 500,
		slideBy: slidesPerPage,
		responsiveRefreshRate : 100,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:2,
			},
			640:{
				items:3,
			},
			800:{
				items:4,
			},
			1200:{
				items:5,
			}
		}
	}).on('changed.owl.carousel', syncPosition2);
	function syncPosition(el) {
		var count = el.item.count-1;
		var current = Math.round(el.item.index - (el.item.count/2) - .5);
		if(current < 0) {
			current = count;
		}
		if(current > count) {
			current = 0;
		}
		sync2.find(".owl-item").removeClass("current").eq(current).addClass("current")
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();
		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}
	function syncPosition2(el) {
		if(syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}
	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = jQuery(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_topdestinationslider = jQuery('.tg-topdestinationslider');
	_tg_topdestinationslider.owlCarousel({
		nav: true,
		margin:30,
		loop: true,
		dots: false,
		autoplay: false,
		responsiveClass:true,
		responsive:{
			320:{ items:1, },
			568:{ items:2, },
			768:{ items:2, },
			992:{ items:2, },
			1200:{ items:3, }
		},
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			EXPLORE TOUR TOGGLE
	-------------------------------------- */
	jQuery('#tg-btntoggleform').on('click', function(){
		jQuery('.tg-formtheme.tg-formtrip').slideToggle();
	});
	/* -------------------------------------
			THEME ACCORDION
	-------------------------------------- */
	jQuery(function() {
		jQuery('.tg-panelcontent').hide();
		jQuery('.tg-accordion h4:first').addClass('active').next().slideDown('slow');
		jQuery('.tg-accordion h4').on('click',function() {
			if(jQuery(this).next().is(':hidden')) {
				jQuery('.tg-accordion h4').removeClass('active').next().slideUp('slow');
				jQuery(this).toggleClass('active').next().slideDown('slow');
			}
		});
	});
	/* -------------------------------------
			MASONRY GALLERY
	-------------------------------------- */
	var _tg_masnorygallery = jQuery('.tg-faqs');
	_tg_masnorygallery.packery({
		itemSelector: '.tg-item',
		columnWidth: 0,
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_trendingtripsslider = jQuery('.tg-trendingtripsslider');
	_tg_trendingtripsslider.owlCarousel({
		loop: true,
		dots: false,
		nav: true,
		margin:30,
		autoplay: false,
		responsiveClass:true,
		responsive:{
			320:{ items:1, },
			768:{ items:1, },
			992:{ items:1, },
			1200:{ items:2, },
			1441:{ items:3, },
		},
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_widgetpopulartourslider = jQuery('#tg-widgetpopulartourslider');
	_tg_widgetpopulartourslider.owlCarousel({
		items:1,
		dots: false,
		nav: true,
		loop: true,
		autoplay: true,
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			POPULAR tOUR SLIDER
	-------------------------------------- */
	var _tg_productdetailsider = jQuery('#tg-productdetailsider');
	_tg_productdetailsider.owlCarousel({
		items:1,
		dots: false,
		nav: true,
		loop: true,
		autoplay: true,
		navText: [
			'<i class="icon-chevron-left"></i>',
			'<i class="icon-chevron-right"></i>',
		],
		navClass: [
			'tg-btnroundprev',
			'tg-btnroundnext'
		],
	});
	/* -------------------------------------
			Google Map
	-------------------------------------- */
	jQuery(".tg-locationmap").gmap3({
		marker: {
			address: "1600 Elizabeth St, Melbourne, Victoria, Australia",
			options: {
				title: "Travelu",
			}
		},
		map: {
			options: {
				zoom: 16,
				scrollwheel: false,
				disableDoubleClickZoom: true,
			}
		}
	});
	/* ---------------------------------------
			FULL PAGE SEARCH
	--------------------------------------- */
	jQuery('a[href="#tg-search"]').on('click', function(event) {
		event.preventDefault();
		jQuery('#tg-search').addClass('open');
		jQuery('#tg-search > form > fieldset > input[type="search"]').focus();
	});
	jQuery('#tg-search, #tg-search button.close').on('click keyup', function(event) {
		if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
			jQuery(this).removeClass('open');
		}
	});
	jQuery('form').submit(function(event) {
		event.preventDefault();
		return false;
	});
	jQuery('.tg-search button.close').on('click', function(){
		jQuery(this).parents('.tg-search').removeClass('open');
	});
	/* ---------------------------------------
			SIGN IN OPEN CLOSE
	--------------------------------------- */
	jQuery('a[href="#tg-loginsingup"]').on('click', function(event) {
		event.preventDefault();
		jQuery('#tg-loginsingup').addClass('open');
		jQuery('body').addClass('tg-hidescroll');
	});
	jQuery('#tg-loginsingup, #tg-loginsingup button.close').on('click keyup', function(event) {
		jQuery('body').removeClass('tg-hidescroll');
		if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
			jQuery(this).removeClass('open');
		}
	});
	/* -------------------------------------
			PRETTY PHOTO GALLERY
	-------------------------------------- */
	jQuery("a[data-rel]").each(function () {
		jQuery(this).attr("rel", jQuery(this).data("rel"));
	});
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'normal',
		theme: 'dark_square',
		slideshow: 3000,
		autoplay_slideshow: false,
		social_tools: false
	});
	/* ---------------------------------------
			MOBILE MENU
	--------------------------------------- */
	jQuery("#menu").mmenu({
		extensions: [
			"border-full",
			"pagedim-black",
		],
	});
});
/* -------------------------------------
			LOADER
-------------------------------------- */
jQuery(window).on('load', function() {
	jQuery(".loader").fadeOut(800);
});