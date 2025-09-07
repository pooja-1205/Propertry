// =========================
// AOS (Animate On Scroll)
// =========================
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// =========================
// GSAP Animations
// =========================
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-text h1", {
  duration: 1.5,
  y: 100,
  opacity: 0,
  ease: "power3.out",
});

gsap.from(".hero-text p", {
  duration: 1.2,
  y: 50,
  opacity: 0,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".hero-text div", {
  duration: 1,
  y: 30,
  opacity: 0,
  delay: 0.6,
  ease: "power3.out",
});

// =========================
// Smooth Scrolling
// =========================
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});

// =========================
// Mobile Menu Toggle
// =========================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });
}

document.addEventListener("click", (e) => {
  if (
    mobileMenu &&
    !mobileMenu.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    mobileMenu.classList.add("hidden");
  }
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// =========================
// Contact Form
// =========================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("mobile").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    if (!data.name || !data.email || !data.phone || !data.message) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      } else {
        alert("❌ Failed to send message. Please try again!");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("⚠️ Server error! Please try again later.");
    }
  });
}

// =========================
// Navbar Scroll Effect
// =========================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (navbar) {
    if (scrollTop > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
    }
  }
});

// =========================
// Input Validation Styling
// =========================
const inputs = document.querySelectorAll("input, textarea");
inputs.forEach((input) => {
  input.addEventListener("blur", function () {
    this.style.borderColor = this.value.trim() === "" ? "#ef4444" : "#10b981";
  });

  input.addEventListener("focus", function () {
    this.style.borderColor = "#3b82f6";
  });
});

// =========================
// Gallery Filter
// =========================
function filterGallery(category) {
  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".gallery-filter-btn");

  buttons.forEach((btn) => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      gsap.to(item, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: "power2.out",
      });
      item.classList.remove("hidden");
    } else {
      gsap.to(item, {
        duration: 0.3,
        opacity: 0,
        scale: 0.8,
        ease: "power2.in",
        onComplete: () => item.classList.add("hidden"),
      });
    }
  });
}

// =========================
// Image Modal with Slider
// =========================
let currentImages = [];
let currentIndex = 0;
let currentData = null;

function openImageModal(imageId) {
  const modal = document.getElementById("imageModal");

  const imageData = {
    dongargaon1: {
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      title: "Dongargaon Project - Main Building",
      description:
        "Modern residential complex with contemporary architecture and premium amenities.",
    },
    dongargaon2: {
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      title: "Dongargaon Project - Interior Design",
      description:
        "Spacious 2-3 BHK apartments with modern interiors and premium fittings.",
    },
    greenvalley1: {
      image: ["./assets/b.jpeg", "./assets/a.jpeg"],
      title: "Green Valley Resort - Resort Overview",
      description:
        "Luxury farmhouse project with resort-style amenities and natural surroundings.",
    },
    greenvalley2: {
      image:["./assets/f.jpeg","./assets/h.jpeg"],
        
      title: "Green Valley Resort - Pool & Amenities",
      description:
        "Premium recreational facilities including swimming pool, spa, and landscaped gardens.",
    },
    luxury1: {
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Luxury Villas - Construction Progress",
      description:
        "Ultra-luxury villa project under development with modern architecture, private gardens, and world-class amenities.",
    },
    commercial1: {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Commercial Complex - Architectural Design",
      description:
        "Modern commercial development in planning phase, designed for business growth with premium office and retail spaces.",
    },
  };

  const data = imageData[imageId];
  if (!data) return;

  currentData = data;
  currentImages = Array.isArray(data.image) ? data.image : [data.image];
  currentIndex = 0;

  renderModalContent();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function renderModalContent() {
  const content = document.getElementById("modalImageContent");
  const imgSrc = currentImages[currentIndex];

  content.innerHTML = `
    <img src="${imgSrc}" alt="${currentData.title}" 
      class="max-w-full max-h-full object-contain rounded-lg">

    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
      <h3 class="text-white text-xl font-bold mb-2">${currentData.title}</h3>
      <p class="text-gray-200 text-sm">${currentData.description}</p>
    </div>

    ${
      currentImages.length > 1
        ? `
        <button onclick="prevImage()" 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 text-black rounded-full p-3">‹</button>
        <button onclick="nextImage()" 
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 text-black rounded-full p-3">›</button>
      `
        : ""
    }

    <button onclick="closeImageModal()" 
      class="absolute top-4 right-4 text-white text-4xl font-bold hover:text-red-400">&times;</button>
  `;
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  renderModalContent();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  renderModalContent();
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) closeImageModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeImageModal();
});

// =========================
// Brochure Download
// =========================
function downloadBrochure(projectName) {
  const brochureFiles = {
    luxuryvillas: "./assets/paccex.pdf",
    commercialcomplex: "./assets/paccex.pdf",
    smarthomes: "./assets/paccex.pdf",
    dongargaon: "./assets/paccex.pdf",
    greenvalley: "./assets/GreenValley.pdf",
  };

  const fileUrl = brochureFiles[projectName];
  if (!fileUrl) return alert("Brochure not available for this project.");
  window.open(fileUrl, "_blank");
}

// =========================
// Extra Animations
// =========================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".gradient-hero");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

document.querySelectorAll(".service-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () =>
    gsap.to(icon, { duration: 0.3, scale: 1.2, rotation: 10 })
  );
  icon.addEventListener("mouseleave", () =>
    gsap.to(icon, { duration: 0.3, scale: 1, rotation: 0 })
  );
});

window.addEventListener("load", () => {
  gsap.from("body", { duration: 0.5, opacity: 0, ease: "power2.out" });
});
