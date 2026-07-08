document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 🌍 GESTION DE LA LANGUE (AVEC MÉMOIRE)
    // ==========================================
    const langModal = document.getElementById("language-modal");
    const btnFr = document.getElementById("btn-fr");
    const btnEn = document.getElementById("btn-en");

    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        const elementsToTranslate = document.querySelectorAll('[data-lang-fr]');
        elementsToTranslate.forEach(el => {
            if (lang === 'fr') {
                el.innerHTML = el.getAttribute('data-lang-fr');
            } else {
                el.innerHTML = el.getAttribute('data-lang-en');
            }
        });
        localStorage.setItem('portfolio-lang', lang);
        if (langModal) langModal.style.display = "none";
    }

    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang) {
        applyLanguage(savedLang);
    } else if (langModal) {
        langModal.style.display = "flex";
    }

    if (btnFr) btnFr.addEventListener("click", () => applyLanguage("fr"));
    if (btnEn) btnEn.addEventListener("click", () => applyLanguage("en"));


    // ==========================================
    // 📂 GESTION GÉNÉRALE DES MODALES
    // ==========================================
    
    // Fonction pour fermer TOUTES les modales existantes
    const closeAllModals = () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto'; // Réactive le scroll
    };

    // Fonction pour ouvrir une modale spécifique
    const openModal = (modalId) => {
        const modalElement = document.getElementById(modalId);
        
        // --- LOGIQUE DYNAMIQUE POUR LE CV ---
        if (modalId === 'cv-modal' && modalElement) {
            const cvEmbed = modalElement.querySelector('embed');
            if (cvEmbed) {
                const currentLang = document.documentElement.lang || 'fr';
                cvEmbed.src = (currentLang === 'en') ? 'assets/CV_en_anglais.pdf' : 'assets/CV_Favre_Emma.pdf';
            }
        }

        if (modalElement) {
            closeAllModals();
            modalElement.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Bloque le scroll
        }
    };

    // Mapping des boutons vers leurs IDs de modales respectives
    const modalMap = [
        { btn: 'toggle-other-skills', modal: 'other-skills-modal' },
        { btn: 'toggle-soft-skills', modal: 'soft-skills-modal' },
        { btn: 'toggle-cv', modal: 'cv-modal' },
        { btn: 'toggle-certificates', modal: 'certificates-modal' },
        { btn: 'toggle-experiences', modal: 'experiences-modal' }
    ];

    modalMap.forEach(item => {
        const btn = document.getElementById(item.btn);
        if (btn) {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                openModal(item.modal);
            });
        }
    });

    // Fermeture par bouton X
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Fermeture par clic extérieur
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });


    // ==========================================
    // ✉️ FORMULAIRE DE CONTACT
    // ==========================================
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.style.display = 'none';
                    const currentLang = document.documentElement.lang || "en";
                    formStatus.textContent = (currentLang === "fr") ? "Votre message a été envoyé avec succès !" : "Message sent successfully!";
                    formStatus.classList.remove('hidden');
                } else {
                    formStatus.textContent = "Oops! Error.";
                }
            } catch (error) {
                formStatus.textContent = "Network error.";
            }
        });
    }
});