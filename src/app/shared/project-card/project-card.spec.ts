import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from './project-card';
import { PROJECTS } from '../../core/content';
describe('Project presentation', () => {
  it('links to a permanent case study and only renders an available repository', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])],
    }).compileComponents();
    const f = TestBed.createComponent(ProjectCard);
    f.componentRef.setInput('project', PROJECTS[0]);
    f.detectChanges();
    const el = f.nativeElement as HTMLElement;
    expect(el.querySelector('h3 a')?.getAttribute('href')).toBe('/projects/trade-journal');
    expect(el.textContent).toContain('FIFO');
    f.componentRef.setInput('project', PROJECTS[2]);
    f.detectChanges();
    expect(el.querySelector('a[href^="https://github.com"]')).toBeNull();
  });
});
