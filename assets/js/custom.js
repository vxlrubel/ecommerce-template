(function ($) {
    class ecommerce {
        init() {
            this.cloneNavbar();
            this.toggleMenu();
        }
        cloneNavbar() {
            $('.menu').clone().attr('class', 'mobile-navbar').appendTo('#mobile-menu');
        }
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
    }

    $(document).ready(function () {
        const ec = new ecommerce();
        ec.init();
    });
})(jQuery);