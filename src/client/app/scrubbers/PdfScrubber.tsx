import { PDFDocument } from 'pdf-lib';

export const scrubPDF =  async (file: File, 
    Title? : string,
    Author?: string,
    Subject?: string,
    Keywords?: string[],
    Producer?: string,
    Creator?: string,
    CreateDate?: Date,
    ModificationDate?: Date,
 ): Promise<Blob> => {
    // Convert the File/Blob into an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the original PDF document
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Set all metadata fields to empty values
    pdfDoc.setTitle(Title ? Title : "");
    pdfDoc.setAuthor(Author ? Author : '');
    pdfDoc.setSubject(Subject ? Subject : '');
    pdfDoc.setKeywords(Keywords? Keywords : []);
    pdfDoc.setProducer(Producer? Producer : '');
    pdfDoc.setCreator(Creator ? Creator : '');
    pdfDoc.setCreationDate(CreateDate ? CreateDate : new Date(0));
    pdfDoc.setModificationDate(ModificationDate? ModificationDate : new Date(0));
    
    // Save the modified PDF as bytes
    const pdfBytes = await pdfDoc.save();
    
    // Convert the bytes to a Blob with PDF MIME type
    return new Blob([pdfBytes], { type: 'application/pdf' });
}