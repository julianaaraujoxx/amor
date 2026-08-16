// ==============================
// CONFIGURAÇÃO
// ==============================

// MUDE A SENHA AQUI
const correctPassword = "euteamo";


// ==============================
// LOGIN
// ==============================

function checkPassword() {

    const passwordInput = document.getElementById("password");

    const password = passwordInput.value;

    const errorMessage = document.getElementById("errorMessage");

    if (password === correctPassword) {

        document.getElementById("loginScreen").style.display = "none";

        document.getElementById("secretSite").style.display = "block";

        errorMessage.textContent = "";

        document.body.style.overflow = "auto";

        window.scrollTo(0, 0);

    } else {

        errorMessage.textContent = "Senha incorreta, meu amor... tente novamente.";

        passwordInput.value = "";

        passwordInput.focus();

    }
}


// ==============================
// ENTER NO TECLADO
// ==============================

document.getElementById("password").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        checkPassword();

    }

});


// ==============================
// BLOQUEAR SITE
// ==============================

function lockSite() {

    document.getElementById("secretSite").style.display = "none";

    document.getElementById("loginScreen").style.display = "flex";

    document.getElementById("password").value = "";

    window.scrollTo(0, 0);

}


// ==============================
// SCROLL DOS BOTÕES
// ==============================

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    section.scrollIntoView({
        behavior: "smooth"
    });

}


// ==============================
// ABRIR CARTA
// ==============================

function openLetter() {

    const modal = document.getElementById("letterModal");

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


// ==============================
// FECHAR CARTA
// ==============================

function closeLetter() {

    const modal = document.getElementById("letterModal");

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}


// ==============================
// FECHAR CLICANDO FORA
// ==============================

document.getElementById("letterModal").addEventListener("click", function(event) {

    if (event.target === this) {

        closeLetter();

    }

});