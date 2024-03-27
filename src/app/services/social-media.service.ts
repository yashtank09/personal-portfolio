import { Injectable } from '@angular/core';
import { socialmedia } from '../common';

export interface SocialMedia {
  socialId: string;
  socialTitle: string;
  socialIcon: string;
  socialUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private socialMedias: SocialMedia[] = [];

  constructor() { }

  getSocialMedias() : SocialMedia[] {
    return [...this.socialMedias];
  }

  setSocialMedias(socialMedia: SocialMedia[]): void {
    this.socialMedias = socialMedia.slice();
  }
}