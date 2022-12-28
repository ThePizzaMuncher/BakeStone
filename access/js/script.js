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
let knop_press = 0;
let stone_count = 0;
let steenverband = 0;
let rij_y = 0;
let rij_x = 0;
let bg_color_for_p = "tegel_verband";
let brickImage = new Image();
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
function teken() {//Algemene teken functie.
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
        var ctx = canvas.getContext("2d");
        ctx.scale(schaal_slider, schaal_slider);
        ctx.strokeStyle = 'red';
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
            ++rij_x;
        }
        for (let ypos = 0; ypos < muurDy; ypos += lagenMaat) {//Voor de y-as var && lagenMaat doe...
            ++rij_y;
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
                ++stone_count;
                if (steenverband == 1 && knop_press == 1) {//Als steenverband half-steen is doe dan...
                    if (RST == 1) {random_steen_texture();}
                    if (voegDx <= 0) {voegDx = 10;}
                    if (rij_y % 2 == 0 ) {//Om en om functie voor y-as.
                        ctx.drawImage(brickImage, xpos, ypos, (steenDx / 2), steenDy);
                        xpos += (steenDx / 2) + voegDx;
                    }
                    for (; xpos < muurDx; xpos += (steenDx - - voegDx)) {
                        ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);
                        console.log(xpos, ypos);
                    }
                }
                if (RST == 1) {//Als Random Steen Texture aan staat doe...
                    for (let $1 = 0; $1 <= 50; $1++) {
                        random_steen_texture();
                        if (knop_press == 1) {//Als de gebruiker eerst op een knop heeft gedrukt doe dan...
                            setTimeout(() => {ctx.drawImage(brickImage, 10 + xpos, 10 + ypos, steenDx, steenDy);}, 50);
                        }
                        else {//Als de gebruiker niet op een knop heeft gedrukt doe dan...
                            ctx.drawImage(brickImage, 10 + xpos, 10 + ypos, steenDx, steenDy);
                        }
                    }
                }
                else {//Als Random Steen Texture uit staat doe dan...
                    if (knop_press == 1) {
                        setTimeout(() => {ctx.drawImage(brickImage, 10 + xpos, 10 + ypos, steenDx, steenDy);}, 50);
                    }
                    else {
                        ctx.drawImage(brickImage, 10 + xpos, 10 + ypos, steenDx, steenDy);
                    }
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
    brickImage_ONLY_onload = 1;
}
function BGDD_website() {//Doorverwijzing naar BGDD website.
    window.open("https://BGDD.nl/", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener. (Waalformaat baksteen)
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        knop_press = 1;
        cv_cls();
        if (RST == 0) {brickImage.src = 'access/media/img/waalformaat-steen-1.png';}
        steenDx = 210;
        steenDy = 50;
        voegDx = 10;
        teken();
    }
});
document.getElementById("#stone2").addEventListener("click", () => {//Knop steen 2 listener. (Dikformaat baksteen)
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        knop_press = 1;
        cv_cls();
        if (RST == 0) {brickImage.src = 'access/media/img/dikformaat-steen-1.png';}
        steenDx = 215;
        steenDy = 101;
        voegDx = 12;
        teken();
    }
});
document.getElementById("#stone3").addEventListener("click", () => {//Knop steen 3 listener. (Ysselformaat baksteen)
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {//Zero check.
        knop_press = 1;
        cv_cls();
        if (RST == 0) {brickImage.src = 'access/media/img/ysselformaat-steen-1.png';}
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
    knop_press = 0;
    schaal_slider = document.getElementById("$schaal_m").value / 10000;
    zet_schaal();
}
function zet_schaal_normaal() {//Schaal balk voor normale veranderingen qua zoom.
    knop_press = 0;
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
    knop_press = 0;
    brickImage_ONLY_onload = 1;
    var random_steen_texture = Math.floor(Math.random() * 3) + 1;
    if (steenDx == 210) {//Random steen texture voor Waalformaat.
        console.log("Waalformaat");
        switch (random_steen_texture) {
            case 1:
                brickImage.src = 'access/media/img/waalformaat-steen-1.png';
            break;
            case 2:
                brickImage.src = 'access/media/img/waalformaat-steen-2.png';
            break;
            case 3:
                brickImage.src = 'access/media/img/waalformaat-steen-3.png';
            default:
                brickImage.src = 'access/media/img/waalformaat-steen-3.png';
        }
    }
    else {
        if (steenDx == 215) {//Random steen texture voor Dikformaat.
            console.log("Dikformaat");
            switch (random_steen_texture) {
                case 1:
                    brickImage.src = 'access/media/img/dikformaat-steen-1.png';
                break;
                case 2:
                    brickImage.src = 'access/media/img/dikformaat-steen-2.png';
                break;
                case 3:
                    brickImage.src = 'access/media/img/dikformaat-steen-3.png';
                break;
                default:
                    brickImage.src = 'access/media/img/waalformaat-steen-3.png';
            }
        }
        else {
            if (steenDx = 160) {//Random steen texture voor Ysselformaat.
                console.log("Ysselformaat");
                switch (random_steen_texture) {
                    case 1:
                        brickImage.src = 'access/media/img/ysselformaat-steen-1.png';
                    break;
                    case 2:
                        brickImage.src = 'access/media/img/ysselformaat-steen-2.png';
                    break;
                    case 3:
                        brickImage.src = 'access/media/img/ysselkformaat-steen-3.png';
                    break;
                    default:
                        brickImage.src = 'access/media/img/ysselformaat-steen-3.png';
                }
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
function half_steen_verband() {
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {
        cv_cls();
        steenverband = 1;
        knop_press = 1;
        document.getElementById("$halfsteen").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
        document.getElementById("$tegel").style.backgroundColor = "rgb(0, 15, 186)";
        teken();
    }
}
function tegel_verband() {
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {
        cv_cls();
        steenverband = 2;
        knop_press = 1;
        document.getElementById("$halfsteen").style.backgroundColor = "rgb(0, 15, 186)";
        document.getElementById("$tegel").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
        teken();
    }
}
document.getElementById("$hoogte").addEventListener("change", () => {
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {
        cv_cls();
        teken();
    }
});
document.getElementById("$breedte").addEventListener("change", () => {
    get_B_en_H();
    muur_B_en_H_check();
    if (zero_check == 0) {
        cv_cls();
        teken();
    }
});
/*
---Aantekeningen---



*/