import { Injectable } from '@angular/core';

export interface Achievements {
  achievementId: string;
  achievementTitle: string;
  achievImgSrc: string;
  certificateId: string;
  //certificateHref: string;
  achievDescription: string;
  achievImgAlter: String;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  private achievements: Achievements[] = [];

  constructor() { }

  getAchievements(): Achievements[] {
    return [...this.achievements];
  }

  setAchievements(achievements: Achievements[]): void {
    this.achievements = achievements.slice();
  }
}
