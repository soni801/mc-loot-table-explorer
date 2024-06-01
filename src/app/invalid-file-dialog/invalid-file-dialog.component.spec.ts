import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFileDialogComponent } from './invalid-file-dialog.component';

describe('InvalidFileDialogComponent', () => {
  let component: InvalidFileDialogComponent;
  let fixture: ComponentFixture<InvalidFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidFileDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
