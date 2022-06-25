import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root',
})
export class ParsePdfService {
  pdfText: string = '';
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      '//cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.js';
  }
  parseData(file: File) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      console.log('got url');
      if (typeof reader.result === 'string') {
        const loadingTask = pdfjsLib.getDocument(reader.result);
        loadingTask.promise.then((pdf) => {
          console.log('pdf proxy ready');
          let { numPages } = pdf._pdfInfo;
          console.log({ numPages });
          for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
            let currentPage = pdf.getPage(pageNumber);
            currentPage.then((pageLoad) => {
              console.log('current page then pageLoad');
              pageLoad.getTextContent().then((text) => {});
            });
            console.log({ pageNumber });
          }
        });
      }
    });
    reader.readAsDataURL(file);
  }
}
