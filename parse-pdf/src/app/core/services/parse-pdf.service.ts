import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { ParsedInfo } from '../models/parsed-info';

export type ParseStatus = 'idle' | 'reading' | 'done' | 'nothing-found' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ParsePdfService {
  pdfText: string = '';
  parsedInfo: ParsedInfo = {};
  status: ParseStatus = 'idle';
  constructor() {
    // Served from this app's own assets (copied from node_modules at build),
    // so it always matches the bundled pdf.js and needs no third-party CDN.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.js';
  }

  /** Reads every page of the PDF in the browser, then fills in what it finds. */
  async parseData(file: Blob) {
    // A fresh start for each file: the text used to accumulate across uploads.
    this.pdfText = '';
    this.parsedInfo = {};
    this.status = 'reading';
    try {
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const pages: string[] = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const text = await page.getTextContent();
        pages.push(text.items.map((item: any) => item.str).join(' '));
      }
      this.pdfText = pages.join(' ');
      this.getInfoFromText(this.pdfText);
      this.status = Object.keys(this.parsedInfo).length ? 'done' : 'nothing-found';
    } catch (error) {
      console.error(error);
      this.status = 'error';
    }
  }

  getInfoFromText(text: string) {
    let phoneNumberRegex = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/;
    let emailRegEx = /\S+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
    let zipCode = text.match(/\b\d{5}\b/);
    if (zipCode) {
      this.parsedInfo['zipCode'] = zipCode[0];
    }
    let email = text.match(emailRegEx);
    if (email) {
      this.parsedInfo['email'] = email[0];
    }
    let phoneNumber = text.match(phoneNumberRegex);
    if (phoneNumber) {
      this.parsedInfo['phoneNumber'] = phoneNumber[0];
    }
  }
}
