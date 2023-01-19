console.error("SIKE no error... The only mistake was when you loaded this script. Because wwwqr is the messiah!");
document.getElementById("$knop").addEventListener("click", () => {
    let ctx = document.getElementById("canvas");
    const canvas = document.querySelector('canvas');
    const download = document.querySelector('button');
    const context = canvas.getContext('2d');
    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF();
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, 100, 100);
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.addPage();
    pdf.setTextColor(0, 0, 255); //text blauw.
    let tekst = "Goedendag!";
    pdf.text(tekst, 105, 10, null, null, "center");
    pdf.save("Muur.pdf");
});