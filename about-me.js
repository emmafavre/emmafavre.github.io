document.addEventListener('DOMContentLoaded', () => {
    console.log("Script.js correctement chargé et DOM prêt !");

    // Récupération des éléments pour le CV
    const cvButton = document.getElementById('toggle-cv');
    const cvModal = document.getElementById('cv-modal');

    // Récupération des éléments pour la lettre de motivation
    const coverLetterButton = document.getElementById('toggle-cover-letter');
    const coverLetterModal = document.getElementById('cover-letter-modal');

    // Récupération des éléments pour les expériences (Hôtesse)
    const experiencesButton = document.getElementById('toggle-experiences');
    const experiencesModal = document.getElementById('experiences-modal');

    // Récupération des éléments pour les certificats
    const certificatesButton = document.getElementById('toggle-certificates');
    const certificatesModal = document.getElementById('certificates-modal');

    // Fonction pour fermer toutes les modales
    const closeAllModals = () => {
        console.log("Fermeture de tous les modaux requise.");
        if (cvModal) cvModal.style.setProperty('display', 'none', 'important');
        if (coverLetterModal) coverLetterModal.style.setProperty('display', 'none', 'important');
        if (experiencesModal) experiencesModal.style.setProperty('display', 'none', 'important');
        if (certificatesModal) certificatesModal.style.setProperty('display', 'none', 'important');
        document.body.style.overflow = 'auto';
    };

    // Fonction pour ouvrir une modale spécifique
    const openModal = (modalElement, modalName) => {
        if (modalElement) {
            console.log("Ouverture du modal : " + modalName);
            closeAllModals(); // Sécurité
            modalElement.style.setProperty('display', 'block', 'important');
            document.body.style.overflow = 'hidden';
        } else {
            console.error("Erreur : Impossible d'ouvrir le modal " + modalName + " car l'élément HTML n'existe pas.");
        }
    };

    // Événement pour ouvrir la modale du CV
    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(cvModal, "CV");
        });
    } else { console.warn("Bouton #toggle-cv introuvable sur cette page."); }

    // Événement pour ouvrir la modale de la lettre de motivation
    if (coverLetterButton) {
        coverLetterButton.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(coverLetterModal, "Lettre de motivation");
        });
    } else { console.warn("Bouton #toggle-cover-letter introuvable sur cette page."); }

    // Événement pour ouvrir la modale des expériences
    if (experiencesButton) {
        experiencesButton.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(experiencesModal, "Expériences");
        });
    } else { console.warn("Bouton #toggle-experiences introuvable sur cette page."); }

    // Événement pour ouvrir la modale des certificats
    if (certificatesButton) {
        certificatesButton.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(certificatesModal, "Certificats");
        });
    } else { console.warn("Bouton #toggle-certificates introuvable sur cette page."); }

    // Fermeture des modales par le bouton "X" (croix de fermeture)
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllModals();
        });
    });

    // Fermeture des modales en cliquant à l'extérieur de la boîte blanche
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
});