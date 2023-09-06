(function ($) {
    class ecommerce {
        init() {
            this.cloneNavbar();
            this.toggleMenu();
            this.homeSlider();
        }

        /**
         * clone main menu
         */
        cloneNavbar() {
            $('.menu').clone().attr('class', 'mobile-navbar').appendTo('#mobile-menu');
        }

        /**
         * toggle menu items 
         */
        toggleMenu() {

            $('.mobile-navbar').find('.mega-menu').parent('li').children('a').addClass('submenu-toggle').append('<i class="fa-solid fa-chevron-down"></i>');

            // toggle main mobile menu
            $('.menu-toggle').each(function () {
                let _this = $(this);
                let children = _this.children('i');
                _this.on('click', function (e) {
                    e.preventDefault();
                    // change self icon
                    if (children.hasClass('fa-bars-staggered')) {
                        children.addClass('fa-xmark').removeClass('fa-bars-staggered');
                    } else {
                        children.removeClass('fa-xmark').addClass('fa-bars-staggered');
                    }
                    // toggle main navbar
                    $('.mobile-navbar').stop().slideToggle(500);


                })
            });

            // toggle submenu
            $('.submenu-toggle').each(function () {
                let _this = $(this);
                let icon = _this.children('i');
                _this.on('click', function (e) {
                    e.preventDefault();

                    if (icon.hasClass('fa-chevron-down')) {
                        icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
                        _this.siblings('.mega-menu').slideDown(500);
                    } else {
                        icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
                        _this.siblings('.mega-menu').slideUp(500);
                    }


                })
            })

        }

        /**
         * home slider
         */
        homeSlider(){
             // Params
            const mpSlider = document.querySelector('.multi-px-slider');
            let interleaveOffset = 0.5;

            // init small slider
            const smallSlider = new Swiper('.sm-slider', {
                touchRatio: 0, // disable swipe
                loop: true,
                slidesPerView: 'auto',
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 2,
                },
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                on: {
                    init: function() {
                        let swiper = this;
                    },
                    lazyImageReady: function() {
                        let swiper = this;

                        setTimeout(function() {
                            swiper.update();
                        }, 500);
                    },
                    progress: function() {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector(".img-sm").style.transform = "translateX(" + innerTranslate + "px)";
                        }
                    },
                    touchStart: function() {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = "";
                        }
                    },
                    setTransition: function(speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".img-sm").style.transition = speed + "ms";
                        }
                    }
                }
            });


            // init large slider
            const largeSlider = new Swiper('.lg-slider', {
                parallax: true,
                loop: true,
                speed: 2000,
                slidesPerView: 'auto',
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 2,
                },
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                touchEventsTarget: 'wrapper',
                controller: {
                    control: smallSlider
                },
                on: {
                    init: function() {
                        let swiper = this;
                    },
                    lazyImageReady: function() {
                        let swiper = this;

                        setTimeout(function() {
                            swiper.update();
                            mpSlider.classList.remove('loading');
                        }, 500);
                    },
                    progress: function() {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector(".img-lg").style.transform = "translateX(" + innerTranslate + "px)";
                        }
                    },
                    touchStart: function() {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = "";
                        }
                    },
                    setTransition: function(speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".img-lg").style.transition = speed + "ms";
                        }
                    }
                }
            });


            // Set up animations
            let slideDelay = 2000;
            let $mpsArrow = $('.mps-arrow');

            function runAnimation() {
                mpSlider.classList.add('is-animating');
            }

            function endAnimation() {
                mpSlider.classList.remove('is-animating');
            }


            // custom arrows
            $mpsArrow.each((i, el) => {
                const _this = $(el);

                _this.on('click', function() {

                    // disable arrows
                    $mpsArrow.prop('disabled', true);
                    // run animation
                    runAnimation();

                    // go to prev/next slide
                    if (_this.hasClass('mps-prev')) {
                        setTimeout(() => {
                            largeSlider.slidePrev();
                        }, slideDelay)
                    } else if (_this.hasClass('mps-next')) {
                        setTimeout(() => {
                            largeSlider.slideNext();
                        }, slideDelay)
                    }

                    // detect animation end
                    const curtain = document.querySelector('.curtain');
                    curtain.addEventListener('animationend', () => {
                        // re-enable arrows
                        $mpsArrow.prop('disabled', false);
                        // end animation
                        endAnimation();
                    });

                })

            })


            // TO DO: check if slider is in viewport?
            let mpsInViewport = true;

            if (mpsInViewport) {
                $(document).off('keyup').on('keyup', function(e) {
                    if (e.keyCode == '37') {
                        $('.mps-prev').trigger('click');
                    } else if (e.keyCode == '39') {
                        $('.mps-next').trigger('click');
                    }
                });
            }
            
            
        }
    }

    $(document).ready(function () {
        const ec = new ecommerce();
        ec.init();
    });
})(jQuery);