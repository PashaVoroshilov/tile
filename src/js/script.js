"use strict";
jQuery(document).ready(function (s) {
    function t() {
        a.classList.toggle("active"), i.classList.toggle("active"), n.classList.toggle("active"), document.body.classList.toggle("overflow")
    }

    var e, a, i, n;
    e = ".header-nav", a = document.querySelector(e), i = document.querySelector(".burger-btn"), n = document.querySelector(".header"), e = document.querySelectorAll(".header-nav__link.ancor-link"), i.addEventListener("click", function (e) {
        t()
    }), window.matchMedia("(max-width: 768px)").matches && e.forEach(function (e) {
        e.addEventListener("click", function () {
            t()
        })
    }), window.matchMedia("(min-width: 960px)").matches && document.querySelectorAll(".steps__item").forEach(function (e) {
        var t, a = e.querySelector(".another-steps-content");
        null !== a && (t = a.cloneNode(!0), (a = document.createElement("div")).setAttribute("class", "steps__wrapper-another"), a.appendChild(t), e.appendChild(a))
    }), document.querySelectorAll(".tabs-nav__btn").forEach(function (t) {
        var e = t.dataset.target, a = document.getElementById(e), e = t.closest(".tabs-nav"),
            i = e.nextElementSibling.querySelectorAll(".tabs-container__item"),
            n = e.querySelectorAll(".tabs-nav__btn");
        t.addEventListener("click", function (e) {
            n.forEach(function (e) {
                e.classList.remove("active")
            }), t.classList.add("active"), i.forEach(function (e) {
                e.style.display = "none"
            }), a.classList.add("active"), a.style.display = "block"
        })
    });
    3<new Swiper(".reviews__list .swiper",{slidesPerView:1,navigation:{nextEl:".reviews__btn.next",prevEl:".reviews__btn.prev"},pagination:{el:".reviews__pagination.swiper-pagination",type:"bullets"},autoHeight:!0,breakpoints:{961:{slidesPerView:3,spaceBetween:30},768:{slidesPerView:2,spaceBetween:20}}}).slides.length&&s(".reviews__list").addClass("box-shadow")
    var r, c, o = s(".section");
    switch (s(document).on("scroll", function () {
        var a = s(window).scrollTop(), i = s(".header").outerHeight(),
            n = window.matchMedia("(min-width: 768px)").matches ? s(".footer").outerHeight(!0) : s(".footer").outerHeight(!0) - s(".footer").outerHeight() + 100;
        o.each(function () {
            var e = s(this).hasClass("footer") ? s(this).offset().top - n : s(this).offset().top - i,
                t = s(this).attr("id"), t = s(".home-wrapper .header-line .header-nav__link[data-nav=".concat(t, "]"));
            e - a < 0 ? t.addClass("active") : t.removeClass("active")
        })
    }), window.matchMedia("(max-width: 768px)").matches && (c = [], document.querySelectorAll(".services__item").forEach(function (e) {
        e = e.getAttribute("data-mobileNav");
        c.push(e)
    }), r = new Swiper(".services__content.swiper", {
        slidesPerView: 1,
        autoHeight: !0,
        spaceBetween: 50,
        pagination: {
            el: ".services__thumbs-pagination", renderBullet: function (e, t) {
                return '<div class="' + t + '">' + c[e] + "</div>"
            }
        },
        navigation: {nextEl: ".services__thumbs-btn.next", prevEl: ".services__thumbs-btn.prev"}
    })), s(".steps__button, .footer__item a").on("click", function (e) {
        var t = s(this).data("step");
        if (window.matchMedia("(min-width: 768px)").matches) switch (t) {
            case"step-calc":
                s(".button--calculate").trigger("click");
                break;
            case"step-deliveryMiscalculation":
                s(".button--deliveryMiscalculation").trigger("click");
                break;
            case"step-deliveryOrder":
                s(".button--deliveryOrder").trigger("click");
                break;
            case"step-tracking":
                s(".button--tracking").trigger("click");
                break;
            case"step-attorneyRegistration":
                s(".button--attorneyRegistration").trigger("click")
        } else switch (t) {
            case"step-calc":
                r.slideTo(0);
                break;
            case"step-deliveryMiscalculation":
                r.slideTo(1);
                break;
            case"step-deliveryOrder":
                r.slideTo(2);
                break;
            case"step-tracking":
                r.slideTo(3);
                break;
            case"step-attorneyRegistration":
                r.slideTo(4)
        }
    }), s(".steps__payment-btn").on("click", function () {
        s(".button--deliveryMiscalculation").trigger("click")
    }), s("a.ancor-link[href*='#']").on("click", function (e) {
        var t = s(".header").height(), a = s(this).attr("href"), t = s(a).offset().top - t + "px";
        s("body,html").animate({scrollTop: t}, 500)
    }), s("select").niceSelect(), (new Date).getMonth()) {
        case 11:
        case 0:
        case 1:
            s(".wrapper").addClass("winter-bg"), s(".not-found__img").attr("src", "./img/content/404/winter-404.png");
            break;
        case 2:
        case 3:
        case 4:
            s(".wrapper").addClass("spring-bg"), s(".not-found__img").attr("src", "./img/content/404/spring-404.png");
            break;
        case 5:
        case 6:
        case 7:
            s(".wrapper").addClass("summer-bg"), s(".not-found__img").attr("src", "./img/content/404/summer-404.png");
            break;
        case 8:
        case 9:
        case 10:
            s(".wrapper").addClass("autumn-bg"), s(".not-found__img").attr("src", "./img/content/404/autumn-404.png")
    }





    if(window.matchMedia("(max-width: 768px)").matches) {
        var params_get = window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function (p, e) {
                    var a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );
        if (params_get['v'] && params_get['v'] == 2) {
            r.slideTo(1);
        }
        if (params_get['v'] && params_get['v'] == 3) {
            r.slideTo(2);
        }
        if (params_get['v'] && params_get['v'] == 4) {
            r.slideTo(3);
        }
        if (params_get['v'] && params_get['v'] == 5) {
            r.slideTo(4);
        }
    }


});