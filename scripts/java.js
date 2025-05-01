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

// Functie om e-mail te valideren
function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
