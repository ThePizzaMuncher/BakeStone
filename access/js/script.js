function teken() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        var steenDx = 210;
        var steenDy = 50;
        var steenDz = 100;
        var voegDx = 10;
        var voegDy = 10;
        var muurDx = 3000;
        var muurDy = 2000;
        var koppenMaat = steenDz + voegDx;
        var lagenMaat = steenDy + voegDy;
        for (let ypos = 0; ypos < muurDy; ypos += lagenMaat) {
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {
                ctx.strokeRect(10 + xpos, 10 + ypos, steenDx, steenDy);
            }
        }
    }
}
function BGDD_website() {
    window.open("https://bgdd.nl", '_blank');
}