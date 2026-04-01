import { Attribute, Component, Input } from '@angular/core';

@Component({
  selector: 'yt-hero',
  templateUrl: './hero-title.component.html',
  styleUrls: ['./hero-title.component.css']
})
export class HeroTitleComponent {
  @Input('hero-eyebrow') heroEyebrow: string = "";
  @Input('hero-title') heroTitle: string = "";
  @Input('hero-serif') heroSerif: string = "";
  @Input('hero-sub') heroSub: string = "";
}
