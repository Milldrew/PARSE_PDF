import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { Observable, zip } from 'rxjs';
import { ParsedInfo } from '../models/parsed-info';

@Injectable({
  providedIn: 'root',
})
export class ParsePdfService {
  pdfText: string = '';
  parsedInfo: ParsedInfo | null = null;
  parseInfo: Observable<ParsedInfo> | undefined;
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
                  this.pdfText += item.str + ' ';
                });
                //PARSE OUT INFO HERE
                this.getInfoFromText(this.pdfText);
              });
            });
          }
        });
      }
    });
    reader.readAsDataURL(file);
  }

  getInfoFromText(text: string) {
    let phoneNumberRegex = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/;
    let emailRegEx = /\S+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
    let zipCode = text.match(/\d\d\d\d\d/);
    if (zipCode) {
      this.parsedInfo = { zipCode: zipCode[0] };
    }
    let email = text.match(emailRegEx);
    if (email) {
      this.parsedInfo = { email: email[0] };
    }
    let phoneNumber = text.match(phoneNumberRegex);
    if (phoneNumber) {
      this.parsedInfo = { phoneNumber: phoneNumber[0] };
    }
  }
}
