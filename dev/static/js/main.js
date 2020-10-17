$(function () {
    svg4everybody({})

    function debouncer(func, timeout) {
        var timeoutID, timeout = timeout || 200;
        return function () {
            var scope = this, args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    }

    const headerUser = () => {
        const container = $('.header__user-btn')
        container.on('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass('active')
            $(this).next().slideToggle(200)
        })
        $(document).on('click', function (e) {
            const target = e.target;
            if (!container.next().is(target) && container.next().has(target).length === 0) {
                container.removeClass('active');
                container.next().slideUp(200)
            }
        });
    }
    const menu = () => {
        const btn = $('.burger')
        const menu = $('.menu')
        const info = $('.header__info')
        const phone = $('.header__phone')
        const header = $('.header')
        const body = $('body')
        function responsivePhone() {
            const w = $(window).width()
            if (w <= 772) {
                if (btn.hasClass('open')) {
                    phone.remove()
                    menu.append(phone)
                    phone.addClass('header__phone--open')
                    body.addClass('hidden')
                } else {
                    phone.removeClass('header__phone--open')
                    body.removeClass('hidden')
                    $('.header__inner > *:nth-child(1)').after(phone)
                }
            } else {
                info.prepend(phone)
            }
        }

        responsivePhone()
        btn.on('click', function () {
            $(this).toggleClass('open')
            menu.slideToggle()
            header.toggleClass('header--open')
            info.toggleClass('header__info--open')
            body.toggleClass('hidden')
            responsivePhone()
        })

        function responsiveMenu() {
            const w = $(window).width()
            if (w >= 1100) {
                btn.removeClass('open')
                menu.removeAttr('style')
                header.removeClass('header--open')
                info.removeClass('header__info--open')
                body.removeClass('hidden')
            }
        }

        responsiveMenu()
        $(window).resize(function (e) {
            responsivePhone()
            responsiveMenu()
        });
    }
    const certificatesSlider = () => {
        $('.certificates__slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            touchThreshold: 40,
            appendArrows: '.certificates__arrows',
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 1131,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 973,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 773,
                    settings: {
                        slidesToShow: 3,
                        rows: 2
                    }
                },
                {
                    breakpoint: 451,
                    settings: {
                        slidesToShow: 2,
                        rows: 2
                    }
                }
            ]
        })
    }
    menu()
    headerUser()
    certificatesSlider()
})
const headerSticky = () => {
    let scrollPrev = 0;
    let header = document.querySelector('.header')
    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;
        if(scrolled >= 30 && scrolled > scrollPrev) {
            header.style.top = -header.offsetHeight + 'px';
            header.classList.remove('header--sticky')
        } else if(scrolled === 0) {
            header.classList.remove('header--sticky')
        } else {
            header.style.top = 0;
            header.classList.add('header--sticky')
        }
        scrollPrev = scrolled;
    });
}

headerSticky()
