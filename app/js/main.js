
// NAV BUTTON
$(".header__button").on("click", function () {
    $(".sidebar").addClass("sidebar--open");
    $(".header__button").addClass("header__button--hidden");
});
$(".sidebar__close").on("click", function () {
    $(".sidebar").removeClass("sidebar--open");
    $(".header__button").removeClass("header__button--hidden");
});
$(document).on("click",function (event) {
    const $target = $(event.target);
    if (!$target.closest(".sidebar").length 
    && !$target.closest(".header__button").length) {
        $(".sidebar").removeClass("sidebar--open");
        $(".header__button").removeClass("header__button--hidden");
    }
});
// SCROLL

$(".sidebar__list a").on("click", function () {
    let href = $(this).attr("href");

    $("html, body").animate(
        {
            scrollTop: $(href).offset().top,
        },
        {
            duration: 370, // по умолчанию «400»
            easing: "linear", // по умолчанию «swing»
        }
    );

    return false;
});

$(".footer__scroll-button").each(function () {
    $(this).click(function () {
        $("html,body").animate(
            { scrollTop: 0 },
            {
                duration: 370, // по умолчанию «400»
                easing: "linear", // по умолчанию «swing»
            }
        );
        return false;
    });
});

// SLIDER

$(function() {
    $(".intro__slider").slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: `<button type="button" class="slick-prev slick-arrow">
                <img class="arrow" src="images/prev-arrow.svg" alt="prev">
            </button>`,
        nextArrow: `<button type="button" class="slick-next slick-arrow">
                <img class="arrow" src="images/next-arrow.svg" alt="next">
            </button>`,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                },
            },
        ],
    });
    $(".testimonial__slider").slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });
})


// MASONRY

$(".latest-news__content").masonry({
    itemSelector: ".latest-news__item",
    columnWidth: 270,
    gutter: 30,
    horizontalOrder: true,
});


