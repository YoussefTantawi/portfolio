document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".progress-bar");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navMenu = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
  const year = document.getElementById("year");

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    body.classList.toggle("dark-mode", isDark);
    if (themeIcon) {
      themeIcon.classList.toggle("fa-sun", isDark);
      themeIcon.classList.toggle("fa-moon", !isDark);
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  setTheme(localStorage.getItem("theme") || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(body.classList.contains("dark-mode") ? "light" : "dark");
    });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      if (navMenu) navMenu.classList.remove("active");
      body.classList.remove("menu-open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");

      const offset = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const updatePageState = () => {
    const scrollTop = window.scrollY;
    const scrollLimit = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollLimit > 0 ? (scrollTop / scrollLimit) * 100 : 0;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (header) header.classList.toggle("scrolled", scrollTop > 16);

    let activeSection = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= scrollTop + 140) {
        activeSection = section;
      }
    });

    navLinks.forEach((link) => {
      const activeId = activeSection ? activeSection.id : "";
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  if (year) year.textContent = new Date().getFullYear();

  updatePageState();
  window.addEventListener("scroll", updatePageState, { passive: true });
});
