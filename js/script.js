let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {
  //phone size menu onclick
  $("#menu-id").click(function (e) {
    e.preventDefault();
    $(".navgition").toggleClass("reset-left");
    $("body").toggleClass("overflow");
  });
  $(".nav-head .close-menu").click(function () {
    $(".navgition").removeClass("reset-left");
    $("body").removeClass("overflow");
  });
  ///////// ** main** /////////
  var specials = new Swiper(".main-slider .swiper-container", {
    loop: true,
    autoplay: false,
    slidesPerView: 1,
    touchMoveStopPropagation: false,
    allowTouchMove: false,
    pagination: {
      el: ".main-slider .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        autoplay: true,
        touchMoveStopPropagation: true,
        allowTouchMove: true,
      },
      767: {
        autoplay: false,
        touchMoveStopPropagation: false,
        allowTouchMove: false,
      },
    },
    on: {
      init: function (swiper) {
        lazyLoad();
      },
    },
  });
  if ($(window).width() <= 1199) {
    var $stickyheader = $("header");
    $(window).on("scroll load", function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 200) {
        $stickyheader.addClass("fixed-header", 500);
      } else {
        $stickyheader.removeClass("fixed-header", 500);
      }
      if (scroll == 0) {
        $stickyheader.removeClass("fixed-header", 500);
      }
    });
  }
  //fixed nav
  // var $stickyheader = $("header");
  // lastScroll = 0;
  // $(window).on("scroll load", function () {
  //   var scroll = $(window).scrollTop();
  //   if (lastScroll - scroll > 0) {
  //     $stickyheader.addClass("fixed-header", { duration: 1000 });
  //   } else {
  //     $stickyheader.removeClass("fixed-header", { duration: 500 });
  //   }
  //   lastScroll = scroll;
  //   if (scroll == 0) {
  //     $stickyheader.removeClass("fixed-header", { duration: 500 });
  //   }
  // });
  lazyLoad();
});
function lazyLoad() {
  const images = document.querySelectorAll(".lazy-img");

  const optionsLazyLoad = {
    //  rootMargin: '-50px',
    // threshold: 1
  };

  const imageObserver = new IntersectionObserver(function (enteries) {
    enteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function preloadImage(img) {
  img.src = img.getAttribute("data-src");
  img.onload = function () {
    img.parentElement.classList.remove("loading-img");
    img.parentElement.classList.add("loaded-img");
  };
}
