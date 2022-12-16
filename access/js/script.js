var steenDx = 210;
var steenDy = 50;
var steenDz = 100;
var voegDx = 10;
var voegDy = 10;
var muurDx = 500;
var muurDy = 300;
function teken() {//Algemene teken functie.
    //pre install functions.
    if (muurDx < 1 || muurDy < 1) {
        muurDx = 10000;
        muurDy = 10000;
    }
    //tekenaar.
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
teken();
function BGDD_website() {//Doorverwijzing naar BGDD website.
    window.open("https://BGDD.nl/", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {
    cv_cls();
    get_B_en_H();
    steenDx = 210;
    steenDy = 50;
    voegDx = 10;
    teken();
});
document.getElementById("#stone2").addEventListener("click", () => {//Knop steen 2 listener.
    cv_cls();
    get_B_en_H();
    steenDx = 215;
    steenDy = 101;
    voegDx = 12;
    teken();
});
document.getElementById("#stone3").addEventListener("click", () => {
    cv_cls();
    get_B_en_H();
    steenDx = 210;
    steenDy = 100;
    voegDx = 10;
    teken();
});
function cv_cls() {//Cls voor canvas.
    canvas.width = canvas.width;
}
function get_B_en_H() {
    let $breedte = document.getElementById("$breedte").value;
    let $hoogte = document.getElementById("$hoogte").value;
    muurDx = $breedte;
    muurDy = $hoogte;
}