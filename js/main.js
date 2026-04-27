// ===============================
// 🚀 INICIALIZACIÓN GENERAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  inicializarEmailJS();
  inicializarFormulario();
  inicializarAnimaciones();
  inicializarScrollSuave();
  inicializarMenuMovil();
  inicializarBotonWhatsApp();
});

// ===============================
// 📨 EMAILJS
// ===============================
function inicializarEmailJS() {
  if (typeof emailjs !== "undefined") {
    emailjs.init("Vf-s6EpqrYgVr3WnH");
  } else {
    console.warn("EmailJS no está cargado.");
  }
}

// ===============================
// ✉️ FORMULARIO DE CONTACTO
// ===============================
function inicializarFormulario() {
  const form = document.getElementById("contactForm");
  const statusText = document.getElementById("form-status");
  const submitButton = form ? form.querySelector("button[type='submit']") : null;

  if (!form || !statusText || !submitButton) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (typeof emailjs === "undefined") {
      statusText.textContent = "No se pudo cargar el servicio de correo. Intenta más tarde.";
      statusText.style.color = "red";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    statusText.textContent = "";

    emailjs
      .sendForm("service_f2t1jvt", "template_txbbnt5", form)
      .then(() => {
        statusText.textContent = "✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!";
        statusText.style.color = "green";
        form.reset();
      })
      .catch((error) => {
        console.error("❌ Error al enviar formulario:", error);
        statusText.textContent = "Hubo un error al enviar el mensaje. Intenta nuevamente.";
        statusText.style.color = "red";
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar";
      });
  });
}

// ===============================
// ✨ ANIMACIONES
// ===============================
function inicializarAnimaciones() {
  if (typeof ScrollReveal === "undefined") {
    console.warn("ScrollReveal no está cargado.");
    return;
  }

  const sr = ScrollReveal();

  sr.reveal(".hero-container", {
    delay: 300,
    distance: "40px",
    duration: 1000,
    origin: "bottom"
  });

  sr.reveal(".card", {
    interval: 150,
    distance: "40px",
    origin: "bottom",
    duration: 900
  });

  sr.reveal(".beneficios li", {
    interval: 100,
    distance: "20px",
    origin: "left",
    duration: 800
  });

  sr.reveal(".contacto form", {
    delay: 200,
    distance: "40px",
    origin: "bottom",
    duration: 1000
  });
}

// ===============================
// 🧭 SCROLL SUAVE DEL NAVBAR
// ===============================
function inicializarScrollSuave() {
  const enlaces = document.querySelectorAll(".nav a");
  const navbar = document.querySelector(".navbar");

  if (!enlaces.length || !navbar) return;

  enlaces.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const destinoId = this.getAttribute("href");

      if (!destinoId || !destinoId.startsWith("#")) return;

      const target = document.querySelector(destinoId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
}

// ===============================
// 🍔 MENÚ MÓVIL
// ===============================
function inicializarMenuMovil() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll("#nav-menu a");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    const clickDentroMenu = navMenu.contains(e.target);
    const clickEnBoton = menuToggle.contains(e.target);

    if (!clickDentroMenu && !clickEnBoton) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
}

// ===============================
// 💬 BOTÓN DE WHATSAPP
// ===============================
function inicializarBotonWhatsApp() {
  const whatsappButton = document.querySelector(".whatsapp-float");

  if (!whatsappButton) return;

  function actualizarVisibilidad() {
    if (window.scrollY > 200) {
      whatsappButton.style.opacity = "1";
      whatsappButton.style.pointerEvents = "auto";
    } else {
      whatsappButton.style.opacity = "0";
      whatsappButton.style.pointerEvents = "none";
    }
  }

  actualizarVisibilidad();
  window.addEventListener("scroll", actualizarVisibilidad);
}