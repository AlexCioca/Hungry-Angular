import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRecipesComponent } from './users-recipes.component';

describe('UsersRecipesComponent', () => {
  let component: UsersRecipesComponent;
  let fixture: ComponentFixture<UsersRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
