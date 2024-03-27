import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { socialmedia } from 'src/app/common';
import { SocialMedia, SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'yt-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [DatePipe]
})
export class FooterComponent {

  date: Date = new Date();
  copyRightYear: number;
  socialMedia: SocialMedia[];
  githubUri: string;

  private socialMedias: SocialMedia[] = [
    {
      "socialId": "LINKEDIN",
      "socialTitle": "LinkedIn",
      "socialIcon": "bi bi-linkedin",
      "socialUrl": socialmedia.LINKEDIN
    }, {
      "socialId": "GITHUB",
      "socialTitle": "GitHub",
      "socialIcon": "bi bi-github",
      "socialUrl": socialmedia.GITHUB
    }, {
      "socialId": "X",
      "socialTitle": "X",
      "socialIcon": "bi bi-twitter-x",
      "socialUrl": socialmedia.X
    }, {
      "socialId": "STACKOVERFLOW",
      "socialTitle": "StackOverflow",
      "socialIcon": "bi bi-stack-overflow",
      "socialUrl": socialmedia.STACKOVERFLOW
    }, {
      "socialId": "PINTEREST",
      "socialTitle": "Pinterest",
      "socialIcon": "bi bi-pinterest",
      "socialUrl": socialmedia.PINTEREST
    }
  ];

  constructor(private socialMediaService: SocialMediaService) {
    socialMediaService.setSocialMedias(this.socialMedias);
    this.socialMedia = socialMediaService.getSocialMedias();
    this.copyRightYear = this.date.getUTCFullYear();
    this.githubUri = socialmedia.GITHUB;
  }
}
