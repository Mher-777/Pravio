"use strict";

$(function () {
  svg4everybody({});

  function debouncer(func, timeout) {
    var timeoutID,
        timeout = timeout || 200;
    return function () {
      var scope = this,
          args = arguments;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        func.apply(scope, Array.prototype.slice.call(args));
      }, timeout);
    };
  }

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

    function responsivePhone() {
      var w = $(window).width();

      if (w <= 772) {
        if (btn.hasClass('open')) {
          phone.remove();
          menu.append(phone);
          phone.addClass('header__phone--open');
        } else {
          phone.removeClass('header__phone--open');
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
      responsivePhone();
    });

    function responsiveMenu() {
      var w = $(window).width();

      if (w >= 1100) {
        btn.removeClass('open');
        menu.removeAttr('style');
        header.removeClass('header--open');
        info.removeClass('header__info--open');
      }
    }

    responsiveMenu();
    $(window).resize(function (e) {
      responsivePhone();
      responsiveMenu();
    });
  };

  menu();
  headerUser();
});