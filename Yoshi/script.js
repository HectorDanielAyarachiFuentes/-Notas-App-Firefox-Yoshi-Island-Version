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
        elements.dynamicTitle.innerHTML = `${CONFIG.appName} <small style="font-size: 0.8rem; vertical-align: middle; color: #3e2723; opacity: 0.6; -webkit-text-stroke: 0;">${CONFIG.version}</small>`;
    }
    
    // 2. Inyectar iconos SVG en los botones principales
    document.querySelector('#btn-save .btn-icon').innerHTML = `<svg class="yoshi-svg"><use href="#icon-cloud"></use></svg>`;
    document.querySelector('#btn-clear .btn-icon').innerHTML = `<svg class="yoshi-svg"><use href="#icon-duster"></use></svg>`;
    document.querySelector('#btn-ia .btn-icon').innerHTML = `<svg class="yoshi-svg"><use href="#icon-brain"></use></svg>`;

    // 3. Iconos de herramientas superiores
    document.querySelector('.btn-heart').innerHTML = `<svg class="yoshi-svg small-svg"><use href="#icon-heart"></use></svg>`;
    document.querySelector('.btn-layout').innerHTML = `<svg class="yoshi-svg small-svg"><use href="#icon-layout"></use></svg>`;
    document.querySelector('.btn-settings').innerHTML = `<svg class="yoshi-svg small-svg"><use href="#icon-settings"></use></svg>`;

    // 4. Iconos de navegación lateral
    document.querySelector('#nav-new .nav-icon-container').innerHTML = `<svg class="yoshi-svg"><use href="#icon-pencil-draw"></use></svg>`;
    document.querySelector('#nav-list .nav-icon-container').innerHTML = `<svg class="yoshi-svg"><use href="#icon-file-draw"></use></svg>`;
    document.querySelector('#nav-profile .nav-icon-container').innerHTML = `<svg class="yoshi-svg"><use href="#icon-yoshi-profile"></use></svg>`;

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