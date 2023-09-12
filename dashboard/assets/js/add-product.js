(function($) {
    'use strict';
    $(document).ready(function() {
        $('#productTitle').on('keyup', function(){
            var title = $('#productTitle').val().toLowerCase().split(' ').join('-');
            var siteLink = $(this).siblings('p').find('.site-link').attr('data-link');
            $(this).siblings('p').prop('hidden', false).find('.site-link').text(siteLink + title);
            $('#editPermalink').val(title).attr('data-link', title);
            if($(this).val() == 0){
                $(this).siblings('p').prop('hidden', true);
            }
        });
        $('#editPermaBtn').on('click', function(){
            var siteLink = $('#productTitle').siblings('p').find('.site-link').attr('data-link');
            $('#editPermalink').prop('hidden', false);
            $('#productTitle').unbind('keyup').siblings('p').find('.site-link').text(siteLink);
            $('#createPerma, #cancelPerma').prop('hidden', false);
            $(this).prop('hidden', true);
        });
        $('#createPerma').on('click', function(){
            var editedTitle = $('#editPermalink').val().toLowerCase().split(' ').join('-');
            var siteLink = $('#productTitle').siblings('p').find('.site-link').attr('data-link');
            var link = $('#editPermalink').val();
            $('#editPermalink').prop('hidden', true).attr('data-link', link);
            $('#productTitle').siblings('p').find('.site-link').text(siteLink + editedTitle);
            $('#createPerma, #cancelPerma').prop('hidden', true);
            $('#editPermaBtn').prop('hidden', false);
        });
        $('#cancelPerma').on('click', function(){
            var title = $('#productTitle').val();
            var siteLink = $('#productTitle').siblings('p').find('.site-link').attr('data-link');
            var link = $('#editPermalink').attr('data-link');
            $('#editPermalink').prop('hidden', true);
            $('#productTitle').siblings('p').find('.site-link').text(siteLink + link);
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
        $('#galleryUpload').uploader({
            ajaxConfig: ajaxConfig,
            multiple: true,
        });
        $('.jquery-uploader .upload-button').html('<i class="fa-light fa-image"></i><br/><span>Recommended: 800 * 800</a>');

        $('#addAttr').on('click', function(){
            $(this).parent().after(`
                <div class="form-group rounded border p-3 d-block mt-20">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control form-control-sm mb-10" placeholder="Name">
                            <div class="form-check">
                                <label class="form-check-label p-0">
                                    <input class="form-check-input me-2" type="checkbox" value="">
                                    Visible on the product page
                                </label>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row g-0 g-lg-3 g-sm-1">
                                <div class="col-11 col-xs-10">
                                    <textarea class="form-control" placeholder="Enter some text, or some attributes by '|' separating values."></textarea>
                                </div>
                                <div class="col-1 col-xs-2 d-flex justify-content-end">
                                    <button class="btn btn-sm btn-icon btn-danger remove-option w-100"><i class="fa-light fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        $(document).on('click', '.remove-option', function(){
            $(this).parents('.form-group').remove();
        });

        $('#PriceDateEnd').bootstrapMaterialDatePicker({
            format: 'DD MMMM YYYY - hh:mm A',
            shortTime: true,
            clearButton: true
        });
        $('#PriceDateStart').bootstrapMaterialDatePicker({
            format: 'DD MMMM YYYY - hh:mm A',
            shortTime: true,
            clearButton: true
        }).on('change', function(e, date) {
            $('#PriceDateEnd').bootstrapMaterialDatePicker('setMinDate', date);
        });

        $('#publishDate').bootstrapMaterialDatePicker({
            format: 'MMM DD, YYYY [at] hh:mm A',
            shortTime: true,
            clearButton: true,
            currentDate: new Date(),
        });
    

        $('.sub-cat-group').hide();
        $('.cat-group .has-sub').on('click', function(){
            if($(this).is(':checked')) {
                $(this).parent().parent().children('.sub-cat-group').slideDown();
                $(this).siblings().find('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
            } else {
                $(this).parent().parent().children('.sub-cat-group').slideUp();
                $(this).siblings().find('.fa-minus').removeClass('fa-minus').addClass('fa-plus');
            }
        })
    

        $('.add-new-category-panel').hide();
        $('.add-category-btn').on('click', function(){
            $(this).find('i').toggleClass('fa-plus fa-minus');
            $(this).parents('.panel-body').find('.add-new-category-panel').slideToggle();
        });
    

        
        $('.used-tags').hide();
        $('.choose-used-tag').on('click', function(){
            $(this).siblings('.all-tags').slideToggle();
        })
        $('.used-tags .item').each(function(){
            $(this).on('click', function(){
                $(this).clone().appendTo('#allTags');
                $(this).removeClass('d-inline-block').addClass('d-none');
                $('#allTags').addClass('active');
                if(!$('.used-tags .item.d-inline-block').length) {
                    $('.used-tags').removeClass('active');
                }
            });
        });

        $('#productTags').selectize({
            delimiter: ',',
            persist: false,
            createOnBlur: true,
            create: function(input) {
                return {
                    value: input,
                    text: input
                }
            }
        }).on('change', function(){
            $('.selectize-control .item[data-value]').append('<span class="close-tag"><i class="fa-regular fa-xmark"></i></span>');
            $('.selectize-control .item[data-value]').prependTo('#allTags');
            $('#allTags').addClass('active');
        });
        $('.selectize-input>input').addClass('form-control form-control-sm');
        $(document).on('click', '.close-tag', function(){
            $(this).parent('.item').remove();
            if(!$('#allTags .item').length) {
                $('#allTags').removeClass('active');
            }
        });
    });
})(jQuery);