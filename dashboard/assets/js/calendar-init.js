(function (l) {
    "use strict";

    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable;

    var containerEl = document.getElementById('external-events');
    var calendarEl = document.getElementById('calendar');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.innerText
            };
        }
    });



    function e() {
        (this.$body = l("body")),
            (this.$modal = new bootstrap.Modal(document.getElementById("event-modal"), { backdrop: "static" })),
            (this.$calendar = l("#calendar")),
            (this.$formEvent = l("#form-event")),
            (this.$btnNewEvent = l("#btn-new-event")),
            (this.$btnDeleteEvent = l("#btn-delete-event")),
            (this.$btnSaveEvent = l("#btn-save-event")),
            (this.$modalTitle = l("#modal-title")),
            (this.$calendarObj = null),
            (this.$selectedEvent = null),
            (this.$newEventData = null);
    }
    (e.prototype.onEventClick = function (e) {
        this.$formEvent[0].reset(),
            this.$formEvent.removeClass("was-validated"),
            (this.$newEventData = null),
            this.$btnDeleteEvent.show(),
            this.$modalTitle.text("Edit Event"),
            this.$modal.show(),
            (this.$selectedEvent = e.event),
            l("#event-title").val(this.$selectedEvent.title),
            l("#event-category").val(this.$selectedEvent.classNames[0]);
    }),
        (e.prototype.onSelect = function (e) {
            this.$formEvent[0].reset(),
                this.$formEvent.removeClass("was-validated"),
                (this.$selectedEvent = null),
                (this.$newEventData = e),
                this.$btnDeleteEvent.hide(),
                this.$modalTitle.text("Add New Event"),
                this.$modal.show(),
                this.$calendarObj.unselect();
        }),
        (e.prototype.init = function () {
            var e = new Date(l.now());
            var t = [
                { title: "Important meeting", start: e, end: e, className: "bg-success" },
                { title: "Factory visit", start: new Date(l.now() + 218e6), allDay: !0, className: "bg-primary" },
                { title: "Meeting with developer", start: new Date(l.now() + 418e6), className: "bg-danger" },
                { title: "Design proposal", start: new Date(l.now() + 718e6), allDay: !0, className: "bg-info" },
                { title: "Web design", start: new Date(l.now() + 818e6), className: "bg-warning" },
                { title: "Cash out", start: new Date(l.now() + 1018e6), allDay: true, className: "bg-secondary" },
                { title: "Factory Visit", start: new Date(l.now() + 1218e6), className: "bg-success" },
                { title: "Factory Visit", start: new Date(l.now() + 418e6), allDay: !0, className: "bg-primary" },
            ],
                a = this;
            (a.$calendarObj = new FullCalendar.Calendar(a.$calendar[0], {
                plugins: ['interaction', 'dayGrid', 'timeGrid'],
                slotDuration: "00:15:00",
                slotMinTime: "08:00:00",
                slotMaxTime: "19:00:00",
                themeSystem: "bootstrap",
                bootstrapFontAwesome: !1,
                buttonText: { today: "Today", month: "Month", week: "Week", day: "Day", prev: "Prev", next: "Next" },//list: "List"//
                initialView: "dayGridMonth",
                handleWindowResize: !0,
                height: l(window).height() - 200,
                header: { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" },//,listMonth
                events: t,
                editable: true,
                droppable: true,
                selectable: !0,
                dateClick: function (e) {
                    a.onSelect(e);
                },
                eventClick: function (e) {
                    a.onEventClick(e);
                },
                drop: function (info) {
                    $('.upcoming-event-list').empty();
                    setTimeout(function() {
                        console.log(document.querySelectorAll('.fc-widget-content .fc-day-grid-event').length);
                        $('.fc-widget-content .fc-day-grid-event').clone().appendTo('.upcoming-event-list');
                        if (checkbox.checked) {
                            info.draggedEl.parentNode.removeChild(info.draggedEl);
                        }
                    }, 100);
                }
            })),
                a.$calendarObj.render(),
                a.$btnNewEvent.on("click", function (e) {
                    a.onSelect({ date: new Date(), allDay: !0 });
                }),
                a.$formEvent.on("submit", function (e) {
                    e.preventDefault();
                    var t,
                        n = a.$formEvent[0];
                    n.checkValidity()
                        ? (a.$selectedEvent
                            ? (a.$selectedEvent.setProp("title", l("#event-title").val()), a.$selectedEvent.setProp("classNames", [l("#event-category").val()]))
                            : ((t = { title: l("#event-title").val(), start: a.$newEventData.date, allDay: a.$newEventData.allDay, className: l("#event-category").val() }), a.$calendarObj.addEvent(t)),
                            a.$modal.hide())
                        : (e.stopPropagation(), n.classList.add("was-validated"));
                    $('.upcoming-event-list').empty();
                    $('.fc-widget-content .fc-day-grid-event').clone().appendTo('.upcoming-event-list');
                }),
                l(
                    a.$btnDeleteEvent.on("click", function (e) {
                        a.$selectedEvent && (a.$selectedEvent.remove(), (a.$selectedEvent = null), a.$modal.hide());
                        $('.upcoming-event-list').empty();
                        $('.fc-widget-content .fc-day-grid-event').clone().appendTo('.upcoming-event-list');
                    })
                );
        }),
        (l.CalendarApp = new e()),
        (l.CalendarApp.Constructor = e);
})(jQuery),
(function () {
    "use strict";
    $(document).ready(function () {
        window.jQuery.CalendarApp.init();
        $('.fc-view-harness').find('table').addClass('table mb-0 table-bordered');
        $('.fc-toolbar-chunk .btn').addClass('btn-sm');
        $('.fc-button-group').addClass('btn-group').find('button').addClass('btn btn-sm btn-primary').removeClass('fc-button fc-button-primary');
        $('.fc-today-button').addClass('btn btn-sm btn-primary').removeClass('fc-button fc-button-primary');
        $('.fc-day-grid-event').clone().appendTo('.upcoming-event-list');
    });
})();