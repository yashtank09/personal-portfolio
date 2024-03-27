import { Component, Input } from '@angular/core';

@Component({
  selector: 'master-titles',
  templateUrl: './master-titles.component.html',
  styleUrls: ['./master-titles.component.css']
})
export class MasterTitlesComponent {
  @Input('title-shadow') title_bh: string = "";
  @Input('title-over') title_front: string = "";
}
