// ============ تهيئة الصفحة ============
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Page loaded successfully!");

  // 1. تحريك الخلفية المتحركة
  const shapes = document.querySelectorAll(".floating-shapes div");
  if (shapes.length > 0) {
    shapes.forEach((shape, index) => {
      shape.style.animationDelay = index * 5 + "s";
    });
    console.log("✅ Background animation initialized");
  }

  // 2. تحميل الوضع المحفوظ
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    const themeToggleIcon = document.querySelector("#themeToggle i");
    if (themeToggleIcon) {
      themeToggleIcon.classList.remove("fa-moon");
      themeToggleIcon.classList.add("fa-sun");
    }
    console.log("✅ Light mode loaded from localStorage");
  }

  // 3. تشغيل تأثيرات الـ hero
  const heroElements = document.querySelectorAll(
    ".hero-content h1, .hero-content h2, .hero-content p, .hero-btns"
  );
  if (heroElements.length > 0) {
    heroElements.forEach((el, index) => {
      el.style.animationDelay = 0.3 + index * 0.3 + "s";
    });
    console.log("✅ Hero animations initialized");
  }

  // 4. تهيئة تأثيرات الظهور
  initScrollAnimations();

  // 5. تحميل البيانات الديناميكية
  loadDynamicData();

  console.log("✅ Page initialization completed!");
});

// ============ وظائف التنقل ============
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
      navLinks.classList.toggle("active");
    }
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// تحديث رابط التنقل النشط
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// شريط التقدم للتمرير
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  if (scrollHeight > 0) {
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.style.width = scrollPercent + "%";
    }
  }
});

// ============ تبديل وضع الفاتح/الداكن ============
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "light");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "dark");
    }
  });
}

// ============ تأثيرات الظهور عند التمرير ============
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        if (entry.target.classList.contains("stat-number")) {
          const count = parseInt(entry.target.getAttribute("data-count"));
          animateCounter(entry.target, count);
        }

        if (entry.target.classList.contains("skill-level")) {
          const level = entry.target.getAttribute("data-level");
          setTimeout(() => {
            entry.target.style.width = level + "%";
          }, 300);
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".service-card, .project-card, .timeline-content, .cert-card, .skill-category, .contact-item, .team-card, .tech-category, .service-icon"
  );

  if (animatedElements.length > 0) {
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }

  document.querySelectorAll(".skill-level").forEach((skill) => {
    skill.style.width = "0";
    observer.observe(skill);
  });

  document.querySelectorAll(".stat-number").forEach((stat) => {
    observer.observe(stat);
  });
}

// دالة لتحريك العدادات
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 20);
}

// ============ وظائف الصور والوسائط ============
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

if (modal && modalImg) {
  document.querySelectorAll(".view-large").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const imgSrc =
        this.closest(".project-card")?.querySelector(".project-image")?.src;
      if (imgSrc) {
        modal.style.display = "block";
        modalImg.src = imgSrc;
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}