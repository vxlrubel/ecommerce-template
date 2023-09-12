(function($) {
    'use strict';
    $(document).ready(function() {
        //------------------------------------------------------------------------------------------------------------------
        // Sales Analytics Chart
        //------------------------------------------------------------------------------------------------------------------
        if($('#saleAnalytics').length) {
            var saleAnalyticsoptions = {
                series: [{
                    name: 'Stock',
                    color: '#0D99FF',
                    data: [31, 40, 28, 51, 42, 109, 100]
                }, {
                    name: 'Order',
                    color: '#a9b4cc',
                    data: [11, 32, 45, 32, 34, 52, 41]
                }],
                chart: {
                    height: 354,
                    type: 'area',
                    toolbar: {
                        show: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    curve: 'smooth'
                },
                xaxis: {
                    fill: '#FFFFFF',
                    type: 'datetime',
                    categories: ["2022-12-19T00:00:00.000Z", "2022-12-20T00:00:00.000Z", "2022-12-21T00:00:00.000Z", "2022-12-22T00:00:00.000Z", "2022-12-23T00:00:00.000Z", "2022-12-24T00:00:00.000Z", "2022-12-25T00:00:00.000Z"],
                    labels: {
                        format: 'dddd',
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                grid: {
                    borderColor: '#334652',
                    strokeDashArray: 3,
                    xaxis: {
                        lines: {
                            show: true,
                        }
                    },
                    padding: {
                        bottom: 15
                    }
                },
                responsive: [{
                    breakpoint: 479,
                    options: {
                        chart: {
                            height: 250,
                        },
                    },
                }]
            };
            var saleAnalytics = new ApexCharts(document.querySelector("#saleAnalytics"), saleAnalyticsoptions);
            saleAnalytics.render();
        }
        if($('#balanceOverview').length) {
            var balanceOverviewoptions = {
                series: [{
                    name: 'Stock',
                    color: '#0D99FF',
                    data: [31, 40, 28, 51, 42, 109, 100, 40, 28, 51, 42, 109]
                }, {
                    name: 'Order',
                    color: '#a9b4cc',
                    data: [11, 32, 45, 32, 34, 52, 41, 32, 45, 32, 34, 52]
                }],
                chart: {
                    height: 396,
                    type: 'bar',
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 0,
                    curve: 'smooth'
                },
                xaxis: {
                    fill: '#FFFFFF',
                    type: 'datetime',
                    categories: ["2022-12-19T00:00:00.000Z", "2022-12-20T00:00:00.000Z", "2022-12-21T00:00:00.000Z", "2022-12-22T00:00:00.000Z", "2022-12-23T00:00:00.000Z", "2022-12-24T00:00:00.000Z", "2022-12-25T00:00:00.000Z", "2022-12-26T00:00:00.000Z", "2022-12-27T00:00:00.000Z", "2022-12-28T00:00:00.000Z", "2022-12-29T00:00:00.000Z", "2022-12-30T00:00:00.000Z"],
                    labels: {
                        datetimeFormatter: {
                            month: 'MMMM',
                        }
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                grid: {
                    borderColor: '#334652',
                    strokeDashArray: 3,
                    xaxis: {
                        lines: {
                            show: true,
                        }
                    },
                    padding: {
                        bottom: 15
                    }
                },
                responsive: [{
                    breakpoint: 1199,
                    options: {
                        chart: {
                            height: 365,
                        },
                    },
                },{
                    breakpoint: 991,
                    options: {
                        chart: {
                            height: 300,
                        },
                    },
                },{
                    breakpoint: 479,
                    options: {
                        chart: {
                            height: 250,
                        },
                    },
                }]
            };
            var balanceOverview = new ApexCharts(document.querySelector("#balanceOverview"), balanceOverviewoptions);
            balanceOverview.render();
        }
        if($('#audienceOverview').length) {
            var audienceOverviewoptions = {
                series: [{
                    name: 'Stock',
                    color: '#1490e3',
                    data: [31, 40, 28, 51, 42, 109, 100, 40, 28, 51, 42, 109]
                }, {
                    name: 'Order',
                    color: '#37c3ed',
                    data: [51, 19, 55, 56, 54, 42, 54, 198, 64, 71, 21, 52]
                }],
                chart: {
                    height: 410,
                    type: 'area',
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 0,
                    curve: 'straight'
                },
                markers: {
                    size: 2,
                    strokeWidth: 0
                },
                xaxis: {
                    fill: '#FFFFFF',
                    type: 'datetime',
                    categories: ["2022-12-19T00:00:00.000Z", "2022-12-20T00:00:00.000Z", "2022-12-21T00:00:00.000Z", "2022-12-22T00:00:00.000Z", "2022-12-23T00:00:00.000Z", "2022-12-24T00:00:00.000Z", "2022-12-25T00:00:00.000Z", "2022-12-26T00:00:00.000Z", "2022-12-27T00:00:00.000Z", "2022-12-28T00:00:00.000Z", "2022-12-29T00:00:00.000Z", "2022-12-30T00:00:00.000Z"],
                    labels: {
                        datetimeFormatter: {
                            month: 'MMMM',
                        }
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                grid: {
                    borderColor: '#334652',
                    strokeDashArray: 3,
                    xaxis: {
                        lines: {
                            show: true,
                        }
                    },
                    padding: {
                        bottom: 15
                    }
                },
                responsive: [{
                    breakpoint: 1199,
                    options: {
                        chart: {
                            height: 365,
                        },
                    },
                },{
                    breakpoint: 991,
                    options: {
                        chart: {
                            height: 300,
                        },
                    },
                },{
                    breakpoint: 479,
                    options: {
                        chart: {
                            height: 250,
                        },
                    },
                }]
            };
            var audienceOverview = new ApexCharts(document.querySelector("#audienceOverview"), audienceOverviewoptions);
            audienceOverview.render();
        }



        
        //------------------------------------------------------------------------------------------------------------------
        // Dashboard Breadcrumb Date Picker
        //------------------------------------------------------------------------------------------------------------------
        $('#dashboardFilter').daterangepicker({
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens:'left',
        });



        //------------------------------------------------------------------------------------------------------------------
        // Recent Order Data Table
        //------------------------------------------------------------------------------------------------------------------
        if($('#myTable').length) {
            var dataTable = $('#myTable').DataTable({
                dom: 'lfrtip',
                responsive: true,
                select: true,
                scrollX: true,
            });
            $('#myTable_filter input').addClass('form-control').attr("placeholder", "Search...").addClass('form-control-sm');
            $('.dataTables_length').hide();
            $('.dataTables_filter').prependTo('#tableSearch');
            $('.dataTables_info, .paging_simple_numbers').prependTo('.table-bottom-control');
            $('#myTable tr').on('click', function () {
                $(this).toggleClass('selected');
                $(this).siblings().removeClass('selected');
            })
        }
    });
})(jQuery);