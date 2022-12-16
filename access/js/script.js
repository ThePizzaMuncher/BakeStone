var steenDx = 210;
var steenDy = 50;
var steenDz = 100;
var voegDx = 10;
var voegDy = 10;
var muurDx = 700;
var muurDy = 2000;
function teken() {//Algemene teken functie
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'red';
        ctx.stroke();
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
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener.
    cv_cls();
    steenDx = 250;
    steenDy = 50;
    teken();
});
function cv_cls() {//Cls voor canvas.
    canvas.width = canvas.width;
}