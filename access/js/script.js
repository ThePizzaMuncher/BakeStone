const canvas = document.getElementById("canvas");
if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var steenDx = 210;
    var steenDy = 50;
    var steenDz = 100;
    var voegDx = 10;
    var voegDy = 10;
    var muurDx = 3000;
    var muurDy = 2000;
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
function BGDD_website() {
    window.open("https://BGDD.nl", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener.
    canvas.width = canvas.width;
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var steenDx = 215;
        var steenDy = 101;
        var steenDz = 65;
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
});