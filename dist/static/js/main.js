"use strict";

$(window).on('load', function () {
  var body = $('body');
  var header = $('.header__inner');
  body.css('margin-right', calcScroll());
  header.css('transform', 'translateX(' + -calcScroll() / 2 + 'px)');
  setTimeout(function () {
    $('.loader').fadeOut(500, function () {
      $(this).remove();

      if (body.hasClass('hidden--loader')) {
        body.delay(400).removeClass('hidden--loader');
        body.css('margin-right', '');
        header.css('transform', '');
      }
    });
  }, 500);
});

function calcScroll() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

$(function () {
  svg4everybody({});

  var headerUser = function headerUser() {
    var container = $('.header__user-btn');
    container.on('click', function (e) {
      e.stopPropagation();
      $(this).toggleClass('active');
      $(this).next().slideToggle(200);
    });
    $(document).on('click', function (e) {
      var target = e.target;

      if (!container.next().is(target) && container.next().has(target).length === 0) {
        container.removeClass('active');
        container.next().slideUp(200);
      }
    });
  };

  var menu = function menu() {
    var btn = $('.burger');
    var menu = $('.menu');
    var info = $('.header__info');
    var phone = $('.header__phone');
    var header = $('.header');
    var body = $('body');

    function responsivePhone() {
      var w = $(window).width();

      if (w <= 772) {
        if (btn.hasClass('open')) {
          phone.remove();
          menu.append(phone);
          phone.addClass('header__phone--open');
          body.addClass('hidden');
        } else {
          phone.removeClass('header__phone--open');
          body.removeClass('hidden');
          $('.header__inner > *:nth-child(1)').after(phone);
        }
      } else {
        info.prepend(phone);
      }
    }

    responsivePhone();
    btn.on('click', function () {
      $(this).toggleClass('open');
      menu.slideToggle();
      header.toggleClass('header--open');
      info.toggleClass('header__info--open');
      body.toggleClass('hidden');
      responsivePhone();
    });

    function responsiveMenu() {
      var w = $(window).width();

      if (w >= 1100) {
        btn.removeClass('open');
        menu.removeAttr('style');
        header.removeClass('header--open');
        info.removeClass('header__info--open');
        body.removeClass('hidden');
      }
    }

    responsiveMenu();
    $(window).resize(function (e) {
      responsivePhone();
      responsiveMenu();
    });
  };

  var certificatesSlider = function certificatesSlider() {
    $('.certificates__slider').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      touchThreshold: 40,
      appendArrows: '.certificates__arrows',
      nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      responsive: [{
        breakpoint: 1131,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 973,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 773,
        settings: {
          slidesToShow: 3,
          rows: 2
        }
      }, {
        breakpoint: 451,
        settings: {
          slidesToShow: 2,
          rows: 2
        }
      }]
    });
  };

  var teamSlider = function teamSlider() {
    var link = $(".team__tab-link");
    $('.team__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 40,
      appendArrows: '.team__arrows',
      nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      responsive: [{
        breakpoint: 661,
        settings: {
          fade: true
        }
      }]
    }).on('afterChange', function () {
      var dataId = $('.slick-current').attr("data-slick-index");
      link.each(function () {
        if ($(this).attr('data-id') === dataId) {
          link.parent().removeClass('team__tab--active');
          $(this).parent().addClass('team__tab--active');
        }
      });
    });
    link.on("click", function (e) {
      e.preventDefault();
      $('.team__slider').slick('slickGoTo', $(this).attr('data-id'));
      link.parent().removeClass('team__tab--active');
      $(this).parent().addClass('team__tab--active');
    });
  };

  var reviewsSlider = function reviewsSlider() {
    $('.reviews__slider').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      appendArrows: '.reviews__arrows',
      touchThreshold: 40,
      nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      responsive: [{
        breakpoint: 793,
        settings: {
          rows: 2,
          slidesToShow: 1,
          fade: true
        }
      }]
    });
  };

  var answersSlider = function answersSlider() {
    $('.answers__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      appendArrows: '.answers__arrows',
      touchThreshold: 40,
      nextArrow: '<button class="section-arrow section-arrow--bg-blue section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      prevArrow: '<button class="section-arrow section-arrow--bg-blue section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
      rows: 4,
      fade: true
    });

    function previewResponsive() {
      var w = $(window).width();
      var elem = $('.answers__preview-category');
      elem.each(function () {
        if (w <= 900) {
          var content = $(this).closest('.answers__preview').find('.answers__preview-head');
          var $thisElem = $(this).remove();
          content.append($thisElem);
        } else {
          var _content = $(this).closest('.answers__preview').find('.answers__preview-bottom > *:nth-child(1)');

          var _$thisElem = $(this).remove();

          _content.after(_$thisElem);
        }
      });
    }

    previewResponsive();
    $(window).resize(function () {
      previewResponsive();
    });
  };

  var tabs = function tabs() {
    var tab = $('.information__tab');
    var content = $('.information__box');
    content.hide();
    content.first().show();
    tab.first().addClass('information__tab--active');
    tab.on('click', function () {
      var $this = $(this);
      content.each(function () {
        if ($(this).attr('data-content') === $this.attr('data-href') && !$this.hasClass('information__tab--active')) {
          content.slideUp();
          tab.removeClass('information__tab--active');
          $this.addClass('information__tab--active');
          $(this).slideDown();
        }
      });
    });
  };

  var readMore = function readMore() {
    $('.information__excerpt').on('click', function (e) {
      e.preventDefault();
      $('.information__text').slideDown();
      $(this).remove();
    });
  };

  menu();
  headerUser();
  certificatesSlider();
  teamSlider();
  reviewsSlider();
  answersSlider();
  tabs();
  readMore();
});

var headerSticky = function headerSticky() {
  var scrollPrev = 0;
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;

    if (scrolled >= 30 && scrolled > scrollPrev) {
      header.style.top = -header.offsetHeight + 'px';
      header.classList.remove('header--sticky');
    } else if (scrolled === 0) {
      header.classList.remove('header--sticky');
    } else {
      header.style.top = 0;
      header.classList.add('header--sticky');
    }

    scrollPrev = scrolled;
  });
};

headerSticky();