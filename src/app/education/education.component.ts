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
    {
      "achievementId": "01",
      "achievementTitle": "Capstone: Retrieving, Processing, and Visualizing Data with Python",
      "certificateId": "6SAWH82R8YKC",
      // "certificateHref": "",
      "achievImgSrc": "../assets/imaages/achievements/Capstone-Retrieving Processing Visualizing Coursera 6SAWH82R8YKC.jpg",
      "achievDescription": "Capstone: Retrieving, Processing, and Visualizing Data with Python on Coursera by Meta 2023",
      "achievImgAlter": "Capstone Project"
    }, {
      "achievementId": "02",
      "achievementTitle": "Introduction to Databases for Back-End Development (By Meta)",
      "certificateId": "62T76L8JN4AY",
      // "certificateHref": "",
      "achievImgSrc": "../assets/imaages/achievements/Database Backend 62T76L8JN4AY.jpg",
      "achievDescription": "Introducation to Database for Back-End Development Certification on Coursera by Meta 2023",
      "achievImgAlter": "Introduction to Database for Back-End"
    }, {
      "achievementId": "03",
      "achievementTitle": "Programming with JavaScript",
      "certificateId": "K5QCA4K7AM5E",
      // "certificateHref": "",
      "achievImgSrc": "../assets/imaages/achievements/Programming with JavaScript Coursera K5QCA4K7AM5E.jpg",
      "achievDescription": "Programming with JavaScript Certification on Coursera by Meta 2023",
      "achievImgAlter": "Programming with JavaScript"
    },{
      "achievementId": "04",
      "achievementTitle": "Django For Everybody (University of Michegan)",
      "certificateId": "VT9DWX8CEP4Y",
      // "certificateHref": "",
      "achievImgSrc": "../assets/imaages/achievements/DJ4E Coursera VT9DWX8CEP4Y.jpg",
      "achievDescription": "Django for Everybody Specialization on Coursera by University of Michigan 2023",
      "achievImgAlter": "Django For EveryBody"
    }, {
      "achievementId": "05",
      "achievementTitle": "Python for Everybody",
      "certificateId": "5ZHG2JG4V535",
      // "certificateHref": "",
      "achievImgSrc": "../assets/imaages/achievements/PY4E Coursera 5ZHG2JG4V535.jpg",
      "achievDescription": "Python for Everybody Specialization on Coursera by University of Michigan 2023",
      "achievImgAlter": "Python for Everybody"
    }
    
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
