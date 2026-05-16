// --- Gestión de Datos (LocalStorage) ---
let notes = JSON.parse(localStorage.getItem('yoshi_notes')) || [];

function saveToStorage() {
    localStorage.setItem('yoshi_notes', JSON.stringify(notes));
}

// Declaramos elements vacío para llenarlo al cargar
let elements = {};

function initLogic() {
    elements = {
        titleInput: document.getElementById('note-title'),
        bodyInput: document.getElementById('note-body'),
        btnSave: document.getElementById('btn-save'),
        btnClear: document.getElementById('btn-clear'),
        btnList: document.getElementById('nav-list'),
        btnNew: document.getElementById('nav-new'),
        btnSettings: document.querySelector('.btn-settings'),
        modal: document.getElementById('notes-list-modal'),
        closeModal: document.getElementById('close-modal'),
        modalSettings: document.getElementById('settings-modal'),
        closeSettings: document.getElementById('close-settings'),
        notesContainer: document.getElementById('notes-container'),
        pageIndicator: document.querySelector('.page-indicator'),
        
        dynamicTitle: document.querySelector('.dynamic-app-title'),
        labelGuardar: document.querySelector('.dynamic-btn-guardar-label'),
        labelLimpiar: document.querySelector('.dynamic-btn-limpiar-label'),
        labelIA: document.querySelector('.dynamic-btn-ocr-label'),
        labelNueva: document.querySelector('.dynamic-menu-item-nueva-label'),
        labelVer: document.querySelector('.dynamic-menu-item-perfil-label'),
        modalHeading: document.querySelector('.modal-header h2')
    };

    // --- Event Listeners ---
    if (elements.btnSave) elements.btnSave.addEventListener('click', saveNote);
    if (elements.btnClear) elements.btnClear.addEventListener('click', clearEditor);

    if (elements.btnList) {
        elements.btnList.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(true);
        });
    }

    if (elements.btnNew) {
        elements.btnNew.addEventListener('click', (e) => {
            e.preventDefault();
            clearEditor();
            toggleModal(false);
        });
    }

    if (elements.closeModal) elements.closeModal.addEventListener('click', () => toggleModal(false));
    
    if (elements.btnSettings) {
        elements.btnSettings.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSettings(true);
        });
    }

    if (elements.closeSettings) {
        elements.closeSettings.addEventListener('click', () => toggleSettings(false));
    }

    if (elements.modal) {
        elements.modal.addEventListener('click', (e) => {
            if (e.target === elements.modal) toggleModal(false);
        });
    }

    if (elements.modalSettings) {
        elements.modalSettings.addEventListener('click', (e) => {
            if (e.target === elements.modalSettings) toggleSettings(false);
        });
    }

    updateCounter();
}

function updateCounter() {
    if(elements.pageIndicator) elements.pageIndicator.textContent = notes.length;
}

function saveNote() {
    const title = elements.titleInput.value.trim();
    const body = elements.bodyInput.value.trim();

    if (!title || !body) {
        alert("¡Escribe algo antes de guardar!");
        return;
    }

    const newNote = {
        id: Date.now(),
        title,
        body,
        date: new Date().toLocaleDateString()
    };

    notes.unshift(newNote); 
    saveToStorage();
    updateCounter();
    clearEditor();
}

function clearEditor() {
    if (elements.titleInput) elements.titleInput.value = "";
    if (elements.bodyInput) elements.bodyInput.value = "";
}

function renderNotes() {
    elements.notesContainer.innerHTML = "";
    
    if (notes.length === 0) {
        elements.notesContainer.innerHTML = `<p style='grid-column: 1/-1; text-align: center;'>¡No hay misiones guardadas!</p>`;
        return;
    }

    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.body}</p>
            <small style="font-size: 0.7rem; color: #999;">${note.date}</small>
        `;
        card.onclick = () => loadNote(note);
        elements.notesContainer.appendChild(card);
    });
}

function loadNote(note) {
    elements.titleInput.value = note.title;
    elements.bodyInput.value = note.body;
    toggleModal(false);
}

function toggleModal(show) {
    if (show) {
        renderNotes();
        elements.modal.classList.remove('hidden');
    } else {
        elements.modal.classList.add('hidden');
    }
}

function toggleSettings(show) {
    if (show && elements.modalSettings) {
        elements.modalSettings.classList.remove('hidden');
    } else if (elements.modalSettings) {
        elements.modalSettings.classList.add('hidden');
    }
}

// Iniciar lógica
document.addEventListener('DOMContentLoaded', initLogic);
