import { Component } from '@angular/core';
import { ParsePdfService } from 'src/app/core/services/parse-pdf.service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss'],
})
export class UploadPdfComponent {
  constructor(public parsePdf: ParsePdfService) {}
  myFileName: any = 'Choose A file';

  fileChangeEvent(inputFileEvent: any) {
    const uploadedFile = inputFileEvent.target.files[0];
    if (!uploadedFile) return;
    this.myFileName = uploadedFile.name;
    this.parsePdf.parseData(uploadedFile);
  }

  /** A fictional contact sheet bundled with the app, for trying it without a PDF to hand. */
  async useSample() {
    this.myFileName = 'sample-contact-sheet.pdf';
    const response = await fetch('assets/sample-contact-sheet.pdf');
    this.parsePdf.parseData(await response.blob());
  }
}
