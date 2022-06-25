import { Component, OnInit } from '@angular/core';
import { ParsePdfService } from 'src/app/core/services/parse-pdf.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(public parsePdfService: ParsePdfService) {}

  ngOnInit(): void {
    this.parsePdfService.parsedInfo$.subscribe((data: any) =>
      console.log(data)
    );
  }
}
