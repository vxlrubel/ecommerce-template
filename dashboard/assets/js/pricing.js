(function ($) {
    'use strict';
    //================== Pricing Plan Popup =============================
    $("#Yearly").on('click', function() {
        $("#Yearly").attr("disabled", true);
        $("#Monthly").attr("disabled", false);
        $(".table-top .price .amount").each(function() {
            var month_price = parseInt($(this).text())
            var year_price = month_price * 12

            $(this).text(year_price);
        });
        $(".table-top .price .type").each(function() {
            $(this).text("Yearly");
        });
    });
    $("#Monthly").on('click', function() {
        $("#Monthly").attr("disabled", true);
        $("#Yearly").attr("disabled", false);
        $(".table-top .price .amount").each(function() {
            var year_price = parseInt($(this).text())
            var month_price = year_price / 12

            $(this).text(month_price);
        });
        $(".table-top .price .type").each(function() {
            $(this).text("Monthly");
        });
    });
    $("#getDiscount").on('click', function() {
        if ($(this).is(":checked")) {
            $(".table-top .price .amount").each(function() {
                var original_price = parseInt($(this).text());
                var discount_amount = original_price / 10;
                var discounted_price = discount_amount * 9;
                $(this).text(discounted_price);
            });
        } else {
            $(".table-top .price .amount").each(function() {
                var discounted__price = parseInt($(this).text());
                var discount__amount = discounted__price / 9;
                var original__price = discount__amount * 10;
                $(this).text(original__price);
            });
        }
    });
})(jQuery);