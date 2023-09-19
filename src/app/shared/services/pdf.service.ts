// pdf.service.ts

import { Injectable } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generatePdf(content: HTMLElement): void {
    let pdf = new jspdf("l", 'mm', 'a4');
    // Convert the content to a canvas using html2canvas
    html2canvas(content).then((canvas) => {
      const imageData = canvas.toDataURL('image/jpeg');
      pdf.addImage(imageData, "jpeg", 0, 0,  pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('exported-content.pdf');
    });
  }
}


