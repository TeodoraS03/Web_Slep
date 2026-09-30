function pozovi() {
    alert("Pozovite nas na broj: 062/199-92-26");
}


const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

function jeTelefon() {
    return window.matchMedia("(max-width: 768px)").matches;
}

if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("open");
    });
}


document.querySelectorAll(".dropdown > a, .dropdown-sub > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
        if (jeTelefon()) {
            e.preventDefault();
            link.parentElement.classList.toggle("open");
        }
    });
});


const contactForm = document.getElementById("contactForm");
const formaPoruka = document.getElementById("formaPoruka");

function prikaziPoruku(tekst, tip) {
    formaPoruka.textContent = tekst;
    formaPoruka.className = "forma-poruka " + tip;
}

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const ime = document.getElementById("ime").value.trim();
        const email = document.getElementById("email").value.trim();
        const poruka = document.getElementById("poruka").value.trim();

        if (ime === "" || email === "" || poruka === "") {
            prikaziPoruku("Molimo popunite sva polja!", "greska");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            prikaziPoruku("Molimo unesite ispravan email!", "greska");
            return;
        }

        const dugme = contactForm.querySelector("button[type='submit']");
        dugme.disabled = true;
        dugme.textContent = "Šaljem...";

        try {
            const odgovor = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            });

            const podaci = await odgovor.json();

            if (odgovor.ok && podaci.success) {
                prikaziPoruku("Hvala na poruci, odgovorićemo vam uskoro!", "uspeh");
                contactForm.reset();
            } else {
                prikaziPoruku("Slanje nije uspelo. Pozovite nas na 062/199-92-26.", "greska");
            }
        } catch (greska) {
            prikaziPoruku("Nema veze sa internetom. Pozovite nas na 062/199-92-26.", "greska");
        }

        dugme.disabled = false;
        dugme.textContent = "Pošalji";
    });
}


const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

function showHeroSlides() {
    heroSlides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    heroIndex++;
    if (heroIndex > heroSlides.length) heroIndex = 1;

    heroSlides[heroIndex - 1].classList.add("active");
    setTimeout(showHeroSlides, 5000);
}

if (heroSlides.length > 0) {
    showHeroSlides();
}


document.querySelectorAll(".faq-pitanje").forEach(function (dugme) {
    dugme.setAttribute("aria-expanded", "false");

    dugme.addEventListener("click", function () {
        const stavka = dugme.parentElement;
        const odgovor = stavka.querySelector(".faq-odgovor");
        const bioOtvoren = stavka.classList.contains("open");

        
        document.querySelectorAll(".faq-item.open").forEach(function (otvorena) {
            otvorena.classList.remove("open");
            otvorena.querySelector(".faq-odgovor").style.maxHeight = null;
            otvorena.querySelector(".faq-pitanje").setAttribute("aria-expanded", "false");
        });

        
        if (!bioOtvoren) {
            stavka.classList.add("open");
            odgovor.style.maxHeight = odgovor.scrollHeight + "px";
            dugme.setAttribute("aria-expanded", "true");
        }
    });
});


const brojaci = document.querySelectorAll(".brojac-broj");

function animirajBroj(element) {
    const cilj = parseInt(element.dataset.target, 10);
    const sufiks = element.dataset.suffix || "";
    const trajanje = 2000; 
    const pocetak = performance.now();

    function korak(sada) {
        const napredak = Math.min((sada - pocetak) / trajanje, 1);
        const usporeno = 1 - Math.pow(1 - napredak, 3); 

        element.textContent = Math.floor(usporeno * cilj) + sufiks;

        if (napredak < 1) {
            requestAnimationFrame(korak);
        } else {
            element.textContent = cilj + sufiks;
        }
    }

    requestAnimationFrame(korak);
}

if (brojaci.length > 0) {
    if ("IntersectionObserver" in window) {
        const posmatrac = new IntersectionObserver(function (stavke) {
            stavke.forEach(function (stavka) {
                if (stavka.isIntersecting) {
                    animirajBroj(stavka.target);
                    posmatrac.unobserve(stavka.target); 
                }
            });
        }, { threshold: 0.5 });

        brojaci.forEach(function (broj) {
            posmatrac.observe(broj);
        });
    } else {

        brojaci.forEach(function (broj) {
            broj.textContent = broj.dataset.target + (broj.dataset.suffix || "");
        });
    }
}


const nazadNaVrh = document.createElement("button");
nazadNaVrh.className = "nazad-na-vrh";
nazadNaVrh.setAttribute("aria-label", "Nazad na vrh");
nazadNaVrh.textContent = "↑";
document.body.appendChild(nazadNaVrh);

window.addEventListener("scroll", function () {
    nazadNaVrh.classList.toggle("vidljivo", window.scrollY > 400);
});

nazadNaVrh.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});