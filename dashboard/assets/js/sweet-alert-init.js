document.getElementById("saBasic") && document.getElementById("saBasic").addEventListener("click", function() {
    Swal.fire({
        title: "Any fool can use a computer",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saTitle") && document.getElementById("saTitle").addEventListener("click", function() {
    Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saSuccess") && document.getElementById("saSuccess").addEventListener("click", function() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        showCancelButton: !0,
        confirmButtonClass: "btn btn-sm btn-primary",
        cancelButtonClass: "btn btn-sm btn-danger",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saError") && document.getElementById("saError").addEventListener("click", function() {
    Swal.fire({
        title: "Oops...",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        footer: '<a href="#">Why do I have this issue?</a>',
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saLongcontent") && document.getElementById("saLongcontent").addEventListener("click", function() {
    Swal.fire({
        imageUrl: "https://placeholder.pics/svg/300x1500",
        imageHeight: 1500,
        imageAlt: "A tall image",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saWarning") && document.getElementById("saWarning").addEventListener("click", function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonClass: "btn btn-sm btn-primary",
        cancelButtonClass: "btn btn-sm btn-danger",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    }).then(function(t) {
        t.value && Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: !1
        })
    })
}), document.getElementById("saParams") && document.getElementById("saParams").addEventListener("click", function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonClass: "btn btn-sm btn-primary",
        cancelButtonClass: "btn btn-sm btn-danger",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    }).then(function(t) {
        t.value ? Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: !1
        }) : t.dismiss === Swal.DismissReason.cancel && Swal.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: !1
        })
    })
}), document.getElementById("saImage") && document.getElementById("saImage").addEventListener("click", function() {
    Swal.fire({
        title: "Sweet!",
        text: "Modal with a custom image.",
        imageUrl: "assets/images/logo-small.png",
        imageHeight: 40,
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        animation: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saClose") && document.getElementById("saClose").addEventListener("click", function() {
    var t;
    Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
}), document.getElementById("customHtmlAlert") && document.getElementById("customHtmlAlert").addEventListener("click", function() {
    Swal.fire({
        title: "<i>HTML</i> <u>example</u>",
        icon: "info",
        html: 'You can use <b>bold text</b>, <a href="#">links</a> and other HTML tags',
        showCloseButton: !0,
        showCancelButton: !0,
        confirmButtonClass: "btn btn-sm btn-success",
        cancelButtonClass: "btn btn-sm btn-danger",
        buttonsStyling: !1,
        confirmButtonText: '<i class="fa-light fa-thumbs-up"></i> Great!',
        cancelButtonText: '<i class="fa-light fa-thumbs-down"></i>',
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("saDialogThreeBtn") && document.getElementById("saDialogThreeBtn").addEventListener("click", function() {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: !0,
        showCancelButton: !0,
        confirmButtonText: "Save",
        confirmButtonClass: "btn btn-sm btn-success",
        cancelButtonClass: "btn btn-sm btn-danger",
        denyButtonClass: "btn btn-sm btn-info",
        buttonsStyling: !1,
        denyButtonText: "Don't save",
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    }).then(function(t) {
        t.isConfirmed ? Swal.fire({
            title: "Saved!",
            icon: "success",
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: !1
        }) : t.isDenied && Swal.fire({
            title: "Changes are not saved",
            icon: "info",
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: !1
        })
    })
}), document.getElementById("saPosition") && document.getElementById("saPosition").addEventListener("click", function() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: !1,
        timer: 1500,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
}), document.getElementById("customPaddingWidthAlert") && document.getElementById("customPaddingWidthAlert").addEventListener("click", function() {
    Swal.fire({
        title: "Custom width, padding, background.",
        width: 600,
        padding: 100,
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        background: "#112143 url(assets/images/chat-bg.png)",
    })
    if(document.querySelector('body').classList.contains('light-theme')) {
        Swal.fire({
            title: "Custom width, padding, background.",
            width: 600,
            padding: 100,
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: false,
            background: "#ffffff url(assets/images/chat-bg-black.png)"
        });
    }
    if(document.querySelector('body').classList.contains('dark-theme')) {
        Swal.fire({
            title: "Custom width, padding, background.",
            width: 600,
            padding: 100,
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: false,
            background: "#242526 url(assets/images/chat-bg.png)"
        });
    }
    
}), document.getElementById("ajaxAlert") && document.getElementById("ajaxAlert").addEventListener("click", function() {
    Swal.fire({
        title: "Submit email to run ajax request",
        input: "email",
        showCancelButton: !0,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: !0,
        confirmButtonClass: "btn btn-sm btn-primary",
        cancelButtonClass: "btn btn-sm btn-danger",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
            input: 'form-control form-control-sm',
        },
        preConfirm: function(n) {
            return new Promise(function(t, e) {
                setTimeout(function() {
                    "taken@example.com" === n ? e("This email is already taken.") : t()
                }, 2e3)
            })
        },
        allowOutsideClick: !1
    }).then(function(t) {
        Swal.fire({
            icon: "success",
            title: "Ajax request finished!",
            confirmButtonClass: "btn btn-sm btn-primary",
            buttonsStyling: !1,
            html: "Submitted email: " + t
        })
    })
});