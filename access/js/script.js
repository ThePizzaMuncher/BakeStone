let steenDx = 210;
let steenDy = 50;
let steenDz = 100;
let voegDx = 10;
let voegDy = 10;
let muurDx = 500;
let muurDy = 300;
let schaalSlider = 5.6;
let zeroCheck = 0;
let brickImage_ONLY_onload = 0;
let knopPress = 0;
let stoneCount = 0;
let stoneCountHalf = 0;
let steenVerband = 0;
let rijY = 0;
let rijX = 0;
let steensoortHalf_maat = 0;
let steen_plek_x = 0;
let steen_plek_y = 0;
let steen_plekHalf_status = 0;
let ArrHalfsteen = [];
let steensoort = "waalformaat";
let brickImage = new Image();
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
function teken() {//Algemene teken functie.
    stoneCount = 0; //Aantal stenen wordt gereset.
    stoneCountHalf = 0; //Aantal halve stenen worden gereset.
    rijY = 0; //Rij y wordt gereset.
    rij_x = 0; //Rij x wordt gereset.
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
        var ctx = canvas.getContext("2d");
        ctx.scale(schaalSlider, schaalSlider);
        ctx.strokeStyle = 'red';
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
            ++rij_x;
        }
        for (let ypos = 0; ypos < muurDy; ypos += lagenMaat) {//Voor de y-as var && lagenMaat doe...
            ++rijY;
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
                ++stoneCount;
                if (steenVerband == 1) {//Als steenVerband half-steen is doe dan...
                    if (voegDx <= 0) {voegDx = 10;}
                    if (rijY % 2 == 0 ) {//Om en om functie voor y-as.
                        ctx.drawImage(brickImage, xpos, ypos, (steenDx / 2), steenDy);
                        xpos += (steenDx / 2) + voegDx;
                        stoneCountHalf += 0.5;
                        steen_plekHalf_status = 1;
                    }
                    for (; xpos < muurDx; xpos += (steenDx - - voegDx)) {
                            ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);
                            console.log(xpos, ypos);
                            ++stoneCountHalf;
                    }
                    if (rijY % 2 == 0 && muurDx >= (muurDx / steenDx)) {//Halve steen aan het einde van de muur.
                        if (steensoort == "waalformaat") {
                            steensoortHalf_maat = 2.21;
                        }
                        else {
                            if (steensoort == "dikformaat") {
                                steensoortHalf_maat = 2.24;
                            }
                            else {
                                if (steensoort == "ysselformaat") {
                                    steensoortHalf_maat = 2.27;
                                }
                            }
                        }
                        ctx.drawImage(brickImage, xpos, ypos, (steenDx / steensoortHalf_maat), steenDy);
                        xpos += (steenDx / 2) + voegDx;
                        stoneCountHalf += 0.5;
                    }
                    else {
                        if (rijY % 2 != 0 && muurDx >= (muurDx / steenDx)) {
                            if (steensoort == "waalformaat") {
                                steensoortHalf_maat = 2;
                            }
                            else {
                                if (steensoort == "dikformaat") {
                                    steensoortHalf_maat = 2.24;
                                }
                                else {
                                    if (steensoort == "ysselformaat") {
                                        steensoortHalf_maat = 2.27;
                                    }
                                }
                            }
                            ctx.drawImage(brickImage, xpos, ypos, (steenDx / steensoortHalf_maat), steenDy);
                            xpos += (steenDx / 2) + voegDx;
                            stoneCountHalf += 0.5;
                        }
                    }
                }
                else {//Als steenVerband tegel is doe dan...
                    if (knopPress == 1) {
                            setTimeout(() => {ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);}, 50);
                    }
                    else {
                        ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);
                    }
                }
            }
        }
    }
    if (steenVerband == 1) {
        document.getElementById("$stoneCount").innerHTML = stoneCountHalf;
    }
    else {
        document.getElementById("$stoneCount").innerHTML = stoneCount;
    }
}
brickImage.onload = () => {//Hier wordt getekend waneer de brickImage ready is om een img te printen.
    switch (brickImage_ONLY_onload) {
        case 0:
            teken();
        break;
    }
    brickImage_ONLY_onload = 1;
}
function BGDD_website() {//Doorverwijzing naar BGDD website.
    window.open("https://BGDD.nl/", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener. (Waalformaat baksteen)
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {//Zero check.
        knopPress = 1;
        steensoort = "waalformaat";
        cv_cls();
        brickImage.src = 'access/media/img/waalformaat-steen-1.png';
        steenDx = 210;
        steenDy = 50;
        voegDx = 10;
        voegDy = 10;
        teken();
    }
});
document.getElementById("#stone2").addEventListener("click", () => {//Knop steen 2 listener. (Dikformaat baksteen)
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {//Zero check.
        knopPress = 1;
        steensoort = "dikformaat";
        cv_cls();
        brickImage.src = 'access/media/img/dikformaat-steen-1.png';
        steenDx = 215;
        steenDy = 101;
        voegDx = 12;
        teken();
    }
});
document.getElementById("#stone3").addEventListener("click", () => {//Knop steen 3 listener. (Ysselformaat baksteen)
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {//Zero check.
        knopPress = 1;
        steensoort = "ysselformaat";
        cv_cls();
        brickImage.src = 'access/media/img/ysselformaat-steen-1.png';
        steenDx = 160;
        steenDy = 78;
        voegDx = -15.5;
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
        zeroCheck = 1;
    }
    else {
        if (muurDx < 1) {//Als x-as kleiner is dan 0, doe dan...
            window.alert("Voer een groter getal in voor de breedte.");
            muurDx = 500;
            muurDy = 300;
            zeroCheck = 1;
        }
        else {
            zeroCheck = 0;
        }
    }
}
function zet_schaal_micro() {//Schaal balk voor micro veranderingen qua zoom.
    knopPress = 0;
    schaalSlider = document.getElementById("$schaal_m").value / 10000;
    zet_schaal();
}
function zet_schaal_normaal() {//Schaal balk voor normale veranderingen qua zoom.
    knopPress = 0;
    schaalSlider = document.getElementById("$schaal_n").value / 1000;
    zet_schaal();
}
function zet_schaal() {//Zet schaal op origin als zero check waar is, anders schaal laten zijn wat het was.
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {//Als zero check niet is doe dan...
        teken();
    }
    else {//Als zero check waar is doe dan...
        schaalSlider = 1.49;
        teken();
    }
}
function half_steen_verband() {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {
        cv_cls();
        steenVerband = 1;
        knopPress = 1;
        document.getElementById("$halfsteen").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
        document.getElementById("$tegel").style.backgroundColor = "rgb(0, 15, 186)";
        teken();
    }
}
function tegel_verband() {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {
        cv_cls();
        steenVerband = 2;
        knopPress = 1;
        document.getElementById("$halfsteen").style.backgroundColor = "rgb(0, 15, 186)";
        document.getElementById("$tegel").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
        teken();
    }
}
document.getElementById("$hoogte").addEventListener("change", () => {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {
        cv_cls();
        teken();
    }
});
document.getElementById("$breedte").addEventListener("change", () => {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {
        cv_cls();
        teken();
    }
});
function get_voeg_B_en_H() {
    if (steensoort == "waalformaat") {
        voegDx = Number(document.getElementById("$voeg_b").value);
        voegDy = Number(document.getElementById("$voeg_h").value);
    }
    else {
        if (steensoort == "dikformaat") {
            voegDx = Number(document.getElementById("$voeg_b").value);
            voegDy = Number(document.getElementById("$voeg_h").value);
        }
        else {
            if (steensoort == "ysselformaat") {
                voegDx = Number(document.getElementById("$voeg_b").value);
                voegDy = Number(document.getElementById("$voeg_h").value);
            }
            else {
                window.alert("Kies eerst een steen soort!");
                //een reset voor het getal in de input.
                document.getElementById("$voeg_h").value = 10;
                document.getElementById("$voeg_b").value = 10;
            }
        }
    }
    cv_cls();
    teken();
}
function stone_bijter() {
    rijY = 0;
    rij_x = 0;
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
            ++rij_x;
        }
        for (let ypos = 0; ypos < muurDy; ypos += lagenMaat) {
            ++rijY;
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {
                console.log("xpos: " + xpos + ", ypos: " + ypos + ".");
                steen_plek_x = xpos;
                ArrHalfsteen.push({ "xPos": xpos, "yPos": ypos });
            }
        }
        ArrHalfsteen.sort()
        ctx.clearRect(steen_plek_x + steenDx + voegDx, 0, steenDx + 10, muurDy);
    }
}