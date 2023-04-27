import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateRecipeComponent } from './edit-create-recipe.component';

describe('EditCreateRecipeComponent', () => {
  let component: EditCreateRecipeComponent;
  let fixture: ComponentFixture<EditCreateRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCreateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
