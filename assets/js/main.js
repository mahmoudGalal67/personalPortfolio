!(function ($) {
  "use strict";

  // Hero typed
  if ($(".typed").length) {
    var typed_strings = $(".typed").data("typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on(
    "click",
    ".nav-menu a , .imageDiv a , .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
          var scrollto = target.offset().top;

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  $(document).on("click", ".mobile-nav-toggle", function (e) {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass(
      "icofont-navigation-menu icofont-close"
    );
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("mobile-nav-active")) {
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Skills section
  $(".skills-content").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    {
      offset: "80%",
    }
  );

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

// Form

function alertSuccess() {
  setTimeout(() => {
    document.querySelector(".alert.alert-success").classList.remove("show");
    window.location.reload();
  }, 1300);
}

function sendEmail() {
  let spinner = document.querySelector(".spinner-border");
  spinner.style.display = "block";
  let params = {
    form_name: document.getElementById("formPortfolio"),
    name: document.getElementById("name").value,
    about: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    email: document.getElementById("email").value,
  };
  emailjs.send("service_rx98miq", "template_jriuqoj", params).then((res) => {
    spinner.style.display = "none";
    document.querySelector(".alert.alert-success").classList.add("show");
    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    alertSuccess();
  });
}

// Validation

const checkText = (e) => {
  let errorSpan = e.target.parentNode.querySelector("span");
  if (!errorSpan && e.target.value.length < 5) {
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<span class='text-danger'>Required at least 5 charachter </span>"
    );
  }
  if (errorSpan && e.target.value.length >= 5) errorSpan.remove();
};

const checkEmail = (e) => {
  let errorSpan = e.target.parentNode.querySelector("span");
  if (!errorSpan && !/^.+@gmail\.com$/i.test(e.target.value)) {
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<span class='text-danger'>It must be in form examble@gmail.com </span>"
    );
  }
  if (errorSpan && /^.+@.+\.com$/i.test(e.target.value)) errorSpan.remove();
};

document.getElementById("name").addEventListener("blur", checkText);
document.getElementById("message").addEventListener("blur", checkText);
document.getElementById("subject").addEventListener("blur", checkText);
document.getElementById("email").addEventListener("blur", checkEmail);

let submitButton = document.querySelector(".email-form button");
let erroSpang = Array.from(
  document.querySelectorAll(".email-form .form-group span")
);
let notValid = erroSpang.some((e) => e.textContent);
submitButton.setAttribute("disabled", "disabled");
let formFilled = Array.from(
  document.querySelectorAll(".email-form input")
).every((input) => input.value);
Array.from(document.querySelectorAll(".email-form input")).forEach((ele) => {
  ele.addEventListener("change", () => {
    erroSpang = Array.from(
      document.querySelectorAll(".email-form .form-group span")
    );
    notValid = erroSpang.some((e) => e.textContent);
    formFilled = Array.from(
      document.querySelectorAll(".email-form input")
    ).every((input) => input.value);
    if (
      formFilled === false ||
      notValid === true ||
      document.getElementById("message").value === ""
    ) {
      submitButton.setAttribute("disabled", "disabled");
    } else {
      submitButton.removeAttribute("disabled");
    }
  });
});

document.getElementById("message").addEventListener("blur", (e) => {
  erroSpang = Array.from(
    document.querySelectorAll(".email-form .form-group span")
  );
  notValid = erroSpang.some((ele) => ele.textContent);
  if (notValid === true || e.target.value === "") {
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
  }
});

// Validation

// Age

const myAge = document.querySelector(".myAge");
const currentAge =
  new Date().getFullYear() - new Date("1997-1-1").getFullYear();
myAge.innerHTML = currentAge;
