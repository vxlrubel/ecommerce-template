(function ($) {
    class Ecommerce {
        init() {
            this.cloneNavbar();
            this.toggleMenu();
            this.cartItemIncreaseDecrease();
            this.cartItemRemove();
            this.searchToggle();
            this.header1();
            this.footer();
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

        cartItemRemove() {
            $('.items-remove').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault();
                    $(this).parents('li').css({
                        backgroundColor: '#d63031',
                        color: 'white'
                    }).fadeOut(200);
                    setTimeout(function () {
                        $(this).parents('li').remove();
                    }, 200);
                })
            });
        }

        searchToggle() {

            let searchparent = $('.header-search-parent');

            $('#open-search-bar').on('click', function (e) {
                e.preventDefault();
                searchparent.addClass('show');
            });

            $('#close-search-bar').on('click', function (e) {
                e.preventDefault();
                searchparent.fadeOut(300);
                setTimeout(() => {
                    searchparent.stop().removeClass('show').removeAttr('style');
                }, 300);
            });
        }

        header1() {
            const duplicateNavbar = () => {
                $('.menu').clone().attr('class', 'mobile-menu').appendTo('.mobile-menu-parent');
            }
            const toggleMobileMenu = () => {
                $('.menu-toggle').on('click', function (e) {
                    $('#mobile-menu1').stop().slideToggle('fast');
                });

            }

            const addToggleClass = () => {
                var submenuLink = $('.mobile-menu').find('li.has-submenu');
                var megamenuLink = $('.mobile-menu').find('li.has-megamenu');
                submenuLink.children('a').addClass('submenu-toggle').append('<i class="fa-solid fa-chevron-down"></i>');
                megamenuLink.children('a').addClass('submenu-toggle').append('<i class="fa-solid fa-chevron-down"></i>');
            }

            const toggleSubmenu = () => {
                $('.submenu-toggle').each(function () {
                    let _this = $(this);
                    let icon = _this.children('i');
                    _this.on('click', function (e) {
                        e.preventDefault();

                        if (icon.hasClass('fa-chevron-down')) {
                            icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
                            _this.siblings('.sub-menu').slideDown(300);
                            _this.siblings('.mega-menu-parent').slideDown(300);
                        } else {
                            icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
                            _this.siblings('.sub-menu').stop().slideUp(300);
                            _this.siblings('.mega-menu-parent').stop().slideUp(300);
                        }


                    })
                });
            }

            const scrollingFixed = () => {
                let headerTopHeight = $('.header-top').outerHeight();
                $(window).on('scroll', function () {

                    if ($(this).scrollTop() > headerTopHeight) {
                        $('.header-navbar').addClass('fixed-top').removeClass('position-relative');
                    } else {
                        $('.header-navbar').removeClass('fixed-top').addClass('position-relative');
                    }

                });
            }


            toggleMobileMenu();
            duplicateNavbar();
            addToggleClass();
            toggleSubmenu();
            scrollingFixed();
        }

        footer() {
            const chatbox = () => {
                $('.live-chat').on('click', function (e) {
                    var chatBox = $('.chat-box');
                    e.preventDefault();
                    chatBox.toggleClass('show');
                });
                $('.close-chatbox').on('click', function () {
                    $(this).parent('.chat-box').fadeOut();
                })
            }
            // chatbox();
        }
    }

    $(document).ready(function () {
        const ecom = new Ecommerce();
        ecom.init();

        $('.live-chat').on('click', function (e) {
            var chatBox = $('.chat-box');
            e.preventDefault();
            chatBox.addClass('show');
        });
        $('.close-chatbox').on('click', function () {
            $(this).parent('.chat-box').fadeOut();
        })
    });
})(jQuery);