var steenDx = 210;
var steenDy = 50;
var steenDz = 100;
var voegDx = 10;
var voegDy = 10;
var muurDx = 500;
var muurDy = 300;
function teken() {//Algemene teken functie.
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'red';
        var koppenMaat = steenDz + voegDx;
        var lagenMaat = steenDy + voegDy;
        for (let ypos = 0; ypos < muurDy; ypos += lagenMaat) {
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {
            ctx.strokeRect(10 + xpos, 10 + ypos, steenDx, steenDy);
            }
        }
    }
}
teken();//Hier wordt getekend.
function BGDD_website() {//Doorverwijzing naar BGDD website.
    window.open("https://BGDD.nl/", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener. (Waalformaat baksteen)
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    steenDx = 210;
    steenDy = 50;
    voegDx = 10;
    teken();
});
document.getElementById("#stone2").addEventListener("click", () => {//Knop steen 2 listener. (Dikformaat baksteen)
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    steenDx = 215;
    steenDy = 101;
    voegDx = 12;
    teken();
});
document.getElementById("#stone3").addEventListener("click", () => {//Knop steen 3 listener. (Ysselformaat baksteen)
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    steenDx = 160;
    steenDy = 78;
    voegDx = -15.5;
    teken();
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
    }
    else {
        if (muurDx < 1) {//Als x-as kleiner is dan 0, doe dan...
            window.alert("Voer een groter getal in voor de breedte.");
            muurDx = 500;
            muurDy = 300;
        }
    }
}