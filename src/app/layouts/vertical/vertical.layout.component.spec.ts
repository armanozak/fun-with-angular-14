import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideToolbarColor } from '../toolbar-color';

import { VerticalLayoutComponent } from './vertical.layout.component';

describe('VerticalLayoutComponent', () => {
  let component: VerticalLayoutComponent;
  let fixture: ComponentFixture<VerticalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalLayoutComponent, HttpClientModule],
      providers: [provideToolbarColor()],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
