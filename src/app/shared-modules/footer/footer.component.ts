import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'yt-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [DatePipe]
})
export class FooterComponent {

  date: Date = new Date();
  copyRightYear: number;
  constructor(){
    this.copyRightYear = this.date.getUTCFullYear();
    console.log(this.copyRightYear);
  }
}
