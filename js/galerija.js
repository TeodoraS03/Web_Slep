const dugmadFilter = document.querySelectorAll(".filter-btn");
const stavke = document.querySelectorAll(".galerija-item");
const lightbox = document.getElementById("lightbox");
const lbSlika = document.getElementById("lbSlika");

let vidljive = [];   
let trenutna = 0;


function osveziVidljive() {
    vidljive = Array.from(stavke).filter(function (s) {
        return !s.classList.contains("sakriveno");
    });
}

dugmadFilter.forEach(function (dugme) {
    dugme.addEventListener("click", function () {
        dugmadFilter.forEach(function (d) { d.classList.remove("active"); });
        dugme.classList.add("active");

        const filter = dugme.dataset.filter;

        stavke.forEach(function (s) {
            const prikazi = filter === "sve" || s.dataset.kat === filter;
            s.classList.toggle("sakriveno", !prikazi);
        });

        osveziVidljive();
    });
});

osveziVidljive();


function prikaziSliku(indeks) {
    if (vidljive.length === 0) return;

    trenutna = (indeks + vidljive.length) % vidljive.length;
    const img = vidljive[trenutna].querySelector("img");

    lbSlika.src = img.src;
    lbSlika.alt = img.alt;
}

function otvori(indeks) {
    prikaziSliku(indeks);
    lightbox.classList.add("otvoren");
    document.body.style.overflow = "hidden";
}

function zatvori() {
    lightbox.classList.remove("otvoren");
    document.body.style.overflow = "";
}

stavke.forEach(function (stavka) {
    stavka.addEventListener("click", function () {
        otvori(vidljive.indexOf(stavka));
    });
});

document.getElementById("lbZatvori").addEventListener("click", zatvori);
document.getElementById("lbPrev").addEventListener("click", function (e) {
    e.stopPropagation();
    prikaziSliku(trenutna - 1);
});
document.getElementById("lbNext").addEventListener("click", function (e) {
    e.stopPropagation();
    prikaziSliku(trenutna + 1);
});

// klik na tamnu pozadinu zatvara
lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) zatvori();
});

// tastatura
document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("otvoren")) return;

    if (e.key === "Escape") zatvori();
    if (e.key === "ArrowLeft") prikaziSliku(trenutna - 1);
    if (e.key === "ArrowRight") prikaziSliku(trenutna + 1);
});