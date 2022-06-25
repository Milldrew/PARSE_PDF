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
      if (typeof reader.result === 'string') {
        const loadingTask = pdfjsLib.getDocument(reader.result);
        loadingTask.promise.then((pdf) => {
          let { numPages } = pdf._pdfInfo;
          for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
            let currentPage = pdf.getPage(pageNumber);
            currentPage.then((pageLoad) => {
              pageLoad.getTextContent().then((text) => {
                text.items.forEach((item: any) => {
                  console.log(item);
                  this.pdfText += item.str + ' ';
                });
                //PARSE OUT INFO HERE
                this.getInfoFromText(this.pdfText);
              });
            });
            console.log({ pageNumber });
          }
        });
      }
    });
    reader.readAsDataURL(file);
  }

  getInfoFromText(text: string) {
    text.match(/\d*/g);
  }
}
