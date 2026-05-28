document.addEventListener("DOMContentLoaded", () => {
  setupRevealAnimation();
  setupMenuTabs();
  setupNavScrollEffect();
  setupHamburgerMenu();
  setupReviewsSwiper();
});

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupMenuTabs() {
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-panel");

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.menuTarget;
      if (!target) return;

      tabs.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => {
        panel.hidden = true;
      });

      tab.classList.add("active");

      const targetPanel = document.getElementById(`menu-${target}`);
      if (targetPanel) {
        targetPanel.hidden = false;
      }
    });
  });
}

function setupNavScrollEffect() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.style.borderBottomColor =
      window.scrollY > 60 ? "rgba(216,207,196,0.5)" : "rgba(216,207,196,0.3)";
  });
}

// Responsive hamburger menu
function setupHamburgerMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
  };

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("menu-open")) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!document.body.classList.contains("menu-open")) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) {
      closeMenu();
    }
  });
}

function setupReviewsSwiper() {
  if (typeof Swiper === "undefined") return;

  const reviewsSwiper = document.querySelector(".reviews-swiper");
  if (!reviewsSwiper) return;

  new Swiper(".reviews-swiper", {
    slidesPerView: 1.45,
    centeredSlides: true,
    loop: true,
    speed: 700,
    effect: "coverflow",
    grabCursor: true,

    navigation: {
      nextEl: ".reviews-next",
      prevEl: ".reviews-prev",
    },

    coverflowEffect: {
      rotate: 0,
      stretch: 40,
      depth: 180,
      modifier: 1,
      slideShadows: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.14,
      },
      560: {
        slidesPerView: 1.25,
      },
      960: {
        slidesPerView: 1.45,
      },
    },
  });
}
