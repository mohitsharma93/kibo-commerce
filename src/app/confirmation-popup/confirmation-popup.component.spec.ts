import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationPopupComponent } from './confirmation-popup.component';
import { By } from '@angular/platform-browser';

describe('ConfirmationPopupComponent', () => {
  let fixture: ComponentFixture<ConfirmationPopupComponent>;
  let component: ConfirmationPopupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Ensure document body is cleaned up after each test
    document.body.classList.remove('overflow-hidden');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add overflow-hidden to body on init', () => {
    expect(document.body.classList.contains('overflow-hidden')).toBeTrue();
  });

  it('should remove overflow-hidden from body on destroy', () => {
    fixture.destroy();
    expect(document.body.classList.contains('overflow-hidden')).toBeFalse();
  });

  it('should emit false on backdrop click', () => {
    spyOn(component.decision, 'emit');
    const fakeMouseEvent = new MouseEvent('click');
    component.onBackdropClick(fakeMouseEvent);
    expect(component.decision.emit).toHaveBeenCalledWith(false);
  });

  it('should emit false on Escape key press', () => {
    spyOn(component.decision, 'emit');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.decision.emit).toHaveBeenCalledWith(false);
  });
});
