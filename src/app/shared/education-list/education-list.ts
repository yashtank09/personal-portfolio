import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EDUCATION, CERTIFICATES } from '../../core/content';
@Component({
  selector: 'yt-education-list',
  template: `
    <section>
      <h2>Education</h2>
      @for (item of education; track item.degree) {
        <article>
          <p class="mono">{{ item.year }}</p>
          <div>
            <h3>{{ item.degree }}</h3>
            <p>{{ item.institution }}</p>
          </div>
        </article>
      }
    </section>
    <section>
      <h2>Certifications</h2>
      @for (item of certificates; track item.id) {
        <article>
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.issuer }}</p>
            <a class="text-link" [href]="certificateBase + item.id">View certificate ↗</a>
          </div>
        </article>
      }
    </section>
  `,
  styleUrl: './education-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationList {
  readonly education = EDUCATION;
  readonly certificates = CERTIFICATES;
  readonly certificateBase =
    'https://www.coursera.org/account/accomplishments/specialization/certificate/';
}
