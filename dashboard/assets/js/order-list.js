(function($) {
    'use strict';
    $(document).ready(function() {
        $('#orderTableFilter').daterangepicker({
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
        });


        $("#downloadPdf").on("click", function () {
            html2canvas($('#allProductTable')[0], {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("order-list.pdf");
                }
            });
        });


        $('#downloadExcel').on('click', function(){
            $("#allProductTable").table2excel({
                exclude: ".excludeThisClass",
                name: "Worksheet Name",
                filename: "order-list.xls",
                preserveColors: true
            });
        });
    });
})(jQuery);