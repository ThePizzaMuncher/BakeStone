let steenDx = 210;
let steenDy = 50;
let steenDz = 100;
let voegDx = 10;
let voegDy = 10;
let muurDx = 500;
let muurDy = 300;
let schaal_slider = 5.6;
let zero_check = 0;
let brickImage_ONLY_onload = 0;
let knop_press = 0;
let stone_count = 0;
let stone_count_half = 0;
let steenverband = 0;
let rij_y = 0;
let rij_x = 0;
let prefire_rij_x = 0;
let prefire_rij_y = 0;
let steensoort_half_maat = 0;
let steen_plek_x = 0;
let steen_plek_y = 0;
let steen_plek_half_status = 0;
let string_test_json = "";
let steensoort = "waalformaat";
let brickImage = new Image();
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
function teken() {//Algemene teken functie.
    stone_count = 0; //Aantal stenen wordt gereset.
    stone_count_half = 0; //Aantal halve stenen worden gereset.
    rij_y = 0; //Rij y wordt gereset.
    rij_x = 0; //Rij x wordt gereset.
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
                if (steenverband == 1) {//Als steenverband half-steen is doe dan...
                    if (voegDx <= 0) {voegDx = 10;}
                    if (rij_y % 2 == 0 ) {//Om en om functie voor y-as.
                        ctx.drawImage(brickImage, xpos, ypos, (steenDx / 2), steenDy);
                        xpos += (steenDx / 2) + voegDx;
                        stone_count_half += 0.5;
                        steen_plek_half_status = 1;
                    }
                    for (; xpos < muurDx; xpos += (steenDx - - voegDx)) {
                            ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);
                            console.log(xpos, ypos);
                            ++stone_count_half;
                    }
                    if (rij_y % 2 == 0 && muurDx >= (muurDx / steenDx)) {//Halve steen aan het einde van de muur.
                        if (steensoort == "waalformaat") {
                            steensoort_half_maat = 2.21;
                        }
                        else {
                            if (steensoort == "dikformaat") {
                                steensoort_half_maat = 2.24;
                            }
                            else {
                                if (steensoort == "ysselformaat") {
                                    steensoort_half_maat = 2.27;
                                }
                            }
                        }
                        ctx.drawImage(brickImage, xpos, ypos, (steenDx / steensoort_half_maat), steenDy);
                        xpos += (steenDx / 2) + voegDx;
                        stone_count_half += 0.5;
                    }
                    else {
                        if (rij_y % 2 != 0 && muurDx >= (muurDx / steenDx)) {
                            if (steensoort == "waalformaat") {
                                steensoort_half_maat = 2;
                            }
                            else {
                                if (steensoort == "dikformaat") {
                                    steensoort_half_maat = 2.24;
                                }
                                else {
                                    if (steensoort == "ysselformaat") {
                                        steensoort_half_maat = 2.27;
                                    }
                                }
                            }
                            ctx.drawImage(brickImage, xpos, ypos, (steenDx / steensoort_half_maat), steenDy);
                            xpos += (steenDx / 2) + voegDx;
                            stone_count_half += 0.5;
                        }
                    }
                }
                else {//Als steenverband tegel is doe dan...
                    if (knop_press == 1) {
                            setTimeout(() => {ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);}, 50);
                    }
                    else {
                        ctx.drawImage(brickImage, xpos, ypos, steenDx, steenDy);
                    }
                }
            }
        }
    }
    if (steenverband == 1) {
        document.getElementById("$stone_count").innerHTML = stone_count_half;
    }
    else {
        document.getElementById("$stone_count").innerHTML = stone_count;
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
    if (zero_check == 0) {//Zero check.
        knop_press = 1;
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
    if (zero_check == 0) {//Zero check.
        knop_press = 1;
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
    rij_y = 0;
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
            ++rij_y;
            for (let xpos = 0; xpos < muurDx; xpos += (2 * koppenMaat)) {
                console.log("xpos: " + xpos + ", ypos: " + ypos + ".");
                steen_plek_x = xpos;
            }
        }
        ctx.clearRect(steen_plek_x + steenDx + voegDx, 0, steenDx + 10, muurDy);
    }
}