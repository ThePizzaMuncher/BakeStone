let steenDx = 210;
let steenDy = 50;
let steenDz = 100;
let voegDx = 10;
let voegDy = 10;
let muurDx = 500;
let muurDy = 300;
let schaal_slider = 1.49;
let zero_check = 0;
function teken() {//Algemene teken functie.
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
        var ctx = canvas.getContext("2d");
        ctx.scale(schaal_slider, schaal_slider);
        ctx.strokeStyle = 'red';
        var koppenMaat = steenDz + voegDx;
        var lagenMaat = steenDy + voegDy;
        for (let ypos = 0; ypos < muurDy; ypos += lagenMaat) {//Voor de y-as var & lagenMaat doe...
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {//Voor de x-as var & koppenMaat doe...
            ctx.strokeRect(10 + xpos, 10 + ypos, steenDx, steenDy);
            }
        }
    }
}
teken();//Hier wordt getekend bij het laden van de pagina.
function BGDD_website() {//Doorverwijzing naar BGDD website.
    window.open("https://BGDD.nl/", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener. (Waalformaat baksteen)
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        steenDx = 210;
        steenDy = 50;
        voegDx = 10;
        teken();
    }
    else {
        teken();
    }
});
document.getElementById("#stone2").addEventListener("click", () => {//Knop steen 2 listener. (Dikformaat baksteen)
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        steenDx = 215;
        steenDy = 101;
        voegDx = 12;
        teken();
    }
    else {
        teken();
    }
});
document.getElementById("#stone3").addEventListener("click", () => {//Knop steen 3 listener. (Ysselformaat baksteen)
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        steenDx = 160;
        steenDy = 78;
        voegDx = -15.5;
        teken();
    }
    else {
        teken();
    }
});
function cv_cls() {//Cls voor canvas.
    canvas.width = canvas.width;
}
function get_B_en_H() {//Stel hoogte en breedte in, in canvas.
    muurDx = document.getElementById("$breedte").value;
    muurDy = document.getElementById("$hoogte").value;
}
function muur_B_en_H_check() {//Kijk als hoogte en breedte groter is dan 0.
    if (muurDy < 1) {//Als y-as kleiner is dan 0, doe dan...
        window.alert("Voer een groter getal in voor de hoogte.");
        muurDx = 500;
        muurDy = 300;
        zero_check = 1;
    }
    else {
        if (muurDx < 1) {//Als x-as kleiner is dan 0, doe dan...
            window.alert("Voer een groter getal in voor de breedte.");
            muurDx = 500;
            muurDy = 300;
            zero_check = 1;
        }
        else {
            zero_check = 0;
        }
    }
}
function zet_schaal_micro() {
    schaal_slider = document.getElementById("$schaal_m").value / 10000;
    zet_schaal();
}
function zet_schaal_normaal() {
    schaal_slider = document.getElementById("$schaal_n").value / 1000;
    zet_schaal();
}
function zet_schaal() {
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        teken();
    }
    else {
        schaal_slider = 1.49;
        teken();
    }
}