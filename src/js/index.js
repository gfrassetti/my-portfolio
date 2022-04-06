// $('.hamburger-menu, .link').click(function () {
//  $('body').hasClass('menu-open') ? ($('body').removeClass('menu-open')) : ($('body').addClass('menu-open'));
// });
const nav = document.querySelector(".nav");
//However, don't forget to include jQuery for it to work.

function toggleMenu() {
  var body = document.body;
  body.className.match(/(?:^|\s)menu-open(?!\S)/)
    ? (body.className = body.className.replace(
        /(?:^|\s)menu-open(?!\S)/g,
        "",
        (nav.className = "nav"),
        $("#span3").css("top", "30px"),
        $("#span1").css("margin-top", "7px")
      ))
    : (body.className += "menu-open");
}

window.onload = function () {
  parallax();
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

function openMenu() {
  //Hamburger btn

  nav.addEventListener("click", (event) => {
    nav.classList.toggle("open");
    if ($(".nav").hasClass("open")) {
      $("#span1").css("margin-top", "0px");
      $("#span3").css("top", "37px");
    } else {
      $("#span3").css("top", "30px");
      $("#span1").css("margin-top", "7px");
    }
  });
}

openMenu();

function parallax() {
  /* codepen */
  document.querySelectorAll(".scene").forEach((elem) => {
    const modifier = elem.getAttribute("data-modifier");

    basicScroll
      .create({
        elem: elem,
        from: 0,
        to: 519,
        direct: true,
        props: {
          "--translateY": {
            from: "0",
            to: `${10 * modifier}px`,
          },
        },
      })
      .start();
  });
}

/* darker banner */

$(window).scroll(function () {
  /*   $(".banner").css("opacity", 1 - $(window).scrollTop() / 950); */
  if ($(window).scrollTop() > 700) {
    $("#head").addClass("navbar-fixed-top");
    $(".logo").addClass("logo-sticky");
  } else {
    $("#head").removeClass("navbar-fixed-top");
    $(".logo").removeClass("logo-sticky");
  }
  if (!$(".logo").hasClass("logo-sticky")) {
    $(".logo").height("9%");
  } else {
    $(".logo").height("7%");
  }
  if ($(window).scrollTop() > 1500) {
    $(".logo-sticky").css("position", "fixed");
  } else {
    $(".logo-sticky").css("position", "sticky");
  }
});
/*  */

var path = document.querySelector("#separator");
var length = path.getTotalLength();

document.write(
  "<style>svg line#separator { stroke-dasharray:" +
    length +
    "; stroke-dashoffset:" +
    length +
    ";</style>"
);
/*  */
