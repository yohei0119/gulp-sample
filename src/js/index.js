$(function () {
  // global navi
  const $naviBtn = $('.g-navi-btn');
  const $navi = $('.g-navi-sp');
  $naviBtn.click((e) => {
    e.preventDefault();
    $(e.currentTarget).toggleClass('open');
    if ($(e.currentTarget).hasClass('open')) {
      $navi.addClass('open');
    } else {
      $navi.removeClass('open');
    }
  });

  // pagetop + scroll animation
  const $window = $(window);
  const $pagetop = $('#page-top');
  const $scrollTarget = $('.title');
  $window.scroll((e) => {
    // pagetop
    if($(e.currentTarget).scrollTop() > 100) {
      $pagetop.addClass('active');
    } else {
      $pagetop.removeClass('active');
    }
    // scroll animation
    $scrollTarget.each(function() {
      let scroll = $window.scrollTop();       // スクロール位置を取得
      let offsetTop = $(this).offset().top;   // 指定要素のY座標
      let height = $window.height();          // ウィンドウの高さ
      if (scroll > offsetTop - height){
        $(this).addClass('down');
      }       
    });
  });

  $pagetop.click(() => {
    $("html, body").animate({scrollTop: 0}, 500);
  });


  // validation
  const $form = $('#contact-form');
  $form.validate({
    // reuired check
    rules: {
      contactName: {
        required: true
      },
      contactEmail: {
        required: true,
        email: true
      }
    },
    // error message
    messages: {
      contactName: {
        required: 'Name is required'
      },
      contactEmail: {
        required: 'Email address is required',
        email: 'The format of the email address is different'
      }
    },
    errorPlacement: (error, element) => {
      error.insertBefore(element);
      element.addClass('error');
      $('html, body').animate({
        scrollTop: $form.offset().top - 100
      }, 1000);      
    },
    errorElement: "span",
    errorClass: "is-error"
  });
  
  // form clear button
  const $clearBtn = $(".js-clearBtn");
  $clearBtn.on("click", () => {
    $form
      .find("input, select, textarea")
      .not(":button, :submit, :reset, :hidden")
      .val("")
      .prop("checked", false)
      .prop("selected", false);
    $form.find(":radio").filter("[data-default]").prop("checked", true);
    $('html, body').animate({
      scrollTop: $form.offset().top - 100
    }, 1000);
  });
});