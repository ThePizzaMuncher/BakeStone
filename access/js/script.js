let steenDx = 210;
let steenDy = 50;
let steenDz = 100;
let voegDx = 10;
let voegDy = 10;
let muurDx = 500;
let muurDy = 300;
let om_en_om = 0;
let schaalSlider = 5.6;
let zeroCheck = 0;
let brickImage_ONLY_onload = 0;
let knopPress = 0;
let ACOBH = 0; //Aantal Clicks On Button Halfsteen
let stoneCount = 0;
let stoneCountPreNum = 0;
let steenVerband = 0;
let rijY = 0;
let rijX = 0;
let xPos_2 = 0;
let steensoortHalf_maat = 0;
let steen_plek_x = 0;
let steen_plekHalf_status = 0;
let halfsteenSwitch = 0;
let matenError = 0;
let variabele_aan_of_uit = 0;
let ArrHalfsteen = [];
let steensoort = "waalformaat";
let maxDeuren = 0;
let currentDeuren = 0;
let sparingSoort = 0;
let SPRHMIS = 0; //Sparingen Hoogte Maat In Stenen.
let SPRBMIS = 0; //Sparingen Breedte Maat In Stenen.
let SPRP_H_MIS = 1; //Sparing Positie Hoogte Maten In Stenen.
let SPRP_NR_MIS = 1; //Sparing Positie Naar Rechts Maten In Stenen.
let werkelijkeBreedteMuur = 0;
let werkelijkeHoogteMuur = 0;
let KeuzeResetSparingen = "";
let brickImage = new Image();
let deurTexture = new Image();
let laagVoorHalfsteen = 0;
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
function teken() {//Algemene teken functie.
    berekenen_steen_plek_x();
    stoneCount = 0; //Aantal stenen wordt gereset.
    rijY = 0; //Rij y wordt gereset.
    rijX = 0; //Rij x wordt gereset.
    halfsteenSwitch = 0;
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
        var ctx = canvas.getContext("2d");
        ctx.scale(schaalSlider, schaalSlider);
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
            ++rijX;
        }
        for (let yPos = 0; yPos < muurDy; yPos += lagenMaat) {//Voor de y-as var && lagenMaat doe...
            ++rijY;
            for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
                if (steenVerband == 1) {//Als steenVerband half-steen is doe dan...
                    halfsteenSwitch += 1;
                    switch (halfsteenSwitch) {
                        case 1:
                            if (knopPress == 1) {
                                setTimeout(() => {halfSteensTeken(); halfsteenSwitch += 1;}, 50);
                            }
                            else {
                                halfSteensTeken();
                            }
                        break;
                    }
                    stoneCount = (rijX * rijY);
                }
                else {//Als steenVerband tegel is doe dan...
                    stoneCount = (rijX * rijY);
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
    document.getElementById("$stone_count").innerHTML = stoneCount;
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
    werkelijkeMuurAfmetingen();
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Zero check.
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
    werkelijkeMuurAfmetingen();
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Zero check.
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
    werkelijkeMuurAfmetingen();
    SparingReset();
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Zero check.
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
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Als zero check niet is doe dan...
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
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {
        cv_cls();
        steenVerband = 1;
        knopPress = 1;
        document.getElementById("$halfsteen").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
        document.getElementById("$tegel").style.backgroundColor = "rgb(0, 15, 186)";
        teken();
        if (ACOBH > 1) {
            document.getElementById("$stone_count").innerHTML = (stoneCount);
        }
    }
}
function tegel_verband() {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0) {
        cv_cls();
        steenVerband = 0;
        knopPress = 1;
        document.getElementById("$halfsteen").style.backgroundColor = "rgb(0, 15, 186)";
        document.getElementById("$tegel").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
        teken();
    }
}
document.getElementById("$hoogte").addEventListener("change", () => {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {
        cv_cls();
        teken();
    }
});
document.getElementById("$breedte").addEventListener("change", () => {
    get_B_en_H();
    muur_B_en_H_check();
    if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {
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
    sparingSoort = 1;
    SparingMogelijkheid_en_teken();
});
document.getElementById("deur_2").addEventListener("click", () => {
    sparingSoort = 2;
    SparingMogelijkheid_en_teken();
});
document.getElementById("deur_3").addEventListener("click", () => {
    sparingSoort = 3;
    SparingMogelijkheid_en_teken();
});
document.getElementById("raam_1").addEventListener("click", () => {
    sparingSoort = 4;
    SparingMogelijkheid_en_teken();
});
document.getElementById("raam_2").addEventListener("click", () => {
    sparingSoort = 5;
    SparingMogelijkheid_en_teken();
});
document.getElementById("raam_3").addEventListener("click", () => {
    sparingSoort = 6;
    SparingMogelijkheid_en_teken();
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
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        if (knopPress == 1) {
            setTimeout(() => {ctx.drawImage(/* Texture voor sparingen */deurTexture, ((SPRP_NR_MIS * steenDx) - - (voegDx * SPRP_NR_MIS)), ((werkelijkeHoogteMuur - (steenDy * SPRHMIS) - (voegDy * (SPRHMIS - 1)))) - (SPRP_H_MIS * (steenDy - - voegDy)), ((steenDx * SPRBMIS) - - (voegDx * (SPRBMIS - 1))), /*  */(steenDy * SPRHMIS) - - (voegDy * (SPRHMIS - 1)));}, 50);
        }
        else {
                              ctx.drawImage(deurTexture, ((SPRP_NR_MIS * steenDx) - - (voegDx * SPRP_NR_MIS)), ((werkelijkeHoogteMuur - (steenDy * SPRHMIS) - (voegDy * (SPRHMIS - 1)))) - (SPRP_H_MIS * (steenDy - - voegDy)), ((steenDx * SPRBMIS) - - (voegDx * (SPRBMIS - 1))), (steenDy * SPRHMIS) - - (voegDy * (SPRHMIS - 1)));
        }
    }
}
function krijgSparingsMaten() {
    SPRHMIS = Math.round(document.getElementById("$sparingHoogte").value / steenDy);
    SPRBMIS = Math.round(document.getElementById("$sparingBreedte").value / steenDx);
    SPRP_H_MIS = Math.round(document.getElementById("$sparingPositieHoogte").value / steenDy);
    SPRP_NR_MIS = Math.round(document.getElementById("$sparingPositieNaarRechts").value / steenDx);
}
function sparingSoortCheck() {
    if (sparingSoort >= 1 && sparingSoort <= 3) {return "deur";}
    if (sparingSoort >= 4 && sparingSoort <= 6) {return "raam";}
    else                                        {return "sparing";}
}
function SparingMogelijkheid_en_teken() {
    krijgSparingsMaten();
    if (zeroCheck == 0 && (currentDeuren < $maxDeuren()) && SPRBMIS <= rijX && SPRHMIS <= rijY) {
        if (SPRP_NR_MIS <= -1) {
            window.alert("Voer een groter getal in voor de 'Positie naar rechts' voor de " + sparingSoortCheck() + ".")
        }
        if (SPRP_H_MIS <= -1) {
            window.alert("Voer een groter getal in voor de 'Positie omhoog' voor de " + sparingSoortCheck() + ".")
        }
        if (SPRHMIS <= 0 || SPRBMIS <= 0) {
            if (SPRHMIS <= 0 && SPRBMIS <= 0) {
                window.alert("Voer een grotere breedte en hoogte in voor de " + sparingSoortCheck() + ".");
            }
            else {
                if (SPRHMIS <= 0) {
                    window.alert("Voer een grotere hoogte in voor de " + sparingSoortCheck() + ".");
                }
                if (SPRBMIS <= 0) {
                    window.alert("Voer een grotere breedte in voor de " + sparingSoortCheck() + ".");
                }
                else {
                    window.alert("Error!");
                }
            }
        }
        else {
            switch (sparingSoort) {
                case 1:
                    deurTexture.src = "access/media/img/deur_1.png";
                break;
                case 2:
                    deurTexture.src = "access/media/img/deur_2.png";
                break;
                case 3:
                    deurTexture.src = "access/media/img/deur_3.png";
                break;
                case 4:
                    deurTexture.src = "access/media/img/raam_1.png";
                break;
                case 5:
                    deurTexture.src = "access/media/img/raam_2.png";
                break;
                case 6:
                    deurTexture.src = "access/media/img/raam_3.png";
                break;
            }
            ++currentDeuren;
            tekenSparing();
        }
    }
    else {
        if (currentDeuren >= maxDeuren) {
            if (currentDeuren == 0) {
                window.alert("De muur is te klein voor een " + sparingSoortCheck() + ".");
            }
            else {
                KeuzeResetSparingen = window.prompt("Het limiet sparingen is bereikt. Wilt u alle sparingen verwijderen? (Ja | Nee)");
                if (KeuzeResetSparingen.includes("J") || KeuzeResetSparingen.includes("j")) {
                    SparingReset();
                    cv_cls();
                    teken();
                }
                else {
                    if (!KeuzeResetSparingen.includes("n") && !KeuzeResetSparingen.includes("N")) {
						window.alert("Ongeldige invoer!");
					}
                }
            }
        }
        else {
            if (SPRHMIS > rijY) {
                window.alert("De " + sparingSoortCheck() + " is te hoog voor de muur.");
            }
            else {
                if (SPRBMIS > rijX) {
                    if (sparingSoortCheck() == "raam") {
                        window.alert("Het " + sparingSoortCheck() + " is te breedt voor de muur.");
                    }
                    else {
                        window.alert("De " + sparingSoortCheck() + " is te breedt voor de muur.");
                    }
                }
            }
        }
    }
}
function halfSteensTeken() {
    cv_cls();
    berekenen_steen_plek_x();
    werkelijkeMuurAfmetingen();
    //Begin resets variabelen.
    stoneCount = 0;
    rijY = 0; 
    rijX = 0; 
    halfsteenSwitch = 0;
    xPos_2 = 0;
    //Einde reset variabelen.
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
        var ctx = canvas.getContext("2d");
        ctx.scale(schaalSlider, schaalSlider);
        let koppenMaat = steenDz + voegDx;
        let lagenMaat = steenDy + voegDy;
        for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Prefire berekening rijX
            xPos_2 = xPos;
            ++rijX;
        }
        for (let yPos = 0; yPos < muurDy; yPos += lagenMaat) {//Voor de y-as doe...
            ++rijY;
            if (rijY % 2 == 0) {//even
                //window.alert("even getal:" + yPos + ".");
                for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Prefire berekening rijX
                    ctx.drawImage(brickImage, xPos, yPos, steenDx, steenDy);
                }
            }
            else {//oneven
                //window.alert("oneven getal:" + yPos + ".");
                for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Prefire berekening rijX
                    if (xPos == 0) {//eerste steen rij-x
                        ctx.drawImage(brickImage, xPos, yPos, (steenDx / 2), steenDy);
                    }
                    if (xPos == xPos_2) {//Laatste steen rij-x
                        ctx.drawImage(brickImage, (xPos - (steenDx / 2)), yPos, steenDx, steenDy);
                        ctx.drawImage(brickImage, (xPos - - (steenDx / 2) - - voegDx), yPos, (steenDx / 2) - voegDx, steenDy); //Dé laatste steen.
                    }
                    else {
                        //window.alert("xPos:" + xPos + ". yPos:" + yPos + ".");
                        ctx.drawImage(brickImage, (xPos - (steenDx / 2)), yPos, steenDx, steenDy);
                    }
                }
            }
        }
    }
    rijY - 0;
    werkelijkeMuurAfmetingen();
}
function muurAfmetingenErrorCheck() {
    if (muurDx > 11000 && muurDy > 3000) {
        window.alert("Muur is te hoog en te breed. (Max hoogte: 3000mm, breedte: 11000mm)");
        return "error";
    }
    else {
        if (muurDx > 11000) {
            window.alert("Muur is te breed. (Max breedte: 11000mm)");
            return "error";
        }
        else {
            if (muurDy > 3000) {
                window.alert("Muur is te hoog. (Max hoogte: 3000mm)");
                return "error";
            }
        }
    }
}
document.getElementById("$knop").addEventListener("click", () => {
    cv_cls();
    let txtHeight = 0;
    let centerTxt = 148.50004166666665;
    let ctx = document.getElementById("canvas");
    const canvas = document.querySelector('canvas');
    const download = document.querySelector('button');
    const context = canvas.getContext('2d');
    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF('l');
    teken();
    let width_pdf_png = pdf.internal.pageSize.getWidth();
    console.log("width:" + width_pdf_png);
    let imgData = canvas.toDataURL("image/jpeg", 1.0); //oare metode
    //Pagina 1.
    pdf.setTextColor(0, 0, 0); //text zwart.
    pdf.setFontSize(40);
    pdf.text("Baksteen calculator", centerTxt, 15, null, null, "center");
    pdf.setFontSize(20);
    pdf.text("Bakestone", centerTxt, 35, null, null, "center");
    pdf.text("Bakestone", centerTxt, 40, null, null, "center");
    pdf.addPage();
    //Pagina 2.
    pdf.addImage(imgData, 'JPEG', 0, 0, width_pdf_png, 148.50004166666665);
    pdf.save("Muur.pdf");
});