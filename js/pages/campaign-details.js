$(document).ready(function() {
    if ($(".images-section .thumbs-section .swiper-container").length > 0) {
        // thumbs swiper
        var thumbsSwiper = new Swiper('.images-section .thumbs-section .swiper-container', {
            spaceBetween: 10,
            allowTouchMove: true,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            lazy: {
                preloadImages: false,
                loadPrevNext: true,
                loadPrevNextAmount: 2,
            },
            breakpoints: {
                991.98: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },
            },
        });
    }


    if ($(".images-section .slider-section .swiper-container").length > 0) {
        // product details section slider
        var mainSwiper = new Swiper('.images-section .slider-section .swiper-container', {
            loop: false,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            allowTouchMove: true,
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev'
            },
            thumbs: {
                swiper: thumbsSwiper
            },
            lazy: {
                preloadImages: false,
                loadPrevNext: true,
                loadPrevNextAmount: 2,
            },
            breakpoints: {
                991.98: {
                    slidesPerView: 1,
                    spaceBetween: 150,
                },
            },
        });
    }

    $(".radio.radio-style-2 input").each(function() {
        if ($(this).is(":checked")) {
            $(this).closest(".radio.radio-style-2").addClass("checked");
        }
    });
    $(".radio.radio-style-2 input").on("change", function(e) {
        var $this = $(this);
        $this.closest(".radio.radio-style-2").addClass("checked");
        var otherRadios = $(".radio.radio-style-2").not($this.closest(".radio.radio-style-2"))
        if (otherRadios.length > 1) {
            otherRadios.each(function() {
                if ($(this).find("input").attr("name") == $this.attr("name")) {
                    $(this).removeClass("checked");
                }
            });
        } else {
            if (otherRadios.find("input").attr("name") == $this.attr("name")) {
                otherRadios.removeClass("checked");
            }
        }
    });
});