import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurpriseRecipesComponent } from './surprise-recipes.component';

describe('SurpriseRecipesComponent', () => {
  let component: SurpriseRecipesComponent;
  let fixture: ComponentFixture<SurpriseRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurpriseRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurpriseRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
