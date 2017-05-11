
/**
 * CP Slider
 * A Custom Slider for Capital Pacific's Home page.
 * Uses optional scroll jacking, key and arrow nav to trigger animations
 * enhanced with Velocity JS, and registered Velocity Effects (via Velocity UI Pack)
 *
 * @version:  1
 * @author    Stephen Scaff
 * @see       js/vendor/velocity.js
 * @see       js/components/_velocity-effects.js
 * @see       scss/components/velo-slider.scss
 */

var VeloSlider = (function() {

  /**
   * Global Settings 
   */
  var settings = {
    veloInit: $('.velo-slides').data('velo-slider'),
    $veloSlide: $('.velo-slide'),
    veloSlideBg: '.velo-slide__bg',
    navPrev:  $('.velo-slides-nav').find('a.js-velo-slides-prev'),
    navNext:  $('.velo-slides-nav').find('a.js-velo-slides-next'),
    veloBtn:   $('.velo-slide__btn'),
    delta: 0,
    scrollThreshold: 7,
    currentSlide: 1,
    animating: false,
    animationDuration: 2000
  };


  // Flags
  var delta = 0,
      animating = false;

  return {
   
      /**
       * Init 
       */
      init: function() {
        this.bind();
      },
    
    /**
     * Bind our click, scroll, key events
     */
    bind: function(){
 
      //  Add active to first slide to set it off
      settings.$veloSlide.first().addClass('is-active');

      //  Init with a data attribute, 
      //  Binding the animation to scroll, arrows, keys
      if (settings.veloInit == 'on') {
        VeloSlider.initScrollJack();
        $(window).on('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
      }

      // Arrow / Click Nav
      settings.navPrev.on('click', VeloSlider.prevSlide);
      settings.navNext.on('click', VeloSlider.nextSlide);
    
      // Key Nav
      $(document).on('keydown', function(e) {
        var keyNext = (e.which == 39 || e.which == 40),
            keyPrev = (e.which == 37 || e.which == 38);

        if (keyNext && !settings.navNext.hasClass('inactive')) {
          e.preventDefault();
          VeloSlider.nextSlide();

        } else if (keyPrev && (!settings.navPrev.hasClass('inactive'))) {
          e.preventDefault();
          VeloSlider.prevSlide();
        }
      });
      
      // // Swipes
      // $(window).swipe(function( direction, offset ) {
      //   //if (offset < 100) { return; }
      //   if (direction == "up") { 
      //     VeloSlider.prevSlide(); 
      //     console.log('swipe up');

      //   }
      //   if (direction == "down") { VeloSlider.nextSlide(); } 
      // });
    
      //set navigation arrows visibility
      VeloSlider.checkNavigation();

      // Call Button Hover animation
      VeloSlider.hoverAnimation();
     
    },

    /**
     * Hover Animation
     * Adds 'is-hovering' class to the current slide
     * when hovering over the button.
     */
    hoverAnimation: function(){
      settings.veloBtn.hover(function (){
        $(this).closest(settings.$veloSlide).toggleClass('is-hovering');
      });
    },

    /** 
     * Set Animation
     * Defines the animation sequence, calling our registered velocity effects
     * @see js/components/_velocity-effects.js
     */
    setAnimation: function(midStep, direction) {
      
      // Vars for our velocity effects
      var animationVisible = 'translateNone',
          animationTop = 'translateUp',
          animationBottom = 'translateDown',
          easing = 'ease',
          animDuration = settings.animationDuration;

      // Middle Step
      if (midStep) {
        animationVisible = 'scaleUp.moveUp.scroll';
        animationTop = 'scaleDown.moveUp.scroll';
        animationBottom = 'scaleDown.moveDown.scroll';
      
      } else {
        animationVisible = (direction == 'next') ? 'scaleUp.moveUp' : 'scaleUp.moveDown';
        animationTop = 'scaleDown.moveUp';
        animationBottom = 'scaleDown.moveDown';
      }

      return [animationVisible, animationTop, animationBottom, animDuration, easing];
    },

    /** 
     * Init Scroll Jaclk
     */
    initScrollJack: function() {

      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          topSection = visibleSlide.prevAll(settings.$veloSlide),
          bottomSection = visibleSlide.nextAll(settings.$veloSlide),
          animationParams = VeloSlider.setAnimation(false),
          animationVisible = animationParams[0],
          animationTop = animationParams[1],
          animationBottom = animationParams[2];
          console.log(animationParams);
          console.log(animationParams[4]);

      visibleSlide.children('div').velocity(animationVisible, 1, function() {
        visibleSlide.css('opacity', 1);
        topSection.css('opacity', 1);
        bottomSection.css('opacity', 1);
      });

      topSection.children('div').velocity(animationTop, 0);
      bottomSection.children('div').velocity(animationBottom, 0);
    },

    /**
     * Scroll Jack
     * On Mouse Scroll
     */
    scrollJacking: function(e) {
      if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
        delta--;
        (Math.abs(delta) >= settings.scrollThreshold) && VeloSlider.prevSlide();
      } else {
        delta++;
        (delta >= settings.scrollThreshold) && VeloSlider.nextSlide();
      }
      return false;
    },

    /**
     * Previous Slide
     */
    prevSlide: function(e) {
      //go to previous section
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(midStep, 'prev'),
          midStep = false;
      
      visibleSlide = midStep ? visibleSlide.next(settings.$veloSlide) : visibleSlide;

      console.log(midStep);

      if (!animating && !visibleSlide.is(":first-child")) {
        animating = true;
        
        visibleSlide
          .removeClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[2], animationParams[3], animationParams[4])
          .end()
          .prev(settings.$veloSlide)
          .addClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[0], animationParams[3], animationParams[4], function() {
            animating = false;
          });
        currentSlide = settings.currentSlide - 1;
      }
      VeloSlider.resetScroll();
    },


    /** 
     * Next Slide
     */
    nextSlide: function(e) {
      
      //go to next section
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(midStep, 'next'),
          midStep = false;

      if (!animating && !visibleSlide.is(":last-of-type")) {
        animating = true;

        visibleSlide.removeClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[1], animationParams[3])
          .end()
          .next(settings.$veloSlide)
          .addClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[0], animationParams[3], function() {
            animating = false;
        });
        currentSlide = settings.currentSlide + 1;
      }
      VeloSlider.resetScroll();
    },

    /**
     * Reset SCroll
     */
    resetScroll: function() {
      delta = 0;
      VeloSlider.checkNavigation();
    },

    /**
     * Check Nav
     * Adds / hides nav based on first/last slide
     * @todo - loop slides, without cloning if possible
     */
    checkNavigation: function() {
      //update navigation arrows visibility
      (settings.$veloSlide.filter('.is-active').is(':first-of-type')) ? settings.navPrev.addClass('inactive'): settings.navPrev.removeClass('inactive');
      (settings.$veloSlide.filter('.is-active').is(':last-of-type')) ? settings.navNext.addClass('inactive'): settings.navNext.removeClass('inactive');

    },
  };
})();

// INIT
VeloSlider.init();
  


// (function($, window, undefined) {
//     // First check to see if the platform is an iPhone or iPod
//     if(/iP/.test(navigator.platform) && /Safari/i.test(navigator.userAgent)){
//         var mobileSafari = "Safari";
//     }

//     var $cp_slides = $('.velo-slides, .velo-slide, .velo-slide__bg');
 
//     // Set the div height
//     function setHeight($cp_slides) {
//         var new_height = $(this).height();
//         // if mobileSafari add +60px
//         if (typeof mobileSafari === 'string'){ new_height - 60 };
//         $cp_slides.css('height', new_height);
//     }
 
//     setHeight($cp_slides);
//     $(window).resize(function() {
//         setHeight.call(this, $cp_slides);
//     });
 
// }(jQuery, this));



//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}