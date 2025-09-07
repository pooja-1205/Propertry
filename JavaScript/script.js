// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// GSAP Animations
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

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Navigation smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

// Close mobile menu when clicking on menu links
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Contact Form Submission → Backend API
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form data
    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("mobile").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.message) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    try {
      // Send data to backend API
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Message sent successfully!");
        document.getElementById("contactForm").reset();
      } else {
        alert("❌ Failed to send message. Please try again!");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("⚠️ Server error! Please try again later.");
    }
  });

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId + "Modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId + "Modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
  }

  lastScrollTop = scrollTop;
});

// Enhanced form validation
const inputs = document.querySelectorAll("input, textarea");
inputs.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.style.borderColor = "#ef4444";
    } else {
      this.style.borderColor = "#10b981";
    }
  });

  input.addEventListener("focus", function () {
    this.style.borderColor = "#3b82f6";
  });
});

// Gallery filter function
function filterGallery(category) {
  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".gallery-filter-btn");

  // Update active button
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filter items with animation
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
        onComplete: () => {
          item.classList.add("hidden");
        },
      });
    }
  });
}

let currentImages = [];
let currentIndex = 0;
let currentData = null;

function openImageModal(imageId) {
  const modal = document.getElementById("imageModal");
  const content = document.getElementById("modalImageContent");

  const imageData = {
    dongargaon1: {
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      title: "Dongargaon Project - Main Building",
      description:
        "Modern residential complex with contemporary architecture and premium amenities. Located on Umred Road with excellent connectivity.",
    },
    dongargaon2: {
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      title: "Dongargaon Project - Interior Design",
      description:
        "Spacious 2-3 BHK apartments with modern interiors, premium fittings, and thoughtful space planning for comfortable living.",
    },
    greenvalley1: {
      image: ["./assets/b.jpeg", "./assets/a.jpeg"],
      title: "Green Valley Resort - Resort Overview",
      description:
        "Luxury farmhouse project with resort-style amenities, natural surroundings, and exclusive community living experience.",
    },
    greenvalley2: {
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      title: "Green Valley Resort - Pool & Amenities",
      description:
        "Premium recreational facilities including swimming pool, spa, sports facilities, and landscaped gardens for resort-style living.",
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

  // store globally
  currentData = data;
  currentImages = Array.isArray(data.image) ? data.image : [data.image];
  currentIndex = 0;

  renderModalContent();

  modal.classList.remove("hidden"); // show modal
  document.body.style.overflow = "hidden";
}

function renderModalContent() {
  const content = document.getElementById("modalImageContent");
  const imgSrc = currentImages[currentIndex];

  content.innerHTML = `
    <img src="${imgSrc}" alt="${currentData.title}" 
      class="max-w-full max-h-full object-contain rounded-lg">

    <!-- Overlay info -->
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
      <h3 class="text-white text-xl font-bold mb-2">${currentData.title}</h3>
      <p class="text-gray-200 text-sm">${currentData.description}</p>
    </div>

    <!-- Prev Button -->
    ${
      currentImages.length > 1
        ? `
      <button onclick="prevImage()" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 text-black rounded-full p-3">
        ‹
      </button>

      <!-- Next Button -->
      <button onclick="nextImage()" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 text-black rounded-full p-3">
        ›
      </button>
    `
        : ""
    }
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

// function closeImageModal() {
//   document.getElementById("imageModal").classList.add("hidden");
//   document.body.style.overflow = "auto";
// }

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close image modal when clicking outside
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeImageModal();
  }
});

// Brochure download function
function downloadBrochure(projectName) {
  // Map project names to actual PDF file paths
  const brochureFiles = {
    luxuryvillas: "./assets/paccex.pdf",
    commercialcomplex: "./assets/paccex.pdf",
    smarthomes: "./assets/paccex.pdf",
    dongargaon: "./assets/paccex.pdf",
    greenvalley: "./assets/GreenValley.pdf",
  };

  const fileUrl = brochureFiles[projectName];
  if (!fileUrl) {
    alert("Brochure not available for this project.");
    return;
  }

  // Open PDF in a new tab
  window.open(fileUrl, "_blank");
}

// Keyboard navigation for modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    if (document.getElementById("imageModal").classList.contains("active")) {
      closeImageModal();
    }
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".gradient-hero");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Service icons hover animation with GSAP
document.querySelectorAll(".service-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      duration: 0.3,
      scale: 1.2,
      rotation: 10,
      ease: "back.out(1.7)",
    });
  });

  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      duration: 0.3,
      scale: 1,
      rotation: 0,
      ease: "back.out(1.7)",
    });
  });
});

// Loading animation
window.addEventListener("load", () => {
  gsap.from("body", {
    duration: 0.5,
    opacity: 0,
    ease: "power2.out",
  });
});
