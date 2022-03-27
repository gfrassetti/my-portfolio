// $('.hamburger-menu, .link').click(function () {
//  $('body').hasClass('menu-open') ? ($('body').removeClass('menu-open')) : ($('body').addClass('menu-open'));
// });

//However, don't forget to include jQuery for it to work.

function toggleMenu() {
  var body = document.body;
  body.className.match(/(?:^|\s)menu-open(?!\S)/)
    ? (body.className = body.className.replace(/(?:^|\s)menu-open(?!\S)/g, ""))
    : (body.className += "menu-open");
}

window.onload = function () {
  var hamburger = document.getElementsByClassName("hamburger-menu")[0];
  var menuLinks = document.getElementsByClassName("link");

  hamburger.addEventListener("click", toggleMenu);

  for (var i = 0; i < menuLinks.length; ++i) {
    var menuLink = menuLinks[i];
    menuLink.addEventListener("click", toggleMenu);
  }
};

var viewport = $(window),
  root = $("html"),
  maxScroll;

// Bind events to window
viewport
  .on({
    scroll: function () {
      // Grab scroll position
      var scrolled = viewport.scrollTop();

      /**
       * Calculate our factor, setting it as the root `font-size`.
       *
       * Our factor is calculated by multiplying the ratio of the page scrolled by our base factor. The higher the base factor, the larger the parallax effect.
       */
      root.css({ fontSize: (scrolled / maxScroll) * 50 });
    },
    resize: function () {
      // Calculate the maximum scroll position
      maxScroll = root.height() - viewport.height();
    },
  })
  .trigger("resize");
