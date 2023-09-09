(function ($) {
    class ecommerce {
        init() {
            this.cloneNavbar();
            this.toggleMenu();
            this.cartItemIncreaseDecrease();
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

        cartItemIncreaseDecrease() {
            $('.increse_decrese a.plus').on('click', function (e) {

                var inputElement = $(this).siblings('input');
                var step = parseFloat(inputElement.attr("step"));
                var currentValue = parseFloat(inputElement.val());
                e.preventDefault();

                // Check if the current value is less than the max value
                if (currentValue + step <= parseFloat(inputElement.attr("max"))) {
                    inputElement.val((currentValue + step).toString());
                }
            });

            $('.increse_decrese a.minus').click(function (e) {
                var inputElement = $(this).siblings('input');
                var step = parseFloat(inputElement.attr("step"));
                var currentValue = parseFloat(inputElement.val());
                e.preventDefault();

                // Check if the current value is greater than the min value
                if (currentValue - step >= parseFloat(inputElement.attr("min"))) {
                    inputElement.val((currentValue - step).toString());
                }
            });
        }
    }

    $(document).ready(function () {
        const ec = new ecommerce();
        ec.init();
    });
})(jQuery);