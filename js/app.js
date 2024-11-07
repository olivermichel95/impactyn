var sideMenu = $("aside");
var mobileMenuBtn = $("#mobile_menu_btn");
$(document).ready(function() {
    //lazy loading
    if ($("img.lazy").length > 0) {
        $("img.lazy").lazy({
            effect: "fadeIn",
        });
    }

    $("i.convert-svg").each(function() {
        var $img = $(this);
        convertSvgToIcon($img);
    });

    // alerts
    $(document.body).on("click", "[data-dismiss-alert]", function() {
        let alert = $(this).closest(".alert");
        alert.addClass("hide");
        setTimeout(function() {
            alert.remove();
        }, 1000)
    });

    $("header #profile_btn").on("click", function(e) {
        $(this).closest(".profile-info-container").toggleClass("active");
        $(this).closest(".profile-info-container").find(".profile-menu").toggleClass("show");
        $("header .messages-btn").removeClass("active");
        $(".messages-notifications-box").removeClass("show");
        sideMenu.removeClass("mobile-show opened");
        $("body").removeClass("modal-open");
    });

    $("header .messages-btn").each(function() {
        $(this).on("click", function(e) {
            e.stopPropagation();
            $(this).toggleClass("active");
            $(this).parent().find(".messages-notifications-box").toggleClass("show");
            $("header .messages-btn").not($(this)).removeClass("active");
            $(".messages-notifications-box").not($(this).parent().find(".messages-notifications-box")).removeClass("show");
            $("header .profile-info-container").removeClass("active");
            $("header .profile-menu").removeClass("show");
            sideMenu.removeClass("mobile-show opened");
            $("body").removeClass("modal-open");
        });
    });

    $(document).on("click", function(e) {
        if (
            $(e.target).is("#messages_box, #messages_box *") ||
            $(e.target).is("#notifications_box, #notifications_box *") ||
            $(e.target).is("#profile_box, #profile_box *")
        ) {
            return;
        }
        $("header .messages-btn").removeClass("active");
        $("header .messages-notifications-box").removeClass("show");
        $("header .profile-info-container").removeClass("active");
        $("header .profile-menu").removeClass("show");
    });

    //side menu
    sideMenu.find(".toggle-side-menu-btn button").on("click", function() {
        sideMenu.toggleClass("opened");
    });
    sideMenu.find(".side-bar-link.dropdown").on("click", function() {
        if (!sideMenu.hasClass("opened")) {
            sideMenu.addClass("opened");
            $(this).find("#accordion button").removeClass("collapsed");
            $(this).find("#accordion .dropdown-links").addClass("show");
        }
    });
    mobileMenuBtn.on("click", function() {
        sideMenu.addClass("opened");
        sideMenu.toggleClass("mobile-show");
        $("body").toggleClass("modal-open");
    });
    if ($(window).width() > 991.98) {
        sideMenu.on({
            mouseenter: function() {
                sideMenu.addClass("opened");
            },
            mouseleave: function() {
                sideMenu.removeClass("opened");
            }
        });
    }
    // if ($(window).width() < 991.98) {
    //     $(document).on("click", function(e) {
    //         if (
    //             $(e.target).is("#mobile_menu_btn, #mobile_menu_btn *") ||
    //             $(e.target).is("aside, aside *")
    //         ) {
    //             return;
    //         }
    //         sideMenu.removeClass("mobile-show opened");
    //         $("body").removeClass("modal-open");
    //     });
    // }
});


function convertSvgToIcon($img) {
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("data-src");
    if (typeof imgURL === "undefined") {
        return false;
    }

    $svg = getSvgIconByUrl(imgURL);
    if ($svg == null) {
        return false;
    }

    // Add replaced image's ID to the new SVG
    if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
    }
    $img.replaceWith($svg);
}

function getSvgIconByUrl(imgURL) {
    var $svg = null;

    $.ajax({
        url: imgURL,
        type: "get",
        dataType: "xml",
        async: false,
        success: function(data) {
            $svg = $(data).find("svg");

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr("xmlns:a");

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
                $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"));
            }
        },
    });

    return $svg;
}

function displayAlertMessage(messageType, messageText) {
    if ($(`.alert.alert-style-1.alert-${messageType}`).length == 0) {
        let alertContainer = $("<div>", { class: `alert alert-style-1 alert-${messageType}` });
        let message = ($("<p>", { class: "mb-0", text: messageText }));
        let alertBtn = $('<button>', { class: "btn btn-style-1", text: "Dismiss" }).attr({
            type: "button",
            "data-dismiss-alert": "alert",
        });
        message.appendTo(alertContainer);
        alertBtn.appendTo(alertContainer);
        alertContainer.appendTo("body");
    }
}