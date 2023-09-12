(function($) {
    'use strict';
    $(document).ready(function() {
        $('#categoryTitle').on('keyup', function(){
            var title = $('#categoryTitle').val().toLowerCase().split(' ').join('-');
            var siteLink = $(this).siblings('p').find('.site-link').attr('data-link');
            $(this).siblings('p').prop('hidden', false).find('.site-link').text(siteLink + title);
            $('#editPermalink').val(title).attr('data-link', title);
        });
        $('#editPermaBtn').on('click', function(){
            var siteLink = $('#categoryTitle').siblings('p').find('.site-link').attr('data-link');
            $('#editPermalink').prop('hidden', false);
            $('#categoryTitle').unbind('keyup').siblings('p').find('.site-link').text(siteLink);
            $('#createPerma, #cancelPerma').prop('hidden', false);
            $(this).prop('hidden', true);
        });
        $('#createPerma').on('click', function(){
            var editedTitle = $('#editPermalink').val().toLowerCase().split(' ').join('-');
            var siteLink = $('#categoryTitle').siblings('p').find('.site-link').attr('data-link');
            var link = $('#editPermalink').val();
            $('#editPermalink').prop('hidden', true).attr('data-link', link);
            $('#categoryTitle').siblings('p').find('.site-link').text(siteLink + editedTitle);
            $('#createPerma, #cancelPerma').prop('hidden', true);
            $('#editPermaBtn').prop('hidden', false);
        });
        $('#cancelPerma').on('click', function(){
            var title = $('#categoryTitle').val();
            var siteLink = $('#categoryTitle').siblings('p').find('.site-link').attr('data-link');
            var link = $('#editPermalink').attr('data-link');
            $('#editPermalink').prop('hidden', true);
            $('#categoryTitle').siblings('p').find('.site-link').text(siteLink + link);
            $('#createPerma, #cancelPerma').prop('hidden', true);
            $('#editPermaBtn').prop('hidden', false);
        });
    
    
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
        $('#thumbUpload').uploader({
            ajaxConfig: ajaxConfig,
        });
        $('.jquery-uploader .upload-button').html('<i class="fa-light fa-image"></i><br/><span>Recommended: 300 * 300</a>');
    
    
        $('#addCatThumb').on('click', function(){
            $(this).siblings('.jquery-uploader').slideToggle();
        });
    });
})(jQuery);