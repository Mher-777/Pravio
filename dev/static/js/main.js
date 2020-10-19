$(function () {
    svg4everybody({})
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
    const teamSlider = () => {
        const link = $(".team__tab-link")
        $('.team__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            touchThreshold: 40,
            appendArrows: '.team__arrows',
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 661,
                    settings: {
                        fade: true
                    }
                }
            ]
        }).on('afterChange', function() {
            let dataId = $('.slick-current').attr("data-slick-index");
            link.each(function () {
                if($(this).attr('data-id') === dataId) {
                    link.parent().removeClass('team__tab--active')
                    $(this).parent().addClass('team__tab--active')
                }
            })
        });
        link.on("click", function(e){
            e.preventDefault()
            $('.team__slider').slick('slickGoTo', $(this).attr('data-id'));
            link.parent().removeClass('team__tab--active')
            $(this).parent().addClass('team__tab--active')
        });
    }
    const reviewsSlider = () => {
        $('.reviews__slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            appendArrows: '.reviews__arrows',
            touchThreshold: 40,
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 793,
                    settings: {
                        rows: 2,
                        slidesToShow: 1,
                        fade: true
                    }
                }
            ]
        })
    }
    const answersSlider = () => {
        $('.answers__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            appendArrows: '.answers__arrows',
            touchThreshold: 40,
            nextArrow: '<button class="section-arrow section-arrow--bg-blue section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-blue section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            rows: 4,
            fade: true
        })
        function previewResponsive() {
            const w = $(window).width()
            const elem = $('.answers__preview-category')
            elem.each(function () {
                if(w <= 900 ) {
                    const content = $(this).closest('.answers__preview').find('.answers__preview-head')
                    const $thisElem = $(this).remove()
                    content.append($thisElem)
                } else {
                    const content = $(this).closest('.answers__preview').find('.answers__preview-bottom > *:nth-child(1)')
                    const $thisElem = $(this).remove()
                    content.after($thisElem)
                }

            })
        }
        previewResponsive()
        $(window).resize(function () {
            previewResponsive()
        })
    }
    const tabs = () => {
        const tab = $('.information__tab')
        const content = $('.information__box')
        content.hide()
        content.first().show()
        tab.first().addClass('information__tab--active')
        tab.on('click', function () {
            const $this = $(this)
            content.each(function () {
                if($(this).attr('data-content') === $this.attr('data-href') && !$this.hasClass('information__tab--active')) {
                    content.slideUp()
                    tab.removeClass('information__tab--active')
                    $this.addClass('information__tab--active')
                    $(this).slideDown()
                }
            })
        })
    }
    const readMore = () => {
        $('.information__excerpt').on('click', function (e) {
            e.preventDefault()
            $('.information__text').slideDown()
            $(this).remove()
        })
    }
    menu()
    headerUser()
    certificatesSlider()
    teamSlider()
    reviewsSlider()
    answersSlider()
    tabs()
    readMore()
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
