import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, it, expect } from 'vitest';
import { routes } from './app.routes';
describe('Lazy navigation', () => {
  it('renders project data and routes missing URLs to the recovery page', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/trade-journal');
    expect(harness.routeNativeElement?.textContent).toContain('FIFO');
    await harness.navigateByUrl('/projects/sievex');
    expect(harness.routeNativeElement?.textContent).toContain('Sievex');
    await harness.navigateByUrl('/missing-page');
    expect(harness.routeNativeElement?.textContent).toContain('A missing connection.');
  });
});
