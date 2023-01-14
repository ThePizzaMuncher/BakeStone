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
let steen_plekHalf_status = 0;
let testVar1 = 0;
let matenError = 0;
let variabele_aan_of_uit = 0;
let ArrHalfsteen = [];
let steensoort = "waalformaat";
let maxDeuren = 0;
let currentDeuren = 0;
let deurSoort = 0;
let raamSoort = 0;
let SPRHMIS = 5; //Sparingen Hoogte Maat In Stenen.
let SPRBMIS = 1; //Sparingen Breedte Maat In Stenen.
let werkelijkeBreedteMuur = 0;
let werkelijkeHoogteMuur = 0;
let brickImage = new Image();
let deurTexture = new Image();
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
function teken() {//Algemene teken functie.
    berekenen_steen_plek_x();
    stoneCount = 0; //Aantal stenen wordt gereset.
    stoneCountHalf = 0; //Aantal halve stenen worden gereset.
    rijY = 0; //Rij y wordt gereset.
    rijX = 0; //Rij x wordt gereset.
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
        var ctx = canvas.getContext("2d");
        ctx.scale(schaalSlider, schaalSlider);
        ctx.strokeStyle = 'red';
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
            ++rijX;
        }
        for (let yPos = 0; yPos < muurDy; yPos += lagenMaat) {//Voor de y-as var && lagenMaat doe...
            ++rijY;
            for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
                ++stoneCount;
                if (steenVerband == 1) {//Als steenVerband half-steen is doe dan...
                    if (voegDx <= 0) {voegDx = 10;}
                    if (rijY % 2 == 0) {//Om en om functie voor y-as.
                        ctx.drawImage(brickImage, xPos, yPos, (steenDx / 2), steenDy);
                        xPos += (steenDx / 2) + voegDx;
                        stoneCountHalf += 0.5; 
                        steen_plekHalf_status = 1;
                        if (rijX == steen_plek_x) {
                            ctx.drawImage(brickImage, (steen_plek_x * steenDx) - (steenDx / 2) - - voegDx, yPos, (steenDx / 2), steenDy);
                            console.log("werkt. De xPos is:" + 545 + ". De yPos is:" + yPos + ".");
                        }
                    }
                    for (; xPos < muurDx; xPos += (steenDx - - voegDx)) {
                        ctx.drawImage(brickImage, xPos, yPos, steenDx, steenDy);
                        console.log(xPos, yPos);
                        ++stoneCountHalf;
                    }
                }
                else {//Als steenVerband tegel is doe dan...
                    if (knopPress == 1) {
                            setTimeout(() => {ctx.drawImage(brickImage, xPos, yPos, steenDx, steenDy);}, 50);
                    }
                    else {
                        ctx.drawImage(brickImage, xPos, yPos, steenDx, steenDy);
                    }
                }
            }
        }
    }
    if (steenVerband == 1) {
        document.getElementById("$stone_count").innerHTML = stoneCountHalf;
    }
    else {
        document.getElementById("$stone_count").innerHTML = stoneCount;
    }
    if (deurTexture.src != '') {
        tekenSparing();
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
    SparingReset();
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
    SparingReset();
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
    SparingReset();
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
    if (matenError == 0) {
        if (muurDx > 500 || muurDy > 300) {
            window.alert("Tip: gebruik de zoom sliders rechts onder om de muur op het scherm te laten passen.")
            matenError = 1;
        }
    }
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
function berekenen_steen_plek_x() {
    steen_plek_x = 0;
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
            ++steen_plek_x;
        }
    }
}
document.getElementById("deur_1").addEventListener("click", () => {
    if (zeroCheck == 0 && currentDeuren < $maxDeuren() && SPRBMIS <= rijX) {
        deurSoort = 1;
        deurTexture.src = "access/media/img/deur_1.png"
        ++currentDeuren;
        tekenSparing();
    }
    else {
        window.alert("De muur is te smal voor een deur of voor nog een deur.")
    }
});
document.getElementById("deur_2").addEventListener("click", () => {
    deurSoort = 2;
});
document.getElementById("deur_3").addEventListener("click", () => {
    deurSoort = 3;
});
document.getElementById("raam_1").addEventListener("click", () => {
    raamSoort = 1;
});
document.getElementById("raam_2").addEventListener("click", () => {
    raamSoort = 2;
});
document.getElementById("raam_3").addEventListener("click", () => {
    raamSoort = 3;
});
function werkelijkeMuurAfmetingen() {
    werkelijkeBreedteMuur = ((steenDx * rijX) - - (rijX * voegDx - voegDx));
    werkelijkeHoogteMuur = ((steenDy * rijY) - - (rijY * voegDy - voegDy));
}
function $maxDeuren() {
    werkelijkeMuurAfmetingen();
    maxDeuren = Math.round((werkelijkeBreedteMuur / (steenDx * 2) / 3.5));
    return maxDeuren;
}
function SparingReset() {
    deurTexture.src = '';
    currentDeuren = 0;
}
function tekenSparing() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        ctx.drawImage(deurTexture, 0, (werkelijkeHoogteMuur - (steenDy * SPRHMIS) - (voegDy * (SPRHMIS - 1))), ((steenDx * SPRBMIS) - - (voegDx * (SPRBMIS - 1))), (steenDy * SPRHMIS) - - (voegDy * (SPRHMIS - 1)));
    }
}