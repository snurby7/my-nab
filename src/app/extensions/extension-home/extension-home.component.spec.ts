import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionHomeComponent } from './extension-home.component';

describe('ExtensionHomeComponent', () => {
  let component: ExtensionHomeComponent;
  let fixture: ComponentFixture<ExtensionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
