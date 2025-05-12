function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }


  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Voorkomt standaardformulierverzending

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let statusMessage = document.getElementById("statusMessage");

    if (name === "" || email === "" || message === "") {
        statusMessage.style.color = "red";
        statusMessage.textContent = "Vul alle velden in.";
        return;
    }

    if (!validateEmail(email)) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "Ongeldig e-mailadres.";
        return;
    }

    // Simulatie van een succesvolle verzending
    statusMessage.style.color = "green";
    statusMessage.textContent = "Bericht succesvol verzonden!";
    document.getElementById("contactForm").reset();
});



        document.addEventListener("DOMContentLoaded", () => {
            // Voeg 'about' toe aan de sectie-IDs
            const sectionIds = ["home", "about", "projects", "contact"];

            const scrollUpButton = document.getElementById("scroll-up");
            const scrollDownButton = document.getElementById("scroll-down");

            function smoothScrollTo(targetElement) {
                const targetPosition = targetElement.offsetTop;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 800; // korter voor snappier effect
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }

            // Navigation link scroll
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1); // <-- dit is de fix
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) smoothScrollTo(targetElement);
                });
            });

            // Section scroll arrows
            function getCurrentSectionIndex() {
                const scrollPosition = window.scrollY + window.innerHeight / 2;
                return sectionIds.findIndex(id => {
                    const section = document.getElementById(id);
                    if (!section) return false;
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
                });
            }

            scrollDownButton?.addEventListener("click", () => {
                const currentIndex = getCurrentSectionIndex();
                if (currentIndex < sectionIds.length - 1) {
                    const nextSection = document.getElementById(sectionIds[currentIndex + 1]);
                    if (nextSection) smoothScrollTo(nextSection);
                }
            });

            scrollUpButton?.addEventListener("click", () => {
                const currentIndex = getCurrentSectionIndex();
                if (currentIndex > 0) {
                    const prevSection = document.getElementById(sectionIds[currentIndex - 1]);
                    if (prevSection) smoothScrollTo(prevSection);
                }
            });
        });

        window.addEventListener('load', function () {
            const clipboard = FlowbiteInstances.getInstance('CopyClipboard', 'npm-install-copy-text');

            const $defaultMessage = document.getElementById('default-message');
            const $successMessage = document.getElementById('success-message');

            clipboard.updateOnCopyCallback((clipboard) => {
                showSuccess();

                // reset to default state
                setTimeout(() => {
                    resetToDefault();
                }, 2000);
            })

            const showSuccess = () => {
                $defaultMessage.classList.add('hidden');
                $successMessage.classList.remove('hidden');
            }

            const resetToDefault = () => {
                $defaultMessage.classList.remove('hidden');
                $successMessage.classList.add('hidden');
            }
        })



// Functie om e-mail te valideren
function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
