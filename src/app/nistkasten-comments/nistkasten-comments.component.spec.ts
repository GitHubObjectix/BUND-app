import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NistkastenCommentsComponent } from './nistkasten-comments.component';

describe('NistkastenCommentsComponent', () => {
  let component: NistkastenCommentsComponent;
  let fixture: ComponentFixture<NistkastenCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NistkastenCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NistkastenCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
