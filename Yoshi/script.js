// --- Configuración Dinámica de Textos e Iconos (Yoshi Edition v2.1 Pro) ---
const CONFIG = {
    appName: "Notas app",
    version: "v2.1 Pro",
    placeholders: {
        title: "Título cautivador...",
        body: "Escribe algo increíble aquí..."
    },
    labels: {
        btnGuardar: "Guardar nota",
        btnLimpiar: "Limpiar",
        btnIA: "OCR",
        menuNueva: "Nueva",
        menuVer: "Notas",
        menuPerfil: "Perfil",
        modalTitle: "Mis Notas Guardadas",
        noNotes: "¡No hay misiones guardadas!"
    }
};

/**
 * Función encargada de vestir el esqueleto HTML con los textos e iconos
 */
function initApp() {
    // 1. Inyectar título y versión
    if (elements.dynamicTitle) {
        elements.dynamicTitle.textContent = CONFIG.appName + " ";
        const small = document.createElement('small');
        small.style.fontSize = "0.8rem";
        small.style.verticalAlign = "middle";
        small.style.color = "#3e2723";
        small.style.opacity = "0.6";
        small.style.webkitTextStroke = "0";
        small.textContent = CONFIG.version;
        elements.dynamicTitle.appendChild(small);
    }
    
    const setSVG = (selector, iconId, className = "yoshi-svg") => {
        const el = document.querySelector(selector);
        if (!el) return;
        el.textContent = ''; // Clear
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", className);
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${iconId}`);
        // Support for modern browsers that don't need xlink
        use.setAttribute("href", `#${iconId}`);
        svg.appendChild(use);
        el.appendChild(svg);
    };

    // 2. Inyectar iconos SVG en los botones principales
    setSVG('#btn-save .btn-icon', 'icon-cloud');
    setSVG('#btn-clear .btn-icon', 'icon-duster');
    setSVG('#btn-ia .btn-icon', 'icon-brain');

    // 3. Iconos de herramientas superiores
    setSVG('.btn-heart', 'icon-heart', 'yoshi-svg small-svg');
    setSVG('.btn-layout', 'icon-layout', 'yoshi-svg small-svg');
    setSVG('.btn-settings', 'icon-settings', 'yoshi-svg small-svg');

    // 4. Iconos de navegación lateral
    setSVG('#nav-new .nav-icon-container', 'icon-pencil-draw');
    setSVG('#nav-list .nav-icon-container', 'icon-file-draw');
    setSVG('#nav-profile .nav-icon-container', 'icon-yoshi-profile');

    // 5. Placeholders e Inyección de etiquetas de texto
    elements.titleInput.placeholder = CONFIG.placeholders.title;
    elements.bodyInput.placeholder = CONFIG.placeholders.body;
    
    elements.labelGuardar.textContent = CONFIG.labels.btnGuardar;
    elements.labelLimpiar.textContent = CONFIG.labels.btnLimpiar;
    elements.labelIA.textContent = CONFIG.labels.btnIA;
    
    elements.labelNueva.textContent = CONFIG.labels.menuNueva;
    elements.labelVer.textContent = CONFIG.labels.menuVer;
    
    const labelUser = document.querySelector('.dynamic-menu-item-user-label');
    if (labelUser) labelUser.textContent = CONFIG.labels.menuPerfil;
    
    // Modal
    elements.modalHeading.textContent = CONFIG.labels.modalTitle;
    
    // Inicializar contador de notas
    if (typeof updateCounter === "function") updateCounter();
}

// Iniciar aplicación cuando todo esté cargado
document.addEventListener('DOMContentLoaded', initApp);