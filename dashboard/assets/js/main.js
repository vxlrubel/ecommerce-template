(function ($) {
    'use strict';
    $(window).on('load', function () {


        //------------------------------------------------------------------------------------------------------------------
        // Overlay Scroll Bar Init
        //------------------------------------------------------------------------------------------------------------------
        $(".scrollable").overlayScrollbars({});



        //------------------------------------------------------------------------------------------------------------------
        // Space In Window For Header
        //------------------------------------------------------------------------------------------------------------------
        $('body').has('.header').addClass('body-p-top');



        //------------------------------------------------------------------------------------------------------------------
        // Show Active Menu On Top In Main Sidebar
        //------------------------------------------------------------------------------------------------------------------
        if ($('.main-sidebar').length) {
            var activeLink = $('.sidebar-link.active');
            if (activeLink.length && activeLink.parents('.sidebar-item').length) {
                $('.sidebar-menu .os-viewport').animate({
                    scrollTop: activeLink.parents('.sidebar-item').offset().top - 90
                }, 0);
            }
        }

    });

    $(document).ready(function () {
        //------------------------------------------------------------------------------------------------------------------
        // More Menu In Header For Mobile Devices
        //------------------------------------------------------------------------------------------------------------------
        $('.header-collapse-group-btn').on('click', function () {
            $('.header').toggleClass('expanded-in-mobile');
            $('.header-collapse-group').toggle();
        });



        //------------------------------------------------------------------------------------------------------------------
        // Notification Menu Animation
        //------------------------------------------------------------------------------------------------------------------
        if ($('#notificationDropdown').has('.badge')) {
            $('#notificationDropdown i').addClass('animate');
        }



        //------------------------------------------------------------------------------------------------------------------
        // Calculactor In Header
        //------------------------------------------------------------------------------------------------------------------
        var input = document.getElementById("dgbCalcResult");
        var td = document.querySelectorAll(".dgb-calc-box td");
        var length = td.length;
        var lastInputIsSymbol = false; // Initialize a flag to track the last input type
        td.forEach(index => {
            index.addEventListener("click", () => {
                var num = index.innerHTML;
                if (isSymbol(num) && lastInputIsSymbol) {
                    return; // Return early if the last input was a symbol
                }

                if (num == "=") {
                    var value = input.value;
                    if (isSymbol(value[value.length - 1])) {
                        value = value.slice(0, -1); // Remove the last symbol if it's an operator
                    }
                    var sum = eval(value);
                    input.value = sum;
                } else if (num == "C") {
                    input.value = "";
                } else if (num == "CE") {
                    var value = input.value;
                    value = value.substr(0, value.length - 1);
                    input.value = value;
                } else {
                    input.value += num;
                }

                lastInputIsSymbol = isSymbol(num); // Update the flag based on the current input
            });
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "=" || e.key === "Enter") {
                var value = input.value;
                if (isSymbol(value[value.length - 1])) {
                    value = value.slice(0, -1); // Remove the last symbol if it's an operator
                }
                var sum = eval(value);
                input.value = sum;
            } else if (e.key === "Escape") {
                input.value = "";
            } else if (
                (e.key >= "0" && e.key <= "9") ||
                e.key === "+" ||
                e.key === "-" ||
                e.key === "*" ||
                e.key === "/"
            ) {
                if (isSymbol(e.key) && lastInputIsSymbol) {
                    return; // Return early if the last input was a symbol
                }
                input.value += e.key;
                lastInputIsSymbol = isSymbol(e.key); // Update the flag based on the current input
            } else if (e.key === "Backspace") {
                var value = input.value;
                value = value.substr(0, value.length - 1);
                input.value = value;
            } else {
                return false;
            }
        });
        function isSymbol(input) {
            var symbols = ["+", "-", "*", "/"]; // Define an array of symbols
            return symbols.includes(input); // Check if the input is a symbol
        }



        //------------------------------------------------------------------------------------------------------------------
        // Window Full Screen From Header
        //------------------------------------------------------------------------------------------------------------------
        if ($('.fullscreen-btn').length) {
            function toggleFullscreen(elem) {
                elem = elem || document.documentElement;
                if (!document.fullscreenElement && !document.mozFullScreenElement &&
                    !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }
            document.getElementById('btnFullscreen').addEventListener('click', function () {
                toggleFullscreen();
                $(this).toggleClass('full-screen');
                if ($(this).hasClass('full-screen')) {
                    $(this).html('<i class="fa-light fa-compress"></i>');
                } else {
                    $(this).html('<i class="fa-light fa-expand"></i>');
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Profile Shortcut As Dropdown & As Sidebar Toggle
        //------------------------------------------------------------------------------------------------------------------
        $('#seeProfileAsSidebar').on('change', function(){
            if($(this).is(':checked')) {
                $('.profile-btn-box').find('.profile-btn').attr('id', 'profileDropdown').attr('data-bs-toggle', '');
                $('.profile-right-sidebar').addClass('active');
                $('body').addClass('overflow-hidden');
                $(this).prop('checked', false);
            } else {
                $('.profile-btn-box').find('.profile-btn').attr('id', '').attr('data-bs-toggle', 'dropdown');
                $('.profile-right-sidebar').removeClass('active');
                $('body').removeClass('overflow-hidden');
                $(this).prop('checked', true);
            }
        });
        $('#seeProfileAsDropdown').on('change', function(){
            if($(this).is(':checked')) {
                $('.profile-btn-box').find('.profile-btn').attr('id', '').attr('data-bs-toggle', 'dropdown');
                $('.profile-right-sidebar').removeClass('active');
                $('body').removeClass('overflow-hidden');
                $(this).prop('checked', false);
            } else {
                $('.profile-btn-box').find('.profile-btn').attr('id', 'profileDropdown').attr('data-bs-toggle', '');
                $('.profile-right-sidebar').addClass('active');
                $('body').addClass('overflow-hidden');
                $(this).prop('checked', true);
            }
        });
        $(function () {
            $(document).on('click', '#profileDropdown', function (e) {
                $('.profile-right-sidebar').addClass('active');
                $('body').addClass('overflow-hidden');
                e.stopPropagation();
            });
            
            $('.profile-right-sidebar').on('click', function (e) {
                e.stopPropagation();
            });
        
            $(document).on('click', function (e) {
                if (!$(e.target).closest('.profile-right-sidebar').length) {
                    $('.profile-right-sidebar').removeClass('active');
                    $('body').removeClass('overflow-hidden');
                }
            });
        });        



        //------------------------------------------------------------------------------------------------------------------
        // Theme Color Change From Header & Settings
        //------------------------------------------------------------------------------------------------------------------
        // ====== Enable Light Theme From Header ======
        let lightMode = localStorage.getItem('lightMode');
        const enableLightMode = () => {
            $('body').addClass('light-theme');
            $('.theme-color-btn').addClass('light-mode');
            if ($('.theme-color-btn').hasClass('light-mode')) {
                $('.theme-color-btn').html('<i class="fa-light fa-cloud-moon"></i>');
                $('#lightTheme').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
                $('.header .main-logo .logo-big img, .mobile-logo img, .logo img').attr('src', 'assets/images/logo-black.png');
            } else {
                $('.theme-color-btn').html('<i class="fa-light fa-sun-bright"></i>');
                $('#lightTheme').removeClass('active');
                if($('body').hasClass('dark-theme')){
                    $('#darkTheme').addClass('active');
                } else {
                    $('#blueTheme').addClass('active');
                }
            }
            localStorage.setItem("lightMode", "enabled");
        };
        const disableLightMode = () => {
            $('body').removeClass('light-theme');
            $('.theme-color-btn').removeClass('light-mode');
            if (!$('.theme-color-btn').hasClass('light-mode')) {
                $('.theme-color-btn').html('<i class="fa-light fa-sun-bright"></i>');
                $('#lightTheme').removeClass('active');
                if($('body').hasClass('dark-theme')){
                    $('#darkTheme').addClass('active');
                } else {
                    $('#blueTheme').addClass('active');
                }
                $('.header .main-logo .logo-big img, .mobile-logo img, .logo img').attr('src', 'assets/images/logo-big.png');
            } else {
                $('.theme-color-btn').html('<i class="fa-light fa-cloud-moon"></i>');
                $('#lightTheme').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
            }
            localStorage.setItem("lightMode", null);
        };
        if (lightMode === "enabled") {
            enableLightMode();
            localStorage.removeItem("darkTheme");
            localStorage.removeItem("blueTheme");
            $('#lightTheme').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('.theme-color-btn').on('click', function () {
            lightMode = localStorage.getItem("lightMode");
            
            if (lightMode !== "enabled") {
                enableLightMode();
                // disableDarkMode();
            } else {
                localStorage.removeItem("lightTheme");
                // localStorage.removeItem("darkTheme");
                disableLightMode();
            }
        });
        // ====== Enable Light Theme From Header ======

        // ====== Enable Light Theme From Settings ======
        $('#lightTheme').on('click', function () {
            enableLightMode();
            disableDarkMode();
        });


        // ====== Enable Dark Theme From Settings ======
        let darkMode = localStorage.getItem('darkMode');
        const enableDarkMode = () => {
            $('body').addClass('dark-theme').removeClass('light-theme');
            $('.header .main-logo .logo-big img, .mobile-logo img, .logo img').attr('src', 'assets/images/logo-big.png');
            $('.theme-color-btn').removeClass('light-mode');
            if ($('.theme-color-btn').hasClass('light-mode')) {
                $('.theme-color-btn').html('<i class="fa-light fa-cloud-moon"></i>');
            } else {
                $('.theme-color-btn').html('<i class="fa-light fa-sun-bright"></i>');
            }
            localStorage.setItem("darkMode", "enabled");
        };
        const disableDarkMode = () => {
            $('body').removeClass('dark-theme');
            $('.theme-color-btn').removeClass('light-mode');
            if($('body').hasClass('light-theme')) {
                $('.header .main-logo .logo-big img').attr('src', 'assets/images/logo-black.png');
                $('.theme-color-btn').addClass('light-mode');
            }
            if ($('.theme-color-btn').hasClass('light-mode')) {
                $('.theme-color-btn').html('<i class="fa-light fa-cloud-moon"></i>');
            } else {
                $('.theme-color-btn').html('<i class="fa-light fa-sun-bright"></i>');
            }
            localStorage.setItem("darkMode", null);
        };
        if (darkMode === "enabled") {
            enableDarkMode();
            $('#darkTheme').addClass('active');
        }
        $('#darkTheme').on('click', function () {
            enableDarkMode();
            disableLightMode();
        });


        // ====== Enable Blue Theme From Settings ======
        $('#blueTheme').on('click', function () {
            disableDarkMode();
            disableLightMode();
        });


        //------------------------------------------------------------------------------------------------------------------
        // Main Content Height
        //------------------------------------------------------------------------------------------------------------------
        var windowHeight = $(window).height();
        $('.main-content').css('min-height', windowHeight - 70);
        if ($(window).width() < 1800) {
            $('.main-content').css('min-height', windowHeight - 60);
        }
        if ($(window).width() < 992) {
            $('.main-content').css('min-height', windowHeight - 50);
        }




        //------------------------------------------------------------------------------------------------------------------
        // Template Right Sidebar Option
        //------------------------------------------------------------------------------------------------------------------
        $(function () {
            $('.theme-settings-btn').on('click', function (e) {
                $('.right-sidebar').addClass('active');
                $('body').addClass('overflow-hidden');
                e.stopPropagation()
            });
            
            $('.right-sidebar').on('click', function (e) {
                e.stopPropagation();
            });

            $(document).on('click', function (e) {
                if ($(e.target).is('.right-sidebar *') === false) {
                    $('.right-sidebar').removeClass('active');
                    $('body').removeClass('overflow-hidden');
                }
            });
        });
        $('.right-bar-close').on('click', function () {
            $('.right-sidebar, .profile-right-sidebar').removeClass('active');
            $('body').removeClass('overflow-hidden');
        });



        //------------------------------------------------------------------------------------------------------------------
        // Settings Group Collapsing
        //------------------------------------------------------------------------------------------------------------------
        $('.sidebar-subtitle span').on('click', function () {
            $(this).toggleClass('collapsed');
            $(this).parent().siblings().slideToggle(100);
        });



        //------------------------------------------------------------------------------------------------------------------
        // Main Menu Position Change From Settings
        //------------------------------------------------------------------------------------------------------------------
        $('.settings-row').each(function() {
            var $buttons = $(this).find('.dashboard-icon:not(#enableLoader):not(#disableLoader)');
            var $buttonArray = $buttons.toArray();

            $buttonArray.forEach(function(button) {
                var classesToInsert = window.localStorage.getItem(button.id);
                if (classesToInsert != null) {
                    var classesToInsertArray = classesToInsert.split(' ');
                    for (let i = 0; i < classesToInsertArray.length; i++) {
                        $(button).addClass(classesToInsertArray[i]);
                    }
                }
                $(button).on('click', function() {
                    var classesToInsert = 'active';
                    var classesToInsertArray = classesToInsert.split(' ');
                    for (let i = 0; i < classesToInsertArray.length; i++) {
                        $(button).addClass(classesToInsertArray[i]);
                    }

                    $buttonArray.forEach(function(btn) {
                        if (btn !== button) {
                            $(btn).removeClass('active');
                            window.localStorage.removeItem(btn.id);
                        }
                    });

                    window.localStorage.setItem(button.id, classesToInsert);
                });
            });

            var initiallySelectedButton = $buttonArray.find(function(button) {
                return $(button).hasClass('active');
            });

            if (initiallySelectedButton && !localStorage.getItem(initiallySelectedButton.id)) {
                var activeButtons = $buttonArray.filter(function(button) {
                    return $(button).hasClass('active');
                });
                if (activeButtons.length > 1) {
                    $(initiallySelectedButton).removeClass('active');
                }
            }
        });

        let horizontalMenu = localStorage.getItem('horizontalMenu');
        const enableHorizontalMenu = () => {
            $('html').attr('data-menu', 'horizontal');
            if($('html').attr('data-menu') === ('horizontal')) {
                $('.main-sidebar').addClass('horizontal-menu').removeClass('collapsed two-column-menu sub-menu-collapsed sidebar-hover hoverable flush-menu');
                if ($('.sidebar-menu').overlayScrollbars()) {
                    $('.sidebar-menu').overlayScrollbars().destroy();
                }
                $('.sidebar-link-group-title').removeClass('show');
                $('.sidebar-link-group').unbind('show').hide();
                $('.sidebar-link.has-sub').removeClass('show');
                $('.header').removeClass('expanded');
                $('.nav-close-btn').hide();
                $('body').removeClass('body-padding hover-menu has-two-column-menu').addClass('has-horizontal');
                $('.sidebar-dropdown-menu').hide();
                $('.sidebar-dropdown-item > .has-sub').each(function (e) {
                    $('[data-dropdown="' + $(this).attr('data-dropdown') + '"]').parent().append($('#' + $(this).attr('data-dropdown')));
                });
                $('#navBarSizeGroup').hide().find('.dashboard-icon').removeClass('active');
                $('#navBarSizeGroup').hide().find('.dashboard-icon').first().addClass('active');
                $('.main-content').css('min-height', windowHeight - 119);
                if ($(window).width() < 1800) {
                    $('.main-content').css('min-height', windowHeight - 107);
                }
                if ($(window).width() < 992) {
                    $('.main-content').css('min-height', windowHeight - 50);
                }
            }
            localStorage.setItem("horizontalMenu", "enabled");
        };
        if (horizontalMenu === "enabled") {
            enableHorizontalMenu();
            $('#horizontalMenu').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('#horizontalMenu').on('click', function () {
            enableHorizontalMenu();
        });

        let twoColumnMenu = localStorage.getItem('twoColumnMenu');
        const enableTwoColumnMenu = () => {
            $('html').attr('data-menu', 'two-column');
            if($('html').attr('data-menu') === ('two-column')) {
                $('.main-sidebar').addClass('two-column-menu collapsed').removeClass('horizontal-menu sidebar-hover hoverable flush-menu');
                $(".scrollable").overlayScrollbars({});
                $('.sidebar-dropdown-menu[id]').appendTo('.main-sidebar');
                $('.sidebar-dropdown-menu[id]').hide();
                $('.sidebar-dropdown-menu[id]').first().show();
                if(!$('body').hasClass('has-two-column-menu')) {
                    $('body').removeClass('expanded has-horizontal hover-menu').addClass('body-padding has-two-column-menu');
                    $('.header').removeClass('expanded');
                }
                $('.has-sub[data-dropdown]').removeClass('show');
                $('.has-sub[data-dropdown]').first().addClass('show');
                $('.sidebar-link-group').show();
                $('.nav-close-btn').show();
                $('#navBarSizeGroup').hide().find('.dashboard-icon').removeClass('active');
                $('#navBarSizeGroup').hide().find('.dashboard-icon').first().addClass('active');
                $('.main-content').css('min-height', windowHeight - 70);
                if ($(window).width() < 1800) {
                    $('.main-content').css('min-height', windowHeight - 60);
                }
                if ($(window).width() < 992) {
                    $('.main-content').css('min-height', windowHeight - 50);
                }
            }
            localStorage.setItem("twoColumnMenu", "enabled");
            localStorage.removeItem("sidebarSmall");
            localStorage.removeItem("sidebarHover");
        };
        if (twoColumnMenu === "enabled") {
            enableTwoColumnMenu();
            $('#twoColumnMenu').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('#twoColumnMenu').on('click', function () {
            enableTwoColumnMenu();
        });

        let verticalMenu = localStorage.getItem('verticalMenu');
        const enableVerticalMenu = () => {
            $('html').attr('data-menu', 'vertical');
            if($('html').attr('data-menu') === ('vertical')) {
                $('.main-sidebar').removeClass('horizontal-menu two-column-menu sub-menu-collapsed collapsed flush-menu hoverable sidebar-hover');
                $(".scrollable").overlayScrollbars({});
                $('.sidebar-link-group-title').addClass('show');
                $('.sidebar-link-group').unbind('hide').show();
                $('.nav-close-btn').show();
                $('body').addClass('body-padding').removeClass('has-horizontal expanded has-fixed-sidebar hover-menu has-two-column-menu');
                $('.header').removeClass('expanded');
                $('.has-sub').removeClass('show');
                $('.sidebar-dropdown-menu').hide();
                $('.sidebar-dropdown-item > .has-sub').each(function (e) {
                    $('[data-dropdown="' + $(this).attr('data-dropdown') + '"]').parent().append($('#' + $(this).attr('data-dropdown')));
                });
                $('#navBarSizeGroup').show();
                $('#sidebarSmall, #sidebarHover').removeClass('active');
                $('#sidebarDefault').addClass('active');
                $('.main-content').css('min-height', windowHeight - 70);
                if ($(window).width() < 1800) {
                    $('.main-content').css('min-height', windowHeight - 60);
                }
                if ($(window).width() < 992) {
                    $('.main-content').css('min-height', windowHeight - 50);
                }
            }
            localStorage.setItem("verticalMenu", "enabled");
        };
        if (verticalMenu === "enabled") {
            enableVerticalMenu();
            $('#verticalMenu').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('#verticalMenu').on('click', function () {
            enableVerticalMenu();
        });

        let flushMenu = localStorage.getItem('flushMenu');
        const enableFlushMenu = () => {
            $('html').attr('data-menu', 'flush-mwnu');
            if($('html').attr('data-menu') === ('flush-mwnu')) {
                $('.main-sidebar').addClass('flush-menu').removeClass('horizontal-menu two-column-menu sub-menu-collapsed collapsed');
                if ($('.main-sidebar').hasClass('sidebar-hover')) {
                    $('.header').addClass('expanded');
                } else {
                    $('.header').removeClass('expanded');
                }
                $(".scrollable").overlayScrollbars({});
                $('.sidebar-link-group').unbind('hide').show();
                $('body').addClass('body-padding').removeClass('has-horizontal has-fixed-sidebar expanded has-two-column-menu');
                $('.nav-close-btn').show();
                $('.sidebar-dropdown-item > .has-sub').each(function (e) {
                    $('[data-dropdown="' + $(this).attr('data-dropdown') + '"]').parent().append($('#' + $(this).attr('data-dropdown')));
                });
                $('#navBarSizeGroup').show();
                $('.main-content').css('min-height', windowHeight - 70);
                if ($(window).width() < 1800) {
                    $('.main-content').css('min-height', windowHeight - 60);
                }
                if ($(window).width() < 992) {
                    $('.main-content').css('min-height', windowHeight - 50);
                }
            }
            localStorage.setItem("flushMenu", "enabled");
        };
        if (flushMenu === "enabled") {
            enableFlushMenu();
            $('#flushMenu').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('#flushMenu').on('click', function () {
            enableFlushMenu();
        });
        if ($('.main-sidebar').hasClass('horizontal-menu')) {
            $('.sidebar-menu').removeClass('scrollable');
            $('.sidebar-link-group').hide();
            $('body').addClass('has-horizontal').removeClass('body-padding');
        }
        if ($('.main-sidebar').hasClass('two-column-menu')) {
            $('.sidebar-dropdown-menu[id]').appendTo('.main-sidebar');
            $('.sidebar-dropdown-menu[id]').first().show();
            $('.has-sub[data-dropdown]').first().addClass('show');
        }



        //------------------------------------------------------------------------------------------------------------------
        // Theme Direction Change From Settings
        //------------------------------------------------------------------------------------------------------------------
        $('#dirRtl').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('html').attr('dir', 'rtl');
            $('#rtlStyle').attr('href', 'assets/css/rtl-style.css');
            localStorage.setItem('layoutDirection', 'rtl');
            for (const editor of Object.values(window.editors)) {
                editor.setData(editor.getData(), { direction: 'rtl' });
            }
        });
        $('#dirLtr').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('html').removeAttr('dir', 'rtl');
            $('#rtlStyle').attr('href', '#');
            localStorage.setItem('layoutDirection', 'ltr');
        });
        var layoutDirection = localStorage.getItem('layoutDirection');
        if (layoutDirection === 'rtl') {
            $('html').attr('dir', 'rtl');
            $('#rtlStyle').attr('href', 'assets/css/rtl-style.css');
        } else {
            $('html').removeAttr('dir', 'rtl');
            $('#rtlStyle').attr('href', '#');
        }



        //------------------------------------------------------------------------------------------------------------------
        // Primary Color Change From Settings
        //------------------------------------------------------------------------------------------------------------------
        $('.color-palette').on('click', function () {
            var styleSheet = $(this).data('color');
            $(this).addClass('active').siblings().removeClass('active');
            $('#primaryColor').attr('href', 'assets/css/' + styleSheet + '.css');
            
            // Save the selected style sheet in local storage
            localStorage.setItem('selectedStyleSheet', styleSheet);
        });

        // Check if a style sheet has been selected before and apply it on page load
        var selectedStyleSheet = localStorage.getItem('selectedStyleSheet');
        if (selectedStyleSheet) {
            $('.color-palette[data-color="' + selectedStyleSheet + '"]').addClass('active').siblings().removeClass('active');
            $('#primaryColor').attr('href', 'assets/css/' + selectedStyleSheet + '.css');
        }



        //------------------------------------------------------------------------------------------------------------------
        // Sidebar Style Change From Settings
        //------------------------------------------------------------------------------------------------------------------
        let sidebarSmall = localStorage.getItem('sidebarSmall');
        const enableSidebarSmall = () => {
            $('html').attr('data-nav-size', 'nav-small');
            if($('html').attr('data-nav-size') === ('nav-small')) {
                $('body').removeClass('hover-menu');
                $('.main-sidebar').removeClass('sidebar-hover hoverable');
                $('.nav-close-btn').show();
                if ($(window).width() > 1199) {
                    $('body').has('.main-sidebar').find('.header').addClass('expanded')
                    $('.header .logo').addClass('small');
                    $('.main-sidebar').addClass('collapsed');
                    $('.body-padding').addClass('expanded', 300);
                    $('.sidebar-link-group').show();
                } else {
                    $('body').has('.main-sidebar').find('.header').addClass('has-sidebar');
                    $('.main-sidebar').removeClass('sidebar-mini');
                    $('.main-sidebar').removeClass('collapsed');
                }
                if ($('.sidebar-menu').overlayScrollbars({})) {
                    $('.sidebar-menu').overlayScrollbars().destroy();
                } else {
                    $('.sidebar-menu').overlayScrollbars({});
                }
            }
            localStorage.setItem("sidebarSmall", "enabled");
        };
        if (sidebarSmall === "enabled") {
            enableSidebarSmall();
            $('#sidebarSmall').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('#sidebarSmall').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            enableSidebarSmall();
        });

        let sidebarHover = localStorage.getItem('sidebarHover');
        const enableSidebarHover = () => {
            $('html').attr('data-nav-size', 'nav-hover');
            if($('html').attr('data-nav-size') === ('nav-hover')) {
                $('.main-sidebar').addClass('sidebar-hover hoverable').removeClass('collapsed');
                $('body').addClass('hover-menu').removeClass('expanded');
                $('.nav-close-btn').hide();
                $('.header').addClass('expanded');
                $('.sidebar-dropdown-menu').hide();
            }
            localStorage.setItem("sidebarHover", "enabled");
        };
        if (sidebarHover === "enabled") {
            enableSidebarHover();
            $('#sidebarHover').addClass('active').parent().siblings().find('.dashboard-icon').removeClass('active');
        }
        $('#sidebarHover').on('click', function () {
            enableSidebarHover();
        });
        
        $('#sidebarDefault').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('html').attr('data-nav-size', 'nav-default');
            if($('html').attr('data-nav-size') === ('nav-default')) {
                $('.nav-close-btn').show();
                if ($(window).width() > 1199) {
                    $('body').has('.main-sidebar').find('.header').removeClass('expanded')
                    $('.header .logo').removeClass('small');
                    $('.main-sidebar').removeClass('collapsed sidebar-hover hoverable');
                    $('.body-padding').removeClass('expanded hover-menu')
                    $('.sidebar-link-group').show()
                } else {
                    $('body').has('.main-sidebar').find('.header').removeClass('has-sidebar')
                    $('.main-sidebar').removeClass('sidebar-mini')
                    $('.main-sidebar').removeClass('collapsed')
                }
                if ($('.main-sidebar').hasClass('collapsed')) {
                    $(".sidebar-menu").overlayScrollbars().destroy();
                } else {
                    $(".sidebar-menu").overlayScrollbars({});
                }
            }
        });
        $('.main-sidebar').hover(function () {
            if ($(this).hasClass('hoverable')) {
                $(this).toggleClass('sidebar-hover');
                $(".scrollable").overlayScrollbars({});
                $('body').toggleClass('hover-menu');
                $('.header').toggleClass('expanded');
                $('.has-sub.show').siblings('.sidebar-dropdown-menu').toggle();
            }
        });



        //------------------------------------------------------------------------------------------------------------------
        // Main Sidebar Background Change From Settings
        //------------------------------------------------------------------------------------------------------------------
        $('.sidebar-bg-btn').each(function () {
            var navBackground = $(this).attr('data-img');
            $(this).css('background-image', 'url(' + navBackground + ')');
        });
        $('.sidebar-bg-btn').on('click', function () {
            var navBackground = $(this).attr('data-img');
            $(this).addClass('active').siblings().removeClass('active');
            $('.main-sidebar').css('background-image', 'url(' + navBackground + ')');
            localStorage.setItem('navbackgroundImage', navBackground);
        });
        $('#noBackground').on('click', function () {
            $(this).siblings().removeClass('active');
            $('.main-sidebar').css('background-image', 'none');
            localStorage.removeItem('navbackgroundImage');
        });
        var navbackgroundImage = localStorage.getItem('navbackgroundImage');
        if (navbackgroundImage) {
            $('.sidebar-bg-btn[data-img="' + navbackgroundImage + '"]').addClass('active').siblings().removeClass('active');
            $('.main-sidebar').css('background-image', 'url(' + navbackgroundImage + ')');
        }
        
        



        //------------------------------------------------------------------------------------------------------------------
        // Main Content Background Change From Settings
        //------------------------------------------------------------------------------------------------------------------
        $('.main-content-bg-btn').each(function () {
            var bodyBackground = $(this).attr('data-img');
            $(this).css('background-image', 'url(' + bodyBackground + ')');
        });
        $('.main-content-bg-btn').on('click', function () {
            var bodyBackground = $(this).attr('data-img');
            $(this).addClass('active').siblings().removeClass('active');
            $('body').css('background-image', 'url(' + bodyBackground + ')');
            localStorage.setItem('mainBackgroundImage', bodyBackground);
        });
        $('#noBackground2').on('click', function () {
            $(this).siblings().removeClass('active');
            $('body').css('background-image', 'none');
            localStorage.removeItem('mainBackgroundImage');
        });
        var mainBackgroundImage = localStorage.getItem('mainBackgroundImage');
        if (mainBackgroundImage) {
            $('.main-content-bg-btn[data-img="' + mainBackgroundImage + '"]').addClass('active').siblings().removeClass('active');
            $('body').css('background-image', 'url(' + mainBackgroundImage + ')');
        }



        //------------------------------------------------------------------------------------------------------------------
        // Disable & Enable Preloader From Settings
        //------------------------------------------------------------------------------------------------------------------
        $('#disableLoader').on('click', function () {
            $('.preloader').addClass('d-none');
            $(this).addClass('active');
            $('#enableLoader').removeClass('active');
        })
        $('#enableLoader').on('click', function () {
            $('.preloader').removeClass('d-none');
            var preLoder = $(".preloader");
            preLoder.fadeIn(100);
            preLoder.fadeOut(2000);
            $(this).addClass('active');
            $('#disableLoader').removeClass('active');
        });




        //------------------------------------------------------------------------------------------------------------------
        // Template Sidebar Dropdown
        //------------------------------------------------------------------------------------------------------------------
        $('.sidebar-link-group-title').on('click', function () {
            if (!$('.main-sidebar').hasClass('horizontal-menu')) {
                $(this).siblings('.sidebar-link-group').slideToggle(300);
            }
        });
        $('.sidebar-item').hover(function () {
            if ($('.main-sidebar').hasClass('horizontal-menu')) {
                $(this).find('.sidebar-link-group').toggleClass('show');
            }
        });
        $('.has-sub').on('click', function () {
            var dropdownId = $(this).attr('data-dropdown');
            if (!$('.main-sidebar').hasClass('horizontal-menu two-column-menu')) {
                if ($('.sidebar-link').hasClass('has-sub')) {
                    $(this).toggleClass('show');
                    $(this).siblings('.sidebar-dropdown-menu').slideToggle(300).parent('.sidebar-item');
                    $(this).parent('.sidebar-item').siblings().find('.sidebar-dropdown-menu').hide(300).siblings().removeClass("show");
                    $(this).parent('.sidebar-dropdown-item').siblings().children('.sidebar-link').removeClass('show');
                    $(this).parents('.sidebar-item').siblings().find('.sidebar-link').removeClass('show');
                    $(this).parent('.sidebar-dropdown-item').siblings().find('.sidebar-dropdown-menu').hide(300).siblings().removeClass("show");
                    $(this).parents('.sidebar-item').siblings().find('.sidebar-dropdown-menu').hide(300).siblings().removeClass("show");
                }
            }
            if ($('.main-sidebar').hasClass('two-column-menu')) {
                $(this).addClass('show');
                $('.main-sidebar').addClass('open-sub').removeClass('sub-menu-collapsed');
                $('#' + dropdownId).show().siblings('.sidebar-dropdown-menu').hide();
                $('.header').removeClass('expanded');
                $('body').removeClass('expanded');
            }
        });
        $(".sidebar-link").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                if (!$('.main-sidebar').hasClass('horizontal-menu')) {
                    $(this).parents(".sidebar-item").addClass("open");
                }
            }
        });
        $('.sidebar-link.has-sub').parent().hover(function () {
            $(this).children('.sidebar-dropdown-menu').toggleClass('show');
        });
        $(".sidebar-menu .active").parent().parents(".sidebar-dropdown-menu").show().siblings().addClass("show");



        //------------------------------------------------------------------------------------------------------------------
        // Template Left Sidebar Collapse
        //------------------------------------------------------------------------------------------------------------------
        $(function () {
            $('#navClose').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(window).width() > 1199) {
                    $('body').has('.main-sidebar').find('.header').toggleClass('expanded')
                    $('.header .logo').toggleClass('small')
                    if (!$('.main-sidebar').hasClass('two-column-menu')) {
                        $('.main-sidebar').toggleClass('collapsed');
                    }
                    $('.body-padding').toggleClass('expanded')
                    $('.sidebar-link-group').show()
                } else {
                    $('.main-sidebar').toggleClass('sidebar-mini')
                    $('.main-sidebar').removeClass('collapsed')
                }
                if ($('.main-sidebar').hasClass('collapsed')) {
                    $(".sidebar-menu").overlayScrollbars().destroy();
                } else {
                    $(".sidebar-menu").overlayScrollbars({});
                }
                if ($('.main-sidebar').hasClass('two-column-menu')) {
                    $(".sidebar-menu").overlayScrollbars({});
                    $('.main-sidebar').toggleClass('sub-menu-collapsed').addClass('collapsed');
                    $('body').addClass('has-fixed-sidebar');
                }
            });
            $(document).on('click', function (e) {
                if ($(e.target).is('.main-sidebar *') === false) {
                    $('.main-sidebar').removeClass('sidebar-mini');
                    if ($(window).width() < 1200) {
                        if ($('.main-sidebar').hasClass('two-column-menu')) {
                            $('.main-sidebar').addClass('sub-menu-collapsed');
                        }
                    }
                }
            });
        });



        //------------------------------------------------------------------------------------------------------------------
        // Dropdown Menu Inside Table & DataTable
        //------------------------------------------------------------------------------------------------------------------
        $('.table .dropdown-menu').parent().on('shown.bs.dropdown', function () {
            $(this).parents('.table-responsive').css('overflow', 'visible');
        });
        $('.table .dropdown-menu').parent().on('hidden.bs.dropdown', function () {
            if ($('.table .dropdown button.show').length == 0) {
                $(this).parents('.table-responsive').css('overflow-x', 'auto');
            }
        });
        $('.digi-dataTable').on('draw.dt', function () {
            $('.dataTables_scrollBody .dropdown-menu').parent().on('shown.bs.dropdown', function () {
                $(this).parents('.dataTables_scrollBody').addClass('overflow-visible');
            });
            $('.dataTables_scrollBody .dropdown-menu').parent().on('hidden.bs.dropdown', function (e) {
                if ($('.dataTables_scrollBody .dropdown button.show').length == 0) {
                    $(this).parents('.dataTables_scrollBody').removeClass('overflow-visible');
                }
            });
        });



        //------------------------------------------------------------------------------------------------------------------
        // Password Show Button
        //------------------------------------------------------------------------------------------------------------------
        $('.password-show').on('click', function(){
            $(this).find('i').toggleClass('fa-eye-slash fa-eye');
            var textType = $(this).siblings('input').attr('type');
            var passType;
            if(textType == 'text'){
                passType = 'password';
            }else{
                passType = 'text';
            }
            $(this).siblings('input').attr('type', passType);
        });



        //------------------------------------------------------------------------------------------------------------------
        // Grid & List View Option
        //------------------------------------------------------------------------------------------------------------------
        $('.btn-list-view').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.panel').find('.file-manager-row').addClass('list-view');
        });
        $('.btn-grid-view').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.panel').find('.file-manager-row').removeClass('list-view');
        });



        //------------------------------------------------------------------------------------------------------------------
        // Star Button Function
        //------------------------------------------------------------------------------------------------------------------
        $('.btn-star').on('click', function () {
            $(this).toggleClass('starred');
        });



        //------------------------------------------------------------------------------------------------------------------
        // Dropzone File Uploader Button
        //------------------------------------------------------------------------------------------------------------------
        $('.dz-button').html('<i class="fa-light fa-cloud-arrow-up"></i><span>Drop a file here or click to upload</span>');



        //------------------------------------------------------------------------------------------------------------------
        // Panel Close Function
        //------------------------------------------------------------------------------------------------------------------
        $('.panel-close').on('click', function () {
            $(this).toggleClass('collapsed');
            $(this).parents('.panel').toggleClass('collapsed').find('.panel-body').slideToggle();
            if ($(this).hasClass('collapsed')) {
                $(this).html('<i class="fa-light fa-angle-down"></i>');
            } else {
                $(this).html('<i class="fa-light fa-angle-up"></i>');
            }
        });



        //------------------------------------------------------------------------------------------------------------------
        // Bootstrap Tooltip Enable
        //------------------------------------------------------------------------------------------------------------------
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));



        //------------------------------------------------------------------------------------------------------------------
        // Rich Text Editor
        //------------------------------------------------------------------------------------------------------------------
        if ($('.editor').length) {
            window.editors = {};
            document.querySelectorAll('.editor').forEach((node, index) => {
                ClassicEditor
                    .create(node, {})
                    .then(newEditor => {
                        window.editors[index] = newEditor
                    });
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // All Product Page Table
        //------------------------------------------------------------------------------------------------------------------
        if ($('#allProductTable').length) {
            var dataTable = $('#allProductTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }]
            });
            $('#allProductTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#allProductTable_length').prependTo('#productTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#allProductTable_filter').prependTo('#tableSearch');
            $('#allProductTable_info, #allProductTable_paginate').prependTo('.table-bottom-control');

            $('#markAllProduct').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_wrapper').find('tbody tr .form-check-input').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_wrapper').find('tbody tr .form-check-input').prop('checked', false);
                }
            });
            $('#allProductTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#allProductTable').on('draw.dt', function () {
                $('#allProductTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#allProductTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#allProductTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $('#allProductTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Chatting Page Functions
        //------------------------------------------------------------------------------------------------------------------
        if ($('.chatting-panel').length) {
            $('.active-members').owlCarousel({
                items: 6,
                margin: 5,
                dots: false,
                nav: true,
                autoWidth: true,
                navText: ['<i class="fa-light fa-angle-left"></i>', '<i class="fa-light fa-angle-right"></i>'],
                loop: true,
            });


            $(window).on('load', function () {
                var ChatDiv = $('.msg-area .os-viewport');
                var height = ChatDiv[0].scrollHeight;
                ChatDiv.scrollTop(height);
            });


            $('#searchMsg').on('click', function () {
                $('.search-in-chat').toggleClass('active');
            });


            if ($(window).width() < 768) {
                $('.message-list .single-message').on('click', function () {
                    $(this).parents('.panel').addClass('closed');
                });
            }


            if ($(window).width() < 1400) {
                $('.back-to-all-chat').on('click', function () {
                    $('.chatting-panel').find('.panel:first-child').removeClass('closed');
                });
                $('#searchMsg').prependTo('.chatting-panel-top-btns');
                $('.back-to-chat-btn').on('click', function () {
                    $(this).parents('.panel').addClass('closed');
                });
                $('.show-chatting-info').on('click', function () {
                    $('.chatting-panel').find('.panel:last-child').removeClass('closed');
                });
            }
        }



        //------------------------------------------------------------------------------------------------------------------
        // Email List Table
        //------------------------------------------------------------------------------------------------------------------
        if ($('.email-table').length) {
            var tableHeight = $('.email-table').parent().height() - 48;
            var dataTable = $('.email-table').each(function () {
                $(this).DataTable({
                    scrollX: true,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false
                    }],
                    scrollY: tableHeight + 'px',
                    scrollCollapse: true,
                });
            });
            $('.dataTables_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('.dataTables_length').each(function () {
                $(this).prependTo($(this).parents('.tab-pane').find('.productTableLength')).find('select').addClass('form-control form-control-sm px-3');
            });
            $('.dataTables_filter').each(function () {
                $(this).prependTo($(this).parents('.tab-pane').find('.tableSearch'));
            });
            $('.paging_simple_numbers').each(function () {
                $(this).prependTo($(this).parents('.tab-pane').find('.table-bottom-control'));
            });
            $('.dataTables_info').each(function () {
                $(this).prependTo($(this).parents('.tab-pane').find('.table-bottom-control'));
            });

            $('.markAllMail').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_wrapper').find('tbody tr .form-check-input').prop('checked', true);
                    $(this).parents('.panel-body').find('.top-action').removeClass('d-none');
                } else {
                    $(this).parents('.dataTables_wrapper').find('tbody tr .form-check-input').prop('checked', false);
                    $(this).parents('.panel-body').find('.top-action').addClass('d-none');
                }
            });

            $('button[data-bs-toggle=tab]').on('shown.bs.tab', function (e) {
                $($.fn.dataTable.tables(true)).DataTable()
                    .columns.adjust()
            });
            $('.email-table tr').on('click', function () {
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('.email-table').each(function () {
                $(this).on('draw.dt', function () {
                    $('.email-table tr').on('click', function () {
                        $(this).toggleClass('selected');
                        $(this).siblings().removeClass('selected');
                    });
                    var tableId = $(this).attr('id');
                    if ($('#' + tableId + '_wrapper thead th input[type=checkbox]').is(':checked')) {
                        $('#' + tableId + '_wrapper tbody .form-check-input').prop('checked', true);
                    } else {
                        $('#' + tableId + '_wrapper tbody .form-check-input').prop('checked', false);
                    }
                });
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Email Page Sidebar Option For Small Devices
        //------------------------------------------------------------------------------------------------------------------
        if ($(window).width() < 992) {
            $('.mail-menu-btn').on('click', function () {
                $('.email-panel > .panel:first-child').show();
            });
            $('.close-mail-menu-btn, .emial-menu-list .nav .btn-flush').on('click', function () {
                $('.email-panel > .panel:first-child').hide();
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Jquery UI Date Picker
        //------------------------------------------------------------------------------------------------------------------
        if ($('.date-picker').length) {
            $('.date-picker').datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: 'd M, y',
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Jquery Uploader Plugin For Form Elements Page
        //------------------------------------------------------------------------------------------------------------------
        if ($('.component-jquery-uploader').length) {
            let ajaxConfig = {
                ajaxRequester: function (config, uploadFile, pCall, sCall, eCall) {
                    let progress = 0
                    let interval = setInterval(() => {
                        progress += 10;
                        pCall(progress)
                        if (progress >= 100) {
                            clearInterval(interval)
                            const windowURL = window.URL || window.webkitURL;
                            sCall({
                                data: windowURL.createObjectURL(uploadFile.file)
                            })
                        }
                    }, 300)
                }
            }
            $('#singleUpload').uploader({
                ajaxConfig: ajaxConfig,
            });
            $('#multipleUpload').uploader({
                ajaxConfig: ajaxConfig,
                multiple: true,
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Data Table For Table Component Page
        //------------------------------------------------------------------------------------------------------------------
        if ($('#componentDataTable').length) {
            var dataTable = $('#componentDataTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }]
            });
            $('#componentDataTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('.dataTables_length').find('select').addClass('form-control form-control-sm px-3');
            $('thead th input[type=checkbox]').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });

            $('#componentDataTable').on('draw.dt', function () {
                if ($('#componentDataTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#componentDataTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $('#componentDataTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });
        }
        if ($('#componentDataTable2').length) {
            var dataTable2 = $('#componentDataTable2').DataTable({
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }],
                scrollX: true,
                scrollY: '250px',
                scrollCollapse: true,
            });
            $('#componentDataTable2_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('.dataTables_length').find('select').addClass('form-control form-control-sm px-3');
            $('thead th input[type=checkbox]').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });

            $('#componentDataTable2').on('draw.dt', function () {
                if ($('#componentDataTable2_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#componentDataTable2_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $('#componentDataTable2_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });
        }
        if ($('#componentDataTable3').length) {
            var dataTable2 = $('#componentDataTable3').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }],
            });
            $('#componentDataTable3_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('.dataTables_length').find('select').addClass('form-control form-control-sm px-3');
            $('thead th input[type=checkbox]').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });


            $(".dataTable-resize td:not(:last-child), .dataTable-resize th:not(:last-child)")
                .css({
                    position: "relative"
                })
                .prepend("<div class='resizer'></div>")
                .resizable({
                    resizeHeight: false,
                    grid: [1, 10000],
                    handleSelector: "",
                    onDragStart: function (e, $el, opt) {
                        if (!$(e.target).hasClass("resizer"))
                            return false;
                        return true;
                    }
                });
            $('.dataTable-resize .ui-resizable-s, .dataTable-resize .ui-resizable-se').remove();

            $('#componentDataTable3').on('draw.dt', function () {
                if ($('#componentDataTable3_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#componentDataTable3_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $('#componentDataTable3_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Address Section In Add Employee Page
        //------------------------------------------------------------------------------------------------------------------
        if ($('#presentSameAsPermanent').length) {
            $('#presentSameAsPermanent').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.card-header').addClass('border-bottom-0').siblings('.card-body').slideUp();
                } else {
                    $(this).parents('.card-header').removeClass('border-bottom-0').siblings('.card-body').slideDown();
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // All Employee Page Table
        //------------------------------------------------------------------------------------------------------------------
        if ($('#allEmployeeTable').length) {
            var dataTable = $('#allEmployeeTable').DataTable({
                responsive: true,
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }]
            });
            $('#allEmployeeTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#allEmployeeTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#allEmployeeTable_filter').prependTo('#tableSearch');
            $('#allEmployeeTable_info, #allEmployeeTable_paginate').prependTo('.table-bottom-control');

            $('#markAllEmployee').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input').prop('checked', false);
                }
            });
            $('#allEmployeeTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#allEmployeeTable').on('draw.dt', function () {
                $('#allEmployeeTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#allEmployeeTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#allEmployeeTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', true);
                } else {
                    $('#allEmployeeTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Invoice Print Function
        //------------------------------------------------------------------------------------------------------------------
        if ($('#invoicePrint').length) {
            $('#printInvoice').on('click', function () {
                $('#invoiceBody').print({
                    stylesheet: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"]
                });
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Attendance Table In HRM Module
        //------------------------------------------------------------------------------------------------------------------
        if ($('#attendanceTable').length) {
            var dataTable = $('#attendanceTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }],
            });
            $('#attendanceTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#attendanceTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#attendanceTable_filter').prependTo('#tableSearch');
            $('#attendanceTable_info, #attendanceTable_paginate').prependTo('.table-bottom-control');

            $('#markAllAttendance').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_wrapper').find('tbody tr .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_wrapper').find('tbody tr .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
            $('#attendanceTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#attendanceTable').on('draw.dt', function () {
                $('#attendanceTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#attendanceTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#attendanceTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $('#attendanceTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // All Customer Table In CRM Module
        //------------------------------------------------------------------------------------------------------------------
        if ($('#allCustomerTable').length) {
            var dataTable = $('#allCustomerTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }],
            });
            $('#allCustomerTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#allCustomerTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#allCustomerTable_filter').prependTo('#tableSearch');
            $('#allCustomerTable_info, #allCustomerTable_paginate').prependTo('.table-bottom-control');

            $('#markAllCustomer').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
            $('#allCustomerTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#allCustomerTable').on('draw.dt', function () {
                $('#allCustomerTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#allCustomerTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#allCustomerTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $('#allCustomerTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Leads Table In CRM Module
        //------------------------------------------------------------------------------------------------------------------
        if ($('#leadsTable').length) {
            var dataTable = $('#leadsTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }],
            });
            $('#leadsTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#leadsTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#leadsTable_filter').prependTo('#tableSearch');
            $('#leadsTable_info, #leadsTable_paginate').prependTo('.table-bottom-control');

            $('#markAllLeads').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
            $('#leadsTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#leadsTable').on('draw.dt', function () {
                $('#leadsTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#leadsTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#leadsTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $('#leadsTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Task Table In CRM Module
        //------------------------------------------------------------------------------------------------------------------
        if ($('#taskTable').length) {
            var dataTable = $('#taskTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }],
            });
            $('#taskTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#taskTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#taskTable_filter').prependTo('#tableSearch');
            $('#taskTable_info, #taskTable_paginate').prependTo('.table-bottom-control');

            $('#markAllLeads').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
            $('#taskTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#taskTable').on('draw.dt', function () {
                $('#taskTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#taskTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#taskTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $('#taskTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Target Audience Table In CRM Module
        //------------------------------------------------------------------------------------------------------------------
        if ($('#targetAudienceTable').length) {
            var dataTable = $('#targetAudienceTable').DataTable({
                responsive: true,
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }],
            });
            $('#targetAudienceTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#targetAudienceTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#targetAudienceTable_filter').prependTo('#tableSearch');
            $('#targetAudienceTable_info, #targetAudienceTable_paginate').prependTo('.table-bottom-control');

            $('#markAllAudience').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
            $('#targetAudienceTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#targetAudienceTable').on('draw.dt', function () {
                $('#targetAudienceTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#targetAudienceTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#targetAudienceTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $('#targetAudienceTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Company Table In CRM Module
        //------------------------------------------------------------------------------------------------------------------
        if ($('#companyTable').length) {
            var dataTable = $('#companyTable').DataTable({
                scrollX: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false
                }],
            });
            $('#companyTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('#companyTable_length').prependTo('#employeeTableLength').find('select').addClass('form-control form-control-sm px-3');
            $('#companyTable_filter').prependTo('#tableSearch');
            $('#companyTable_info, #companyTable_paginate').prependTo('.table-bottom-control');

            $('#markAllCompany').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $(this).parents('.dataTables_scroll').find('tbody tr .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
            $('#companyTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            });

            $('#companyTable').on('draw.dt', function () {
                $('#companyTable tr').on('click', function () {
                    $(this).toggleClass('selected');
                    $(this).siblings().removeClass('selected');
                });
                if ($('#companyTable_wrapper thead th input[type=checkbox]').is(':checked')) {
                    $('#companyTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', true);
                } else {
                    $('#companyTable_wrapper thead th input[type=checkbox]').parents('.dataTables_wrapper').find('tbody .form-check-input:not([role=switch])').prop('checked', false);
                }
            });
        }

        

        //------------------------------------------------------------------------------------------------------------------
        // Icon Copy Option On Icon Page
        //------------------------------------------------------------------------------------------------------------------
        async function askForClipboardPermission() {
            const permission = await navigator.permissions.query({ name: 'clipboard-read' });
            return permission;
        }
        if ($('.copy-icon').length) {
            $('.copy-icon').on('click', function (e) {
                e.preventDefault();
                var copyText = $(this).siblings('.icon-code');
                copyText.select();
                navigator.clipboard.writeText(copyText.val());
                $('.icon-alert').addClass('show');
                setTimeout(function () {
                    $('.icon-alert').removeClass('show');
                }, 1000);
            });
        }



        //------------------------------------------------------------------------------------------------------------------
        // Animation Plugin Intialization For Animation Page
        //------------------------------------------------------------------------------------------------------------------
        if ($('div[data-aos]').length) {
            AOS.init();
        }



        //------------------------------------------------------------------------------------------------------------------
        // Swiper Slider Initialization
        //------------------------------------------------------------------------------------------------------------------
        if ($('.swiper').length) {
            var swiper = new Swiper(".default-swiper", {
                loop: !0,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: !1
                }
            }),
                swiper = new Swiper(".navigation-swiper", {
                    loop: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                }),
                swiper = new Swiper(".pagination-swiper", {
                    loop: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        clickable: !0,
                        el: ".swiper-pagination",
                        dynamicBullets: !0
                    }
                }),
                swiper = new Swiper(".pagination-fraction-swiper", {
                    loop: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        clickable: !0,
                        el: ".swiper-pagination",
                        type: "fraction"
                    },
                }),
                swiper = new Swiper(".pagination-custom-swiper", {
                    loop: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        clickable: !0,
                        el: ".swiper-pagination",
                        renderBullet: function (e, i) {
                            return '<span class="' + i + '">' + (e + 1) + "</span>"
                        }
                    }
                }),
                swiper = new Swiper(".pagination-progress-swiper", {
                    loop: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        type: "progressbar"
                    },
                }),
                swiper = new Swiper(".pagination-scrollbar-swiper", {
                    loop: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    scrollbar: {
                        el: ".swiper-scrollbar",
                        hide: !0
                    },
                }),
                swiper = new Swiper(".vertical-swiper", {
                    loop: !0,
                    direction: "vertical",
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    }
                }),
                swiper = new Swiper(".mousewheel-control-swiper", {
                    loop: !0,
                    direction: "vertical",
                    mousewheel: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    }
                }),
                swiper = new Swiper(".effect-fade-swiper", {
                    loop: !0,
                    effect: "fade",
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    }
                }),
                swiper = new Swiper(".effect-flip-swiper", {
                    loop: !0,
                    effect: "flip",
                    grabCursor: !0,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    }
                }),
                swiper = new Swiper(".effect-creative-swiper", {
                    loop: !0,
                    grabCursor: !0,
                    effect: "creative",
                    creativeEffect: {
                        prev: {
                            shadow: !0,
                            translate: [0, 0, -400]
                        },
                        next: {
                            translate: ["100%", 0, 0]
                        }
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    }
                }),
                swiper = new Swiper(".effect-coverflow-swiper", {
                    loop: !0,
                    effect: "coverflow",
                    grabCursor: !0,
                    centeredSlides: !0,
                    slidesPerView: "4",
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: !0
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0,
                        dynamicBullets: !0
                    },
                    breakpoints: {
                        "@0.00": {
                            slidesPerView: 2,
                        },
                        "@0.75": {
                            slidesPerView: 2,
                        },
                        "@1.00": {
                            slidesPerView: 2,
                        },
                        "@1.50": {
                            slidesPerView: 2.5,
                        },
                        "@1.75": {
                            slidesPerView: 3,
                        },
                        "@2.00": {
                            slidesPerView: 4,
                        },
                    },
                }),
                swiper = new Swiper(".responsive-swiper", {
                    loop: !0,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }
                });
            var swiperHeight = $('.vertical-swiper').find('img').height();
            $('.vertical-swiper, .mousewheel-control-swiper').height(swiperHeight)
        }



        //------------------------------------------------------------------------------------------------------------------
        // File Manager Sidebar Collapse On Small Screen
        //------------------------------------------------------------------------------------------------------------------
        if($('.file-manager-sidebar-col').length) {
            if($(window).width() < 992) {
                $('.file-manager-menu-btn').on('click', function(){
                    $('.file-manager-sidebar-col').show();
                });
                $('.close-file-manager-menu-btn, .file-manager-tab-btn ').on('click', function(){
                    $('.file-manager-sidebar-col').hide();
                });
            }
        }



        if ($('.table-date-range-filter').length) {
            $('.table-date-range-filter').daterangepicker({
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
            });
        }
    });
})(jQuery);