import { Component, OnInit } from '@angular/core';
import { ParsePdfService } from 'src/app/core/services/parse-pdf.service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss'],
})
export class UploadPdfComponent implements OnInit {
  constructor(public parsePdf: ParsePdfService) {}
  myFileName: any = 'Choose A file';

  fileChangeEvent(inputFileEvent: any) {
    const uploadedFile = inputFileEvent.target.files[0];
    this.myFileName = uploadedFile.name;
    this.parsePdf.parseData(uploadedFile);
  }

  ngOnInit(): void {}
}
