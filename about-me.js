document.addEventListener('DOMContentLoaded', () => {
    // Récupération des éléments pour le CV
    const cvButton = document.getElementById('toggle-cv');
    const cvModal = document.getElementById('cv-modal');

    // Récupération des éléments pour la lettre de motivation
    const coverLetterButton = document.getElementById('toggle-cover-letter');
    const coverLetterModal = document.getElementById('cover-letter-modal');

    // Récupération des éléments pour les expériences (Hôtesse)
    const experiencesButton = document.getElementById('toggle-experiences');
    const experiencesModal = document.getElementById('experiences-modal');

    // NOUVEAU : Récupération des éléments pour les certificats
    const certificatesButton = document.getElementById('toggle-certificates');
    const certificatesModal = document.getElementById('certificates-modal');

    // Fonction pour fermer toutes les modales
    const closeAllModals = () => {
        if (cvModal) cvModal.style.display = 'none';
        if (coverLetterModal) coverLetterModal.style.display = 'none';
        if (experiencesModal) experiencesModal.style.display = 'none';
        if (certificatesModal) certificatesModal.style.display = 'none';
    };

    // Fonction pour ouvrir une modale spécifique
    const openModal = (modalElement) => {
        if (modalElement) {
            closeAllModals(); // Ferme les autres modales
            modalElement.style.display = 'block';
        }
    };

    // Événement pour ouvrir la modale du CV
    if (cvButton && cvModal) {
        cvButton.addEventListener('click', () => {
            openModal(cvModal);
        });
    }

    // Événement pour ouvrir la modale de la lettre de motivation
    if (coverLetterButton && coverLetterModal) {
        coverLetterButton.addEventListener('click', () => {
            openModal(coverLetterModal);
        });
    }

    // Événement pour ouvrir la modale des expériences
    if (experiencesButton && experiencesModal) {
        experiencesButton.addEventListener('click', () => {
            openModal(experiencesModal);
        });
    }

    // NOUVEAU : Événement pour ouvrir la modale des certificats
    if (certificatesButton && certificatesModal) {
        certificatesButton.addEventListener('click', () => {
            openModal(certificatesModal);
        });
    }

    // Fermeture des modales par le bouton "X" ou par un clic en dehors
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
});