
class customSlider {

    /**
     * initialize the slider
     */
    init() {
        this.homeMainSlide();
        this.arrivaleSlides();
        this.reviewSlider();
        this.pressNMediaSlider();
    }

    // home main slider
    homeMainSlide() {
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
                init: function () {
                    let swiper = this;
                },
                lazyImageReady: function () {
                    let swiper = this;

                    setTimeout(function () {
                        swiper.update();
                    }, 500);
                },
                progress: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".img-sm").style.transform = "translateX(" + innerTranslate + "px)";
                    }
                },
                touchStart: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function (speed) {
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
                init: function () {
                    let swiper = this;
                },
                lazyImageReady: function () {
                    let swiper = this;

                    setTimeout(function () {
                        swiper.update();
                        mpSlider.classList.remove('loading');
                    }, 500);
                },
                progress: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".img-lg").style.transform = "translateX(" + innerTranslate + "px)";
                    }
                },
                touchStart: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function (speed) {
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

            _this.on('click', function () {

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
            $(document).off('keyup').on('keyup', function (e) {
                if (e.keyCode == '37') {
                    $('.mps-prev').trigger('click');
                } else if (e.keyCode == '39') {
                    $('.mps-next').trigger('click');
                }
            });
        }


    }

    arrivaleSlides() {
        new Swiper('.arrival-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            // Navigation arrows
            navigation: {
                // nextEl: '.swiper-button-next',
                // prevEl: '.swiper-button-prev',
                nextEl: '.review-next',
                prevEl: '.review-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            parallax: true,
            slidesPerView: 4,
            spaceBetween: 20,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }
        });
    }

    reviewSlider() {
        new Swiper('.review-slider', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            // Navigation arrows
            navigation: {
                nextEl: '.review-next',
                prevEl: '.review-prev',
            },
            slidesPerView: 1,

        });
    }
    pressNMediaSlider() {
        new Swiper('.press-n-media', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            // Navigation arrows
            navigation: {
                nextEl: '.review-next',
                prevEl: '.review-prev',
            },
            slidesPerView: 1,
            slidesPerView: 4,
            spaceBetween: 20,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }

        });
    }
}
const themeSlides = new customSlider();

themeSlides.init();


