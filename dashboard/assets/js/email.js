(function($) {
    'use strict';

    $(document).ready(function() {
        $('#nestLabelCheck').on('change', function(){
            $(this).parent('.form-check').siblings('.select-box').toggleClass('d-none');
        });


        $('#createLabel').on('click', function(){
            var newLabelName = $('#newLabelName').val();
            if($('#newLabelName').is(':valid')) {
                $('#newLabelName').val('');
                $('.new-label-list').append('<button class="btn-flush d-block w-100 text-start"><span class="part-icon"><i class="fa-light fa-badge"></i></span> <span class="part-txt">' + newLabelName + '</span></button>');
            }
        });


        $('.email-table td:nth-child(3), td:nth-child(4)').on('click', function(){
            $(this).parents('.table-wrapper').addClass('mail-opened').find('.mail-details').removeClass('d-none');
        });


        $('.compose-mail-btn').on('click', function(){
            $('.compose-mail').addClass('open');
        });


        $('.add-cc').on('click', function(){
            $('.input-cc').toggleClass('d-none');
        });
        $('.add-bcc').on('click', function(){
            $('.input-bcc').toggleClass('d-none');
        });


        $('#minimizeComposeMail').on('click', function(){
            $(this).hide();
            $('.compose-mail').addClass('minimized');
            $('.compose-mail').removeClass('expanded');
            $('#expandComposeMail').html('<i class="fa-light fa-arrow-up-right-and-arrow-down-left-from-center"></i>');
        });
        $('#expandComposeMail').on('click', function(){
            if($('.compose-mail').hasClass('expanded')) {
                $(this).html('<i class="fa-light fa-arrow-up-right-and-arrow-down-left-from-center"></i>');
            } else {
                $(this).html('<i class="fa-light fa-arrow-down-left-and-arrow-up-right-to-center"></i>');
            }
            $('.compose-mail').toggleClass('expanded');
            $('.compose-mail').removeClass('minimized');
            $('#minimizeComposeMail').show();
        });
        $('#discardMail, #closeComposeMail').on('click', function(){
            $('.compose-mail').removeClass('open minimized expanded');
            $('#minimizeComposeMail').show();
            $('#expandComposeMail').html('<i class="fa-light fa-arrow-up-right-and-arrow-down-left-from-center"></i>');
        });
        $('.compose-mail .panel-header h5').on('click', function(){
            $('.compose-mail').removeClass('minimized');
            $('#minimizeComposeMail').show();
        });

        $('.mail-top').on('click', function(){
            $(this).siblings('.mail-body').slideToggle('fast');
        });

        $('.reply-mail-btn').on('click', function(){
            $(this).parents('.mail-reply-option').siblings('.mail-conversation').addClass('reply-panel-opened');
            $(this).parents('.mail-reply-option').find('.mail-reply').removeClass('d-none');
            $(this).parent('.btn-box').hide();
        });

        var tableWrapper = $('.expandReply').each(function(){
            $(this).parents('.table-wrapper');
        });
        $('.close-mail').on('click', function(){
            $(this).parents('.table-wrapper').removeClass('mail-opened');
            $(this).parents('.mail-details').addClass('d-none').appendTo('#' + $(this).parents('.mail-details').attr('data-mail-tab') + ' .table-wrapper');
            $('.mail-details-expanded').removeClass('active');
            if($('#' + $(this).parents('.mail-details').attr('data-mail-tab') + ' .table-wrapper').hasClass('mail-opened')) {
                $(this).parents('.mail-details').removeClass('d-none')
            }
        });

        
        $('.expandReply').each(function(){
            $(this).on('click', function(){
                if($('.mail-details-expanded').hasClass('active')) {
                    $(this).html('<i class="fa-light fa-expand"></i>');
                    $(this).parents('.mail-details').appendTo('#' + $(this).parents('.mail-details').attr('data-mail-tab') + ' .table-wrapper');
                    $('.mail-details-expanded').removeClass('active');
                    $(tableWrapper).addClass('mail-opened');
                } else {
                    $(this).html('<i class="fa-light fa-compress"></i>');
                    $(this).parents('.mail-details').appendTo('.mail-details-expanded');
                    $('.mail-details-expanded').addClass('active');
                    $(tableWrapper).removeClass('mail-opened');
                }
            });
        });



        var tableId = $('#nav-inbox').find('.tab-pane.active').find('.dataTables_wrapper').attr('id');
        if($('#nav-inbox').find('.dataTables_filter').filter('id', tableId.replace('wrapper','') + 'filter')) {
            $('#nav-inbox').find('.dataTables_filter[id='+ tableId.replace('wrapper','') +'filter]').show().siblings().hide();
            $('#nav-inbox').find('.dataTables_length[id='+ tableId.replace('wrapper','') +'length]').show().siblings().hide();
            $('#nav-inbox').find('.dataTables_info[id='+ tableId.replace('wrapper','') +'info]').show().siblings('.dataTables_info').hide();
            $('#nav-inbox').find('.dataTables_paginate[id='+ tableId.replace('wrapper','') +'paginate]').show().siblings('.dataTables_paginate').hide();
        }
        $('.inbox-tab button[data-bs-toggle="tab"]').on('shown.bs.tab', function(){
            var tableId = $('#nav-inbox').find('.tab-pane.active').find('.dataTables_wrapper').attr('id');
            if($('#nav-inbox').find('.dataTables_filter').filter('id', tableId.replace('wrapper','') + 'filter')) {
                $('#nav-inbox').find('.dataTables_filter[id='+ tableId.replace('wrapper','') +'filter]').show().siblings().hide();
                $('#nav-inbox').find('.dataTables_length[id='+ tableId.replace('wrapper','') +'length]').show().siblings().hide();
                $('#nav-inbox').find('.dataTables_info[id='+ tableId.replace('wrapper','') +'info]').show().siblings('.dataTables_info').hide();
                $('#nav-inbox').find('.dataTables_paginate[id='+ tableId.replace('wrapper','') +'paginate]').show().siblings('.dataTables_paginate').hide();
            }
        });
    });
})(jQuery);