import { Component, OnInit } from '@angular/core';
import { ParsedInfo } from 'src/app/core/models/parsed-info';
import { ParsePdfService } from 'src/app/core/services/parse-pdf.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public pdfInfo: ParsedInfo;
  constructor(public parsePdfService: ParsePdfService) {
    this.pdfInfo = this.parsePdfService.parsedInfo;
  }

  ngAfterContentChecked() {
    this.pdfInfo = this.parsePdfService.parsedInfo;
  }
  ngOnInit(): void {}
}
