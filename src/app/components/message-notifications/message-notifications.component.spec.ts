import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNotificationsComponent } from './message-notifications.component';

describe('MessageNotificationsComponent', () => {
  let component: MessageNotificationsComponent;
  let fixture: ComponentFixture<MessageNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
