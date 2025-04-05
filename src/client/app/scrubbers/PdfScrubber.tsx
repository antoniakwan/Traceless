import { PDFDocument } from 'pdf-lib';
async function scrubPDF(file: File): Promise<void> {
    // Convert the File/Blob into an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Load the original PDF document
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    //Set all data for pdf clean, may add user 
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    pdfDoc.setCreationDate(new Date(0));
    pdfDoc.setModificationDate(new Date(0));
}