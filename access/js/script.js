let steenDx = 210;
let steenDy = 50;
let steenDz = 100;
let voegDx = 10;
let voegDy = 10;
let muurDx = 500;
let muurDy = 300;
let schaal_slider = 1.49;
let zero_check = 0;
let brickImage_ONLY_onload = 0;
let RST = 0;
const brickImage = new Image();
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
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
                if (RST == 1) {//Als Random Steen Texture aan staat doe...
                    for (let $1 = 0; $1 <= 30; $1++) {
                        ctx.drawImage(brickImage, 10 + xpos, 10 + ypos, steenDx, steenDy);
                        random_steen_texture();
                    }
                }
                else {
                    ctx.drawImage(brickImage, 10 + xpos, 10 + ypos, steenDx, steenDy);
                }
            }
        }
    }
}
brickImage.onload = () => {//Hier wordt getekend waneer de brickImage ready is om een img te printen.
    switch (brickImage_ONLY_onload) {
        case 0:
            teken();
        break;
    }
}
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
function zet_schaal_micro() {//Schaal balk voor micro veranderingen qua zoom.
    schaal_slider = document.getElementById("$schaal_m").value / 10000;
    zet_schaal();
}
function zet_schaal_normaal() {//Schaal balk voor normale veranderingen qua zoom.
    schaal_slider = document.getElementById("$schaal_n").value / 1000;
    zet_schaal();
}
function zet_schaal() {//Zet schaal op origin als zero check waar is, anders schaal laten zijn wat het was.
    cv_cls();
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Als zero check niet is doe dan...
        teken();
    }
    else {//Als zero check waar is doe dan...
        schaal_slider = 1.49;
        teken();
    }
}
function random_steen_texture() {//Random Steen Texture Functie.
    brickImage_ONLY_onload = 1;
    var random_steen_texture = Math.floor(Math.random() * 3) + 1;
    if (steenDx = 210) {//Random steen texture voor Waalformaat.
        console.log(random_steen_texture);
        switch (random_steen_texture) {
            case 1:
                brickImage.src = 'access/media/img/waalformaat-steen-1.png';
            break;
            case 2:
                brickImage.src = 'access/media/img/waalformaat-steen-2.png';
            break;
            case 3:
                brickImage.src = 'access/media/img/waalformaat-steen-3.png';
            break;
        }
    }
    else {
        if (steenDx = 215) {//Random steen texture voor Dikformaat.

        }
        else {
            if (steenDx = 160) {//Random steen texture voor Ysselformaat.

            }
        }
    }
}
document.getElementById("$Random_steen_texture").addEventListener("change", () => {//Zet de Random stenen texture knop naar de STR waarde 0 of 1.
    let RST_number = document.getElementById("$Random_steen_texture").value;
    if (RST_number < 0) {//Als RST nummer kleiner is dan nul. Zet RST dan uit.
        document.getElementById("$Random_steen_texture").value = -10000;
        RST = 0;
    }
    else {
        if (RST_number > 0) {//Als RST nummer groter is dan nul. Zet RST dan aan.
            document.getElementById("$Random_steen_texture").value = 10000;
            RST = 1;
        }
        else {//Als RST nummer nul is, alert gebruiker 'Opnieuw proberen!'.
            window.alert("Error! Sleep nog eens.");
        }
    }
});
/*
---Aantekeningen---

Fix texture voor elke baksteen inc random optie. Kijk bij "random_steen_texture()".

*/