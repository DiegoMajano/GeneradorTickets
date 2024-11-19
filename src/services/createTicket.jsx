import { PDFDocument } from 'pdf-lib';

const modPDF = async (qrImage, setIsGenerating,setMessage, setPdf) => {
    const filePath = '/TicketPlantilla.pdf';
    const existingPdf = await fetch(filePath).then((res) => res.arrayBuffer());
    
    const pdfDoc = await PDFDocument.load(existingPdf);
  
    const pages = pdfDoc.getPages();    
    const pngImage = await pdfDoc.embedPng(qrImage)
    const pngDims = pngImage.scale(0.4)
  

    const firstPage = pages[0];
  
  
    firstPage.drawImage(pngImage, {
      //x: firstPage.getWidth() / 2 + pngDims.width +16,
      //y: firstPage.getHeight() / 8 - 2,
      // x: firstPage.getWidth() - pngDims.width - 8,
      // y: pngDims.height + 2,
      x: firstPage.getWidth() / 2 - 5.5,
      y: pngDims.height - 38.8,
      width: pngDims.width,
      height: pngDims.height,
    })
  
    const pdfBytes = await pdfDoc.save();    
  
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf'});
    const pdfUrl = URL.createObjectURL(pdfBlob);
  
    // Abrir el PDF en una nueva ventana
    //window.open(pdfUrl, '_blank');
    setPdf(pdfUrl)
    setMessage('¡PDF creado correctamente!')

    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);  

  }

  export default modPDF