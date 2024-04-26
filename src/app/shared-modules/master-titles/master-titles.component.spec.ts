import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTitlesComponent } from './master-titles.component';

describe('MasterTitlesComponent', () => {
  let component: MasterTitlesComponent;
  let fixture: ComponentFixture<MasterTitlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterTitlesComponent]
    });
    fixture = TestBed.createComponent(MasterTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
