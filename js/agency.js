"use strict";

document.addEventListener("DOMContentLoaded", function() {
  var mainNav = document.body.querySelector("#mainNav");

  var navbarCollapse = function() {
    if (!mainNav) {
      return;
    }
    if (window.scrollY > 100) {
      mainNav.classList.add("navbar-shrink");
    } else {
      mainNav.classList.remove("navbar-shrink");
    }
  };

  navbarCollapse();
  document.addEventListener("scroll", navbarCollapse);

  var scrollTriggers = Array.prototype.slice.call(
    document.querySelectorAll('a.js-scroll-trigger[href^="#"]:not([href="#"])')
  );

  scrollTriggers.forEach(function(link) {
    link.addEventListener("click", function(event) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) {
        return;
      }
      event.preventDefault();
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 54;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link.js-scroll-trigger")
  );

  var sectionIds = navLinks
    .map(function(link) {
      return link.getAttribute("href");
    })
    .filter(function(href) {
      return href && href.startsWith("#") && href.length > 1;
    });

  var sections = sectionIds
    .map(function(id) {
      return document.querySelector(id);
    })
    .filter(Boolean);

  var setActiveLink = function(activeId) {
    navLinks.forEach(function(link) {
      var linkId = link.getAttribute("href");
      if (linkId === activeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  var updateActiveFromSections = function() {
    var offset = 60;
    var activeSection = sections[0];

    sections.forEach(function(section) {
      var top = section.getBoundingClientRect().top - offset;
      if (top <= 0) {
        activeSection = section;
      }
    });

    if (activeSection) {
      setActiveLink("#" + activeSection.id);
    }
  };

  if (sections.length) {
    var observer = new IntersectionObserver(
      function() {
        updateActiveFromSections();
      },
      {
        rootMargin: "-56px 0px -60%",
        threshold: 0
      }
    );

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

  var navbarToggler = document.body.querySelector(".navbar-toggler");
  var navbarResponsive = document.body.querySelector("#navbarResponsive");
  var responsiveNavItems = Array.prototype.slice.call(
    document.querySelectorAll("#navbarResponsive .js-scroll-trigger")
  );

  var collapse = navbarResponsive && window.bootstrap
    ? new bootstrap.Collapse(navbarResponsive, { toggle: false })
    : null;

  responsiveNavItems.forEach(function(item) {
    item.addEventListener("click", function() {
      if (!navbarToggler || !collapse) {
        return;
      }
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        collapse.hide();
      }
    });
  });

  var modals = Array.prototype.slice.call(
    document.querySelectorAll(".portfolio-modal")
  );
  modals.forEach(function(modal) {
    modal.addEventListener("show.bs.modal", function() {
      var navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.add("d-none");
      }
    });
    modal.addEventListener("hidden.bs.modal", function() {
      var navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.remove("d-none");
      }
    });
  });

  window.addEventListener("load", function() {
    if (sections.length) {
      updateActiveFromSections();
    }
  });
});
