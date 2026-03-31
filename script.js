document.addEventListener('DOMContentLoaded', () => {

    // --- Script pour les modales "OTHER SKILLS" et "SOFT SKILLS" ---
    const otherSkillsLink = document.getElementById('toggle-other-skills');
    const otherSkillsModal = document.getElementById('other-skills-modal');
    
    const softSkillsLink = document.getElementById('toggle-soft-skills');
    const softSkillsModal = document.getElementById('soft-skills-modal');
    
    const closeAllModals = () => {
        otherSkillsModal.style.display = 'none';
        softSkillsModal.style.display = 'none';
    };

    const openModal = (modalElement) => {
        closeAllModals(); // Ferme les autres modales avant d'ouvrir la nouvelle
        modalElement.style.display = 'block';
    };

    if (otherSkillsLink && otherSkillsModal) {
        otherSkillsLink.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(otherSkillsModal);
        });
    }

    if (softSkillsLink && softSkillsModal) {
        softSkillsLink.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(softSkillsModal);
        });
    }

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


    // --- Script pour l'envoi du formulaire de contact (AJOUTÉ) ---
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
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.style.display = 'none';
                    formStatus.textContent = "Your message has been sent successfully! Thank you.";
                    formStatus.classList.remove('hidden');
                    formStatus.classList.add('success-message');
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = "Oops! There was a problem submitting your form. Please try again later.";
                        }
                    });
                }
            } catch (error) {
                formStatus.textContent = "Oops! An error occurred. Please check your internet connection and try again.";
            }
        });
    }

});