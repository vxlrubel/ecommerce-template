(function($) {
    'use strict';
    $(document).ready(function() {

        $('select.form-control').select2({
            minimumResultsForSearch: -1,
            containerCssClass: ':all:',
            placeholder: function(){
                $(this).data('placeholder');
            }
        });
        $('select.form-control').on('select2:open', function(){
            if($('body').hasClass('modal-open')) {
                $('.select2-dropdown').addClass('select2-in-modal');
            } else {
                $('.select2-dropdown').removeClass('select2-in-modal');
            }
        });
        $('.select-search').select2({
            containerCssClass: ':all:',
            placeholder: function(){
                $(this).data('placeholder');
            }
        });
        $('.select-search').on('select2:open', function(){
            $('.select2-results__options').addClass('scrollable');
            if($('body').hasClass('modal-open')) {
                $('.select2-dropdown').addClass('select2-in-modal');
            } else {
                $('.select2-dropdown').removeClass('select2-in-modal');
            }
        });


        if($('.digi-dataTable').length) {
            $('.digi-dataTable').on('draw.dt', function() {
                $(this).find('select.form-control').select2({
                    minimumResultsForSearch: -1,
                    containerCssClass: ':all:',
                    placeholder: function(){
                        $(this).data('placeholder');
                    }
                });
                $(this).find('select.form-control').on('select2:open', function(){
                    if($('body').hasClass('modal-open')) {
                        $('.select2-dropdown').addClass('select2-in-modal');
                    } else {
                        $('.select2-dropdown').removeClass('select2-in-modal');
                    }
                });
                $(this).find('.select-search').select2({
                    containerCssClass: ':all:',
                    placeholder: function(){
                        $(this).data('placeholder');
                    }
                });
                $(this).find('.select-search').on('select2:open', function(){
                    $('.select2-results__options').addClass('scrollable');
                    if($('body').hasClass('modal-open')) {
                        $('.select2-dropdown').addClass('select2-in-modal');
                    } else {
                        $('.select2-dropdown').removeClass('select2-in-modal');
                    }
                });
            });
        }


        $('.select2-search__field').css('width', '100%');
    });
})(jQuery);