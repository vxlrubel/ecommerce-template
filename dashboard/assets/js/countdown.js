(function ($) {
    'use strict';

    $('.countdown').countdown({
        date: '07/27/2035 17:00:00',
        offset: +2,
        day: 'Day',
        hideOnComplete: true
    }, function (container) {
        alert('Done!');
    });

})(jQuery);