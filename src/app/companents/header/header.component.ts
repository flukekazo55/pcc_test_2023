import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private datePipe: DatePipe) {}

  changeDateFormat() {
    const date = new Date();
    const formattedDate = this.datePipe.transform(
      date,
      "HH:mm ('GMT'Z) | d'th' MMM yyyy",
      '+0700'
    );
    return `Time in Thailand ${formattedDate} (GMT+7)`;
  }
}
