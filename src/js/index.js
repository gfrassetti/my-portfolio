const nav = document.querySelector(".nav");
const LANGUAGE_STORAGE_KEY = "portfolio-language";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "es"];

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }
  return DEFAULT_LANGUAGE;
}

function updateLanguageToggle(currentLanguage) {
  const languageToggle = document.getElementById("language-toggle");
  if (!languageToggle) return;

  const nextLanguage = currentLanguage === "en" ? "es" : "en";
  languageToggle.textContent = nextLanguage.toUpperCase();
  languageToggle.setAttribute(
    "aria-label",
    nextLanguage === "es" ? "Cambiar a español" : "Switch to English"
  );
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = i18next.t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    element.setAttribute("placeholder", i18next.t(key));
  });
}

async function setupI18n() {
  const [enResponse, esResponse] = await Promise.all([
    fetch("./src/locales/en.json"),
    fetch("./src/locales/es.json"),
  ]);

  const [enTranslations, esTranslations] = await Promise.all([
    enResponse.json(),
    esResponse.json(),
  ]);

  const language = getInitialLanguage();
  await i18next.init({
    lng: language,
    fallbackLng: "en",
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
  });

  document.documentElement.lang = language;
  applyTranslations();
  updateLanguageToggle(language);

  const languageToggle = document.getElementById("language-toggle");
  if (languageToggle) {
    languageToggle.addEventListener("click", async () => {
      const currentLanguage = i18next.language.startsWith("es") ? "es" : "en";
      const nextLanguage = currentLanguage === "en" ? "es" : "en";
      await i18next.changeLanguage(nextLanguage);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage;
      applyTranslations();
      updateLanguageToggle(nextLanguage);
    });
  }
}

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

window.onload = async function () {
  await setupI18n();
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
  if ($(window).scrollTop() > 650) {
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
  /*   if ($(window).scrollTop() >= 1100) {
    $(".line-separator").css("display", "inline");
  } else {
    $(".line-separator").css("display", "none");
  } */
});
