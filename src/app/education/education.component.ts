import { Component } from '@angular/core';
import { Achievements, AchievementsService } from '../services/achievements.service';
import { CourseraCertificatesAPI } from '../common';

@Component({
  selector: 'yt-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  private achievements: Achievements[] = [
{ achievementId: '01', achievementTitle: 'Python for Everybody Specialization', certificateId: '5ZHG2JG4V535', achievImgSrc: '../assets/imaages/achievements/PY4E Coursera 5ZHG2JG4V535.jpg', achievDescription: 'Python for Everybody Specialization — University of Michigan, Coursera', achievImgAlter: 'Python for Everybody certificate' },
{ achievementId: '02', achievementTitle: 'Django for Everybody Specialization', certificateId: 'VT9DWX8CEP4Y', achievImgSrc: '../assets/imaages/achievements/DJ4E Coursera VT9DWX8CEP4Y.jpg', achievDescription: 'Django for Everybody Specialization — University of Michigan, Coursera', achievImgAlter: 'Django for Everybody certificate' }
];

  achived: Achievements[] = [];
  private _baseCourseraCertificationApi = CourseraCertificatesAPI;

  constructor(private achievementService: AchievementsService) {
    this.achievementService.setAchievements(this.achievements);
    this.achived = this.achievementService.getAchievements();
  }

  get baseCourseraCertificationApi(): string {
    return this._baseCourseraCertificationApi;
  }
}
