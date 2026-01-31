/* ==========================================================================
   GESTIÓN DE COOKIES Y ANALYTICS (GLOBAL)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("btn-accept");
    const denyBtn = document.getElementById("btn-deny");
    const resetBtn = document.getElementById("reset-consent");
   // Actualizar año automáticamente
document.getElementById("year").textContent = new Date().getFullYear();

    // 1. Lógica del Banner de Cookies (si existe en la página)
    if (banner) {
        if (!localStorage.getItem("cookieConsent")) {
            setTimeout(() => {
                banner.style.display = "block";
                // Pequeña animación si el CSS lo soporta
                banner.classList.add("fade-in-up");
            }, 1000);
        } else if (localStorage.getItem("cookieConsent") === "accepted") {
            loadAnalytics();
        }

        if (acceptBtn) {
            acceptBtn.addEventListener("click", () => {
                localStorage.setItem("cookieConsent", "accepted");
                banner.style.display = "none";
                loadAnalytics();
            });
        }

        if (denyBtn) {
            denyBtn.addEventListener("click", () => {
                localStorage.setItem("cookieConsent", "denied");
                banner.style.display = "none";
            });
        }
    } else {
        // Si no hay banner (ej. páginas internas donde ya se aceptó), revisamos si cargar analytics
        if (localStorage.getItem("cookieConsent") === "accepted") {
            loadAnalytics();
        }
    }

    // 2. Lógica para el botón de "Revocar Cookies" (Página Legal)
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            localStorage.removeItem('cookieConsent');
            alert('Configuración borrada. La próxima vez que visites una página, verás el banner de nuevo.');
            location.reload();
        });
    }
});

// Función Global para cargar Analytics
function loadAnalytics() {
    // Evitar cargar doble
    if (window.analyticsLoaded) return;
    
    // Código de Google Tag (G-DV59EN0VJ3)
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-DV59EN0VJ3";
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-DV59EN0VJ3');
    `;
    document.head.appendChild(script2);
    
    window.analyticsLoaded = true;
    console.log("Google Analytics cargado 🚀");
}
