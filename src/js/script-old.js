jQuery(document).ready(function($) {

    (function burgerMenu(selector) {
        let menu = document.querySelector(selector),
            burgerBtn = document.querySelector('.burger-btn'),
            header = document.querySelector('.header'),
            headerLinks = document.querySelectorAll('.header-nav__link.ancor-link');

        burgerBtn.addEventListener('click', function(e) {
            toggleMenu();
        });

        if (window.matchMedia("(max-width: 768px)").matches) {
            headerLinks.forEach((item) => {
                item.addEventListener('click', function() {
                    toggleMenu();
                });
            })
        }

        function toggleMenu () {
            menu.classList.toggle('active');
            burgerBtn.classList.toggle('active');
            header.classList.toggle('active');
            document.body.classList.toggle('overflow');
        }

    }('.header-nav'));

    if (window.matchMedia("(min-width: 960px)").matches) {
        let stepsItem = document.querySelectorAll('.steps__item');

        stepsItem.forEach((item) => {
            let anotherStepsContent = item.querySelector('.another-steps-content');

            if(anotherStepsContent !== null) {

                let cloneAnotherStepsContent = anotherStepsContent.cloneNode(true),
                    stepsWrapperAnother = document.createElement('div');

                stepsWrapperAnother.setAttribute('class', 'steps__wrapper-another');

                stepsWrapperAnother.appendChild(cloneAnotherStepsContent);

                item.appendChild(stepsWrapperAnother);
            }
        })
    }

    let tabsNavBtns = document.querySelectorAll('.tabs-nav__btn');

    tabsNavBtns.forEach((button) => {
        const idTarget = button.dataset.target,
                targetBlock = document.getElementById(idTarget),
                tabsNavContainer = button.closest('.tabs-nav'),
                tabsContainer = tabsNavContainer.nextElementSibling,
                allTabsItems = tabsContainer.querySelectorAll('.tabs-container__item'),
                allButtons = tabsNavContainer.querySelectorAll('.tabs-nav__btn');

        button.addEventListener('click', function(e) {
            allButtons.forEach((singleButton) => {
                singleButton.classList.remove('active');
            })

            button.classList.add('active');

            allTabsItems.forEach((tabItem) => {
                tabItem.style.display = 'none';
            })

            targetBlock.classList.add('active');
            targetBlock.style.display = 'block';
        })
    })

    const reviewsSwiper = new Swiper('.reviews__list .swiper', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.reviews__btn.next',
            prevEl: '.reviews__btn.prev',
        },
        pagination: {
            el: '.reviews__pagination.swiper-pagination',
            type: 'bullets',
        },
        autoHeight: true,
        breakpoints: {
            961: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });

    reviewsSwiper.slides.length > 3 ? $('.reviews__list').addClass('box-shadow') : '';

    const allSections = $('.section');

    $(document).on('scroll', function() {
        const windowScroll = $(window).scrollTop(),
        headerHeight = $('.header').outerHeight(),
        footerSectionHeight = window.matchMedia("(min-width: 768px)").matches ?  $('.footer').outerHeight(true) :  $('.footer').outerHeight(true) - $('.footer').outerHeight() + 100;

            allSections.each( function() {
                const sectionScroll = $(this).hasClass('footer') ? $(this).offset().top - footerSectionHeight : $(this).offset().top - headerHeight,
                        sectionId = $(this).attr('id'),
                        navItem = $(`.home-wrapper .header-line .header-nav__link[data-nav=${sectionId}]`);

                if(sectionScroll - windowScroll < 0) {
                    navItem.addClass('active');
                } else {
                    navItem.removeClass('active');
                }
            })
    })

    let servicesSlider;

    if (window.matchMedia("(max-width: 768px)").matches) {

        const servicesMobileNav = [];

        const servicesItems = document.querySelectorAll('.services__item');

        servicesItems.forEach((item) => {
          const currentText = item.getAttribute('data-mobileNav');

          servicesMobileNav.push(currentText);
        })

        servicesSlider = new Swiper('.services__content.swiper', {
            slidesPerView: 1,
            autoHeight: true,
            spaceBetween: 50,
            pagination: {
                el: '.services__thumbs-pagination',
                renderBullet: function (index, className) {
                    return '<div class="' + className + '">' + servicesMobileNav[index] + "</div>";
                },
            },
            navigation: {
                nextEl: '.services__thumbs-btn.next',
                prevEl: '.services__thumbs-btn.prev',
            },
        });
    }

    $('.ancorToServices').on('click', function(e) {
        const currentDataStep = $(this).data('step');

        if (window.matchMedia("(min-width: 768px)").matches) { 
            switch(currentDataStep) {
                case 'step-calc':
                    $('.button--calculate').trigger('click');
                    break;
                case 'step-deliveryMiscalculation':
                    $('.button--deliveryMiscalculation').trigger('click');
                    break;
                case 'step-deliveryOrder':
                    $('.button--deliveryOrder').trigger('click');
                    break;
                case 'step-tracking':
                    $('.button--tracking').trigger('click');
                    break;
                case 'step-attorneyRegistration':
                    $('.button--attorneyRegistration').trigger('click');
                    break;
            }
        } else {
            switch(currentDataStep) {
                case 'step-calc':
                    servicesSlider.slideTo(0); 
                    break;
                case 'step-deliveryMiscalculation':
                    servicesSlider.slideTo(1); 
                    break;
                case 'step-deliveryOrder':
                    servicesSlider.slideTo(2); 
                    break;
                case 'step-tracking':
                    servicesSlider.slideTo(3); 
                    break;
                case 'step-attorneyRegistration':
                    servicesSlider.slideTo(4); 
                    break;
            }
        }
    })

    $('.steps__payment-btn').on('click', function() {
        $('.button--deliveryMiscalculation').trigger('click');
    })

    $("a.ancor-link[href*='#']").on("click", function (e) {
        let heightHeader = $('.header').height();

        var id = $(this).attr('href'),
            top = $(id).offset().top - heightHeader + 'px';
        $('body,html').animate({
            scrollTop: top
        }, 500);
    });

    $('select').niceSelect();

    const moonth = new Date();
	let monthNumber = moonth.getMonth();

    switch(monthNumber) {
        case 11:
        case 0:
        case 1:
            $(".wrapper").addClass("winter-bg");
            $(".not-found__img").attr("src", "./img/content/404/winter-404.png");
            break;
        case 2:
        case 3:
        case 4:
            $(".wrapper").addClass("spring-bg");
            $(".not-found__img").attr("src", "./img/content/404/spring-404.png");
            break;
        case 5:
        case 6:
        case 7:
            $(".wrapper").addClass("summer-bg");
            $(".not-found__img").attr("src", "./img/content/404/summer-404.png");
            break;
        case 8:
        case 9:
        case 10:
            $(".wrapper").addClass("autumn-bg");
            $(".not-found__img").attr("src", "./img/content/404/autumn-404.png");
            break;
                
    }

})