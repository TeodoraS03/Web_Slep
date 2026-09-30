const EKSTENZIJE = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];

function nadjiSliku(ime, callback, i = 0) {
    if (i >= EKSTENZIJE.length) {
        console.error("Nije pronađena slika za: " + ime + " u folderu img/");
        callback(null);
        return;
    }

    const putanja = "img/" + ime + "." + EKSTENZIJE[i];
    const probna = new Image();

    probna.onload = function () {
        callback(putanja);
    };
    probna.onerror = function () {
        nadjiSliku(ime, callback, i + 1);
    };
    probna.src = putanja;
}

document.querySelectorAll(".service-box").forEach(function (box) {
    const ime = box.dataset.slika;
    let slika = null;

    nadjiSliku(ime, function (putanja) {
        slika = putanja;
    });

    box.addEventListener("mouseenter", function () {
        if (slika) {
            box.style.backgroundImage = "url('" + slika + "')";
        }
    });

    box.addEventListener("mouseleave", function () {
        box.style.backgroundImage = "none";
    });
});