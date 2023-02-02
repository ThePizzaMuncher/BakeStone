let steenDx = 210, steenDy = 50, steenDz = 100; //steenbreedte, ‐hoogte en ‐diepte (Diepte is niet nodig)
let voegDx = 10, voegDy = 10; //voegbreedte en ‐hoogte
let muurDx = 500, muurDy = 300; //muurbreedte en ‐hoogte
let schaalSlider = 5.6; //standaard zoomniveau
let zeroCheck = 0; //wordt 1 als de muur te klein of te groot is
let brickImage_ONLY_onload = 0; //de steen image
let knopPress = 0; //Variabele die 1 is als de gebruiker op een knop heeft gedrukt.
let stoneCount = 0; //het aantal stenen
let steenVerband = 0, steenVerbandNaam = "";
let rijY = 0, rijX = 0, xPos_2 = 0; //aantal stenen in de hoogte en breedte, en nog iets á la coconut.jpeg
let aantalDeuren = 0, aantalRamen = 0; //spreken voor zich
let stoneCountAdvanced = 0; //stoneCount maar cooler
let halfsteenSwitch = 0; //schakelvariabele voor hele of halve steen
let matenError = 0; //als de muur niet meer op het scherm past, alert
let sparingenArr = []; //elke sparing op de muur komt hierin
let steensoort = "waalformaat"; //spreekt voor zich
let tmpFeedback = ""; //slaat bij een foutmelding de soort sparing op
let sparingNaamVar = 0; //wordt gebruikt bij het maken van de PDF
let ARSC = 0; //Array sparingen counter.
let maxDeuren = 0, currentSparingen = 0, sparingSoort = 0; //spreken voor zich
let SPRHMIS = 0; //Sparingen Hoogte Maat In Stenen.
let SPRBMIS = 0; //Sparingen Breedte Maat In Stenen.
let SPRP_H_MIS = 1; //Sparing Positie Hoogte Maten In Stenen.
let SPRP_NR_MIS = 1; //Sparing Positie Naar Rechts Maten In Stenen.
let werkelijkeBreedteMuur = 0, werkelijkeHoogteMuur = 0, KeuzeResetSparingen = ""; //spreken voor zich
let brickImage = new Image(), imgPDF = new Image(); //maakt PDF
let sparingTexture = [//De textures van de sparingen worden aangemaakt in een array.
	new Image().src = 'access/media/img/deur_1.png',
	new Image().src = 'access/media/img/deur_2.png',
	new Image().src = 'access/media/img/deur_3.png',
	new Image().src = 'access/media/img/raam_1.png',
	new Image().src = 'access/media/img/raam_2.png',
	new Image().src = 'access/media/img/raam_3.png'
]
brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Default steen texture.
console.log("%cBaksteen Calculator", "color: lightblue; font-size: 4vw;"); //flair voor in het debuggen / credits in de console
console.log("%cBakestone INC | BGDD", "color: green; font-size: 1.2vw;");
let credits = "Wieger, Jonathan, Johannes, Julian. (Bakestone INC) | In opdracht van BGDD"; //credits
let prefireSPRPDF = 1; //Prefire Sparingen PDF. (Voor een for loop)
function teken() {//Algemene teken functie.
	stoneCount = 0; //Aantal stenen wordt gereset.
	rijY = 0; //Rij y wordt gereset.
	rijX = 0; //Rij x wordt gereset.
	halfsteenSwitch = 0;
	const canvas = document.getElementById("canvas");
	if (canvas.getContext) {//Als canvas is gemaakt doe dan uitvoeren voorbereiden tekenen.
		var ctx = canvas.getContext("2d");
		ctx.scale(schaalSlider, schaalSlider);
		let koppenMaat = steenDx + voegDx;
		koppenMaat /= 2;
		let lagenMaat = steenDy + voegDy;
		for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe... (Prefire)
			++rijX;
		}
		for (let yPos = 0; yPos < muurDy; yPos += lagenMaat) {//Voor de y-as var && lagenMaat doe...
			++rijY;
			for (let xPos = 0; xPos < muurDx; xPos += (2 * koppenMaat)) {//Voor de x-as var && koppenMaat doe...
				if (steenVerband == 1) {//Als steenVerband half-steen is doe dan...
					halfsteenSwitch += 1;
					switch (halfsteenSwitch) {//Switch die kijkt of de muur als halfsteens of tegel verband moet worden getekend.
						case 1:
							if (knopPress == 1) {
								setTimeout(() => {halfSteensTeken(); halfsteenSwitch += 1;}, 50);
							}
							else {
								halfSteensTeken();
							}
						break;
					}
				}
				else {//Als steenVerband tegel is doe dan...
					if (knopPress == 1) {//Als gebruiker op een knop heeft gedrukt doe dan...
							setTimeout(() => {ctx.drawImage(brickImage, xPos, yPos, steenDx, steenDy);}, 50);
					}
					else {//Als de gebruiker de sliders gebruikt, doe dan...
						ctx.drawImage(brickImage, xPos, yPos, steenDx, steenDy);
					}
				}
			}
		}
	}
	document.getElementById("$stone_count").innerHTML = stoneCountINCSPR();
	if (currentSparingen != 0) {//Tekent de sparingen als er sparingen in de muur zitten.
		--currentSparingen;
		SparingMogelijkheid_en_teken();
	}
	werkelijkeMuurAfmetingen();
	document.getElementById("pijl_txt_h").innerHTML = werkelijkeBreedteMuur;
	document.getElementById("pijl_txt_v").innerHTML = werkelijkeHoogteMuur;
	document.getElementById("$pijl_h_txt").title = "Werkelijke muur breedte: " + werkelijkeBreedteMuur + "mm";
	document.getElementById("$pijl_v_txt").title = "Werkelijke muur hoogte: " + werkelijkeHoogteMuur + "mm";
}
brickImage.onload = () => {//Hier wordt getekend waneer de brickImage ready is om een img te printen.
	switch (brickImage_ONLY_onload) {//Als de pagina voor de eerste keer wordt ingeladen teken dan de muur.
		case 0:
			teken();
		break;
	}
	brickImage_ONLY_onload = 1;//Pagina is geladen, dus de onload wordt hier nu niet meer uitgevoerd.
}
function BGDD_website() {//Doorverwijzing naar BGDD website.
	window.open("https://BGDD.nl/", '_blank');
}
document.getElementById("#stone1").addEventListener("click", () => {//Knop steen 1 listener. (Waalformaat baksteen)
	get_B_en_H();//Krijg de maten van de muur.
	muur_B_en_H_check();//Kijkt of de muur niet te klein is en andere checks.
	werkelijkeMuurAfmetingen();//Krijg de maten van de muur.
	if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Zero check.
		knopPress = 1;//Gebruiker heeft op een knop gedrukt.
		steensoort = "waalformaat";//Variabele steensoort wordt naar waalformaat gezet.
		cv_cls();//Canvas legen.
		brickImage.src = 'access/media/img/waalformaat-steen-1.png';//Het pad van de steen texture wordt ingesteld.
		steenDx = 210;//Breedte steen.
		steenDy = 50;//Hoogte steen.
		teken();//Teken
	}
});
document.getElementById("#stone2").addEventListener("click", () => {//Knop steen 2 listener. (Dikformaat baksteen)
	get_B_en_H();
	muur_B_en_H_check();
	werkelijkeMuurAfmetingen();
	if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Zero check.
		knopPress = 1;
		steensoort = "dikformaat";
		cv_cls();
		brickImage.src = 'access/media/img/dikformaat-steen-1.png';
		steenDx = 215;
		steenDy = 101;
		teken();
	}
});
document.getElementById("#stone3").addEventListener("click", () => {//Knop steen 3 listener. (Ysselformaat baksteen)
	get_B_en_H();
	muur_B_en_H_check();
	werkelijkeMuurAfmetingen();
	if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Zero check.
		knopPress = 1;
		steensoort = "ysselformaat";
		cv_cls();
		brickImage.src = 'access/media/img/ysselformaat-steen-1.png';
		steenDx = 160;
		steenDy = 78;
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
function half_steen_verband() {//Tekent halve stenen.
	get_B_en_H();
	muur_B_en_H_check();
	if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Als de omstandigheden goed zijn doe dan...
		cv_cls();
		steenVerband = 1;
		knopPress = 1;
		document.getElementById("$halfsteen").style.backgroundColor = "rgba(25, 35, 230, 0.711)";
		document.getElementById("$tegel").style.backgroundColor = "rgb(0, 15, 186)";
		teken();
	}
}
function tegel_verband() {//Tekent in tegelverband.
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
document.getElementById("$hoogte").addEventListener("change", () => {//Als de hoogte verandert doe dan...
	get_B_en_H();
	muur_B_en_H_check();
	if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Als de omstandigheden juist zijn doe dan...
		cv_cls();
		teken();
	}
});
document.getElementById("$breedte").addEventListener("change", () => {//Als de breedte wordt aangepast doe dan...
	get_B_en_H();
	muur_B_en_H_check();
	if (zeroCheck == 0 && muurAfmetingenErrorCheck() != "error") {//Als de omstandigheden juist zijn doe dan...
		cv_cls();
		teken();
	}
});
function get_voeg_B_en_H() {//Checkt of voegen onder de regels vallen en tekent dan de muur.
	if (Number(document.getElementById("$voeg_b").value < 0)) {
		window.alert("Voer een grotere maat in bij de voeg breedte. (min 0mm)");
	}
	else {
		if (Number(document.getElementById("$voeg_h").value) < 0) {
			window.alert("Voer een grotere maat in bij de voeg hoogte. (min 0mm)");
		}
		else {
			if (Number(document.getElementById("$voeg_b").value) > 20) {
				window.alert("Voer een kleinere maat in voor de voeg breedte. (max 20mm)");
			}
			else {
				if (Number(document.getElementById("$voeg_h").value) > 20) {
					window.alert("Voer een kleinere maat in voor de voeg hoogte. (max 20mm)");
				}
				else {
					voegDx = Number(document.getElementById("$voeg_b").value);
					voegDy = Number(document.getElementById("$voeg_h").value);
				}
			}
		}
	}
	cv_cls();
	teken();
}
document.getElementById("deur_1").addEventListener("click", () => {//Als gebruiker op deur 1 klikt doe dan...
	knopPress = 1;
	sparingSoort = 0;
	SparingMogelijkheid_en_teken();
});
document.getElementById("deur_2").addEventListener("click", () => {//Als gebruiker op deur 2 klikt doe dan...
	knopPress = 1;
	sparingSoort = 1;
	SparingMogelijkheid_en_teken();
});
document.getElementById("deur_3").addEventListener("click", () => {//Als gebruiker op deur 3 klikt doe dan...
	knopPress = 1;
	sparingSoort = 2;
	SparingMogelijkheid_en_teken();
});
document.getElementById("raam_1").addEventListener("click", () => {//Als gebruiker op raam 1 klikt doe dan...
	knopPress = 1;
	sparingSoort = 3;
	SparingMogelijkheid_en_teken();
});
document.getElementById("raam_2").addEventListener("click", () => {//Als gebruiker op raam 2 klikt doe dan...
	knopPress = 1;
	sparingSoort = 4;
	SparingMogelijkheid_en_teken();
});
document.getElementById("raam_3").addEventListener("click", () => {//Als gebruiker op raam 3 klikt doe dan...
	knopPress = 1;
	sparingSoort = 5;
	SparingMogelijkheid_en_teken();
});
function werkelijkeMuurAfmetingen() {//Zet de werkelijke muur afmetingen in variabelen.
	werkelijkeBreedteMuur = ((steenDx * rijX) - - (rijX * voegDx - voegDx));
	werkelijkeHoogteMuur = ((steenDy * rijY) - - (rijY * voegDy - voegDy));
}
function $maxDeuren() {//Berekent met een formule wat de maximale sparingen zijn van de muur.
	werkelijkeMuurAfmetingen();
	maxDeuren = Math.round((werkelijkeBreedteMuur / (steenDx * 2) / 3.5));
	return maxDeuren;
}
function SparingReset() {//Reset de sparingen in alle mogelijke manieren.
	sparingArrReset();
	currentSparingen = 0;
	aantalDeuren = 0;
	aantalRamen = 0;
	ARSC = 0;
}
function tekenSparing() {//Tekent de sparingen.
	if (knopPress == 1) {//Als een knop is ingedrukt doe dan...
		setTimeout(() => {//Wacht voor 50ms en voert dan de code uit.
			if (canvas.getContext) {
				let variabeleSparingTexture = new Image();
				variabeleSparingTexture.src = sparingTexture[sparingSoort];
				++ARSC;
				sparingenArr.push({"texture": variabeleSparingTexture, "xAs": SPRP_NR_MIS, "yAs": ((werkelijkeHoogteMuur - SPRHMIS) - SPRP_H_MIS), "yAsVisueel": SPRP_H_MIS, "breedte": SPRBMIS, "hoogte": SPRHMIS, "Counter": ARSC});
				var ctx = canvas.getContext("2d");
				if (collisionDetecion() != "error") {
					ctx.fillStyle = "red";
					for (let $i$ = 0; currentSparingen > $i$; ++$i$) {//Voor current sparingen doe...
						setTimeout(() => {
							ctx.drawImage(
								sparingenArr[$i$].texture,
								/* x-as */sparingenArr[$i$].xAs,
								/* y-as */sparingenArr[$i$].yAs,
								/* breedte */sparingenArr[$i$].breedte,
								/* hoogte */sparingenArr[$i$].hoogte);
							ctx.font = "" + (((sparingenArr[$i$].breedte * sparingenArr[$i$].hoogte) / 5000) / 2) + "px Arial";
							ctx.fillText(
								sparingenArr[$i$].Counter,
								sparingenArr[$i$].xAs,
								sparingenArr[$i$].yAs - - (((sparingenArr[0].breedte * sparingenArr[0].hoogte) / 5000) / 10 * 2 - - 15));
						}, 100);
					}
				}
				else {
					cv_cls();
					SparingReset();
					teken();
				}
			}
		}, 50);
	}
	else {
		if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "red";
			for (let $i$ = 0; currentSparingen > $i$; ++$i$) {//Voor current sparingen doe...
				ctx.drawImage(
					sparingenArr[$i$].texture,
		/* x-as   */sparingenArr[$i$].xAs,
		/* y-as   */sparingenArr[$i$].yAs,
		/* breedte*/sparingenArr[$i$].breedte,
		/* hoogte */sparingenArr[$i$].hoogte);
				ctx.font = "" + (((sparingenArr[$i$].breedte * sparingenArr[$i$].hoogte) / 5000) / 2) + "px Arial";
				ctx.fillText(
					sparingenArr[$i$].Counter,
					sparingenArr[$i$].xAs,
					sparingenArr[$i$].yAs - - (((sparingenArr[0].breedte * sparingenArr[0].hoogte) / 5000) / 10 * 2 - - 15));
			}
		}
	}
}
function sparingArrReset() {//Reset de sparingen array.
	sparingenArr = [];
}
function krijgSparingsMaten() {//Krijg de maten van de sparing.
	SPRHMIS = Number(document.getElementById("$sparingHoogte").value);
	SPRBMIS = Number(document.getElementById("$sparingBreedte").value);
	SPRP_H_MIS = Number(document.getElementById("$sparingPositieHoogte").value);
	SPRP_NR_MIS = Number(document.getElementById("$sparingPositieNaarRechts").value);
}
function sparingSoortCheck() {//Kijkt wat de soort sparing is qua naam.
	if (sparingSoort >= 0 && sparingSoort <= 2) {
		return "deur";
	}
	if (sparingSoort >= 3 && sparingSoort <= 5) {
		return "raam";
	}
	else {
		return "sparing";
	}
}
function SparingMogelijkheid_en_teken() {//Kijkt of de muur sparing waardig is
	krijgSparingsMaten();
	werkelijkeMuurAfmetingen();
	if (
		zeroCheck == 0 &&
		(currentSparingen < $maxDeuren()) &&
		SPRBMIS <= werkelijkeBreedteMuur &&
		SPRHMIS <= werkelijkeHoogteMuur &&
		(SPRP_H_MIS + SPRHMIS) <= werkelijkeHoogteMuur
	) {
		if (SPRP_NR_MIS <= -1) {
			window.alert("Voer een groter getal in voor de 'Positie naar rechts' voor de " + sparingSoortCheck() + ".")
		}
		if (SPRP_H_MIS <= -1) {
			window.alert("Voer een groter getal in voor de 'Positie omhoog' voor de " + sparingSoortCheck() + ".")
		}
		if (SPRHMIS <= 0 || SPRBMIS <= 0) {
			if (sparingSoortCheck().includes("deur")) {
				tmpFeedback = "de deur";
			}
			else {
				if (sparingSoortCheck().includes("raam")) {
					tmpFeedback = "het raam";
				}
				else {
					tmpFeedback = "de sparing";
				}
			}
			if (SPRHMIS <= 0 && SPRBMIS <= 0) {
				window.alert("Voer een grotere breedte en hoogte in voor " + tmpFeedback + ".");
			}
			else {
				if (SPRHMIS <= 0) {
					window.alert("Voer een grotere hoogte in voor de " + tmpFeedback + ".");
				}
				if (SPRBMIS <= 0) {
					window.alert("Voer een grotere breedte in voor de " + tmpFeedback + ".");
				}
				else {
					window.alert("Error!");
				}
			}
		}
		else {
			if ((SPRBMIS + SPRP_NR_MIS) > werkelijkeBreedteMuur) {//Sparingen totaal breedte check.
				if (sparingSoortCheck() == "deur") {
					tmpFeedback = "De deur";
				}
				else {
					if (sparingSoortCheck() == "raam") {
						tmpFeedback = "Het raam";
					}
					else {
						tmpFeedback = "De sparing";
					}
				}
				window.alert(tmpFeedback + " is te breedt voor de muur, omdat " + SPRBMIS + "mm + " + SPRP_NR_MIS + "mm = " + (SPRBMIS + SPRP_NR_MIS) + "mm. Terwijl de muur maar " + werkelijkeBreedteMuur + "mm breedt is.");
			}
			else {
				++currentSparingen;
				tekenSparing();
				setTimeout(() => {//Aanpassen van totaal stenen.
					document.getElementById("$stone_count").innerHTML = stoneCountINCSPR();
				}, 200);
			}
		}
	}
	else {
		if (currentSparingen >= maxDeuren) {
			if (currentSparingen == 0) {
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
	}
	if ((SPRHMIS + SPRP_H_MIS) > werkelijkeHoogteMuur) {//Sparingen totaal hoogte check.
		tmpFeedFunctie();
		window.alert(tmpFeedback + " is te hoog voor de muur, omdat " + SPRHMIS + "mm + " + SPRP_H_MIS + "mm = " + (SPRHMIS + SPRP_H_MIS) + "mm. Terwijl de muur maar " + werkelijkeHoogteMuur + "mm hoog is.");
	}
}
function halfSteensTeken() {
	cv_cls();
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
		let koppenMaat = steenDx + voegDx;
		let lagenMaat = steenDy + voegDy;
		koppenMaat /= 2;
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
	document.getElementById("$stone_count").innerHTML = stoneCountINCSPR();
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
function SparingPDFNaam($i$) {
	if (sparingenArr[$i$]) {
		if (prefireSPRPDF == 0) {++sparingNaamVar}
		return "Sparing " + Math.round(sparingNaamVar) + "";
	}
}
function sparingSoortAdd() {//Geeft aan hoeveel deuren en ramen er in de muur zitten in de PDF.
	for (let $i$ = 0; $i$ < currentSparingen; ++$i$) {//Voor aantal sparingen doe...
		
	}
}
document.getElementById("$reset").addEventListener("click", () => {//Reset knop voor alle sparingen.
	if (currentSparingen != 0) {
		SparingReset();
		cv_cls();
		teken();
	}
	else {
		window.alert("Er zitten geen sparingen in de muur.");
	}
});
document.getElementById("$knop").addEventListener("click", () => {//Pdf download
	werkelijkeMuurAfmetingen();
	voegDx = Number(document.getElementById("$voeg_b").value);
	voegDy = Number(document.getElementById("$voeg_h").value);
	let centerTxt = 148.50004166666665;
	const {jsPDF} = window.jspdf;
	const pdf = new jsPDF('l');//PDF kantelen waardoor img er beter op past.
	let width_pdf_png = pdf.internal.pageSize.getWidth();
	imgPDF.src = canvas.toDataURL("image/jpeg", 1.0); //oare metode
	let datum = new Date();
	pdf.setProperties({
		title : "Muur calculator"
	});
	if (steenVerband == 0) {
		steenVerbandNaam = "tegelverband";
	}
	else {
		if (steenVerband == 1) {
			steenVerbandNaam = "halfsteensverband";
		}
		else {
			steenVerbandNaam = "onbekend";
		}
	}
	//Pagina 1.
	pdf.setTextColor(0, 0, 0); //text zwart.
	pdf.setFontSize(40);
	pdf.text("Baksteen calculator", centerTxt, 15, null, null, "center");
	pdf.setFontSize(17);
	pdf.text("Statistieken van uw muur", centerTxt, 30, null, null, "center");
	pdf.setFontSize(20);
	pdf.text("Steensoort: ", 30, 80);
	pdf.text("" + steensoort + ".", 77, 80);
	pdf.text("Breedte muur: ", 30, 90);
	pdf.text("" + werkelijkeBreedteMuur + "mm.", 80, 90);
	pdf.text("Hoogte muur: ", 30, 100);
	pdf.text("" + werkelijkeHoogteMuur + "mm.", 80, 100);
	pdf.text("Aantal stenen:", 30, 110);
	pdf.text("" + stoneCountINCSPR() + ".", 80, 110);
	pdf.text("Steen verband: ", 30, 120);
	pdf.text("" + steenVerbandNaam + ".", 80, 120);
	pdf.text("Voeg hoogte: ", 30, 130);
	pdf.text("" + voegDy + "mm.", 80, 130);
	pdf.text("Voeg breedte: ", 30, 140);
	pdf.text("" + voegDx + "mm.", 80, 140);
	pdf.setFontSize(13);
	pdf.text("" + datum.getDate() + "-" + (datum.getMonth() - - 1) + "-" + datum.getFullYear(), 272, 206);
	pdf.setFontSize(20);
	if (currentSparingen > 0) {//Als er sparingen zijn doe dan...
		sparingSoortAdd();
		prefireSPRPDF = 1;
		aantalDeuren = 0;
		aantalRamen = 0;
		for (let $i$ = 0; $i$ < currentSparingen; ++ $i$) {//Voor aantal sparingen doe...
			SparingPDFNaam($i$);
			if (sparingenArr[$i$].texture.src.includes("deur")) {
				++aantalDeuren;
			}
			else {
				if (sparingenArr[$i$].texture.src.includes("raam")) {
					++aantalRamen;
				}
			}
		}
		prefireSPRPDF = 0;
		pdf.text("Aantal deuren: ", 30, 150);
		pdf.text("" + aantalDeuren + ".", 80, 150);
		pdf.text("Aantal ramen: ", 30, 160);
		pdf.text("" + aantalRamen + ".", 80, 160);
		pdf.addPage();//Nieuwe pagina.
		pdf.setFontSize(30);
		pdf.text("Sparingen", centerTxt, 13, null, null, "center");
		pdf.setFontSize(16);
		let variabeleHoogtePDF = 20; //De hoogte van de text in de for loops in PDF
		for (let $i$ = 0; $i$ < currentSparingen; ++$i$) {//Voor aantal sparingen doe...
			variabeleHoogtePDF += 10;
			pdf.text(SparingPDFNaam($i$) + " hoogte: ", 10, variabeleHoogtePDF);
			pdf.text("" + sparingenArr[$i$].hoogte + " mm, breedte: " + sparingenArr[$i$].breedte + "mm. / Positie: verticaal: " + sparingenArr[$i$].yAsVisueel + "mm, horizontaal: " + sparingenArr[$i$].xAs + "mm.", 70, variabeleHoogtePDF);
			variabeleHoogtePDF += 7;
		}
		variabeleHoogtePDF += 15;
		pdf.text("Hieronder een grafische weergave van uw muur.", centerTxt, 195, null, null, "center");
		//Loop var's reset.
		sparingNaamVar = 0;

		variabeleHoogtePDF = 13;
		aantalDeuren = 0;
		aantalRamen = 0;
	}
	else {//Als er geen sparingen zijn doe dan...
		pdf.setFontSize(17);
		pdf.text("Hieronder een grafische weergave van uw muur.", centerTxt, 195, null, null, "center");
		pdf.setFontSize(20);
	}
	pdf.addPage();
	//Laatste pagina.
	pdf.addImage(imgPDF, 'png', 0, 0, width_pdf_png, centerTxt);
	pdf.addImage("access/media/img/Bakestone_logo.png", 'JPEG', 200, 166, (774 / 8), (225 / 8));
	pdf.addImage("access/media/img/BGDD.png", 'JPEG', 0, 166, (1060 / 8), (207 / 8));
	//Einde PDF generation.
	pdf.save("Muur.pdf");
});
function stoneCountINCSPR() {//Geavanceerde stonecount functie die sparingen ook mee telt. Er gaan dan stenen af als er een sparing in zit.
	stoneCountAdvanced = 0;//Reset.
	stoneCount = 0;//Reset.
	for (let $i$ = 0; $i$ < currentSparingen; ++$i$) {//Voor aantal sparingen doe...
		stoneCountAdvanced += Number(sparingenArr[$i$].breedte / (steenDx - - voegDx)) * Number(sparingenArr[$i$].hoogte / (steenDy - - voegDy));
	}
	stoneCount = ((rijX * rijY) - stoneCountAdvanced);
	return Math.round(stoneCount);
}
function collisionDetecion() {//Kijkt of er sparingen zijn die overlappen.
	for (let $i$ = 0; $i$ < currentSparingen; ++$i$) {//Voor aantal sparingen doe...
		if ($i$ != 0) {//Als er minimaal al 1 sparing is, doe dan...
		if (//Kijkt voor sparingen collision.
			(((sparingenArr[$i$].xAs - - sparingenArr[$i$].breedte) >= sparingenArr[($i$ - 1)].xAs) //x-as
			&& 
			(sparingenArr[$i$].xAs <= (sparingenArr[($i$ - 1)].xAs - - sparingenArr[($i$ - 1)].breedte)))//x-as
			&&
			(((sparingenArr[$i$].yAs - - sparingenArr[$i$].hoogte) >= sparingenArr[($i$ - 1)].yAs)//y-as
			&&
			(sparingenArr[$i$].yAs <= (sparingenArr[($i$ - 1)].yAs - - sparingenArr[($i$ - 1)].hoogte)))//y-as
			) {
			tmpFeedFunctie();
			alert(tmpFeedback + " overlapt een andere sparing! Sparingen worden gereset.");
			return "error";
			}
		}
	}
}
function tmpFeedFunctie() {
	if (sparingSoortCheck() == "deur") {
		tmpFeedback = "De deur";
	}
	else {
		if (sparingSoortCheck() == "raam") {
			tmpFeedback = "Het raam";
		}
		else {
			tmpFeedback = "De sparing";
		}
	}
}
