import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-confirmation-popup',
    standalone: true,
    templateUrl: './confirmation-popup.component.html',
})
export class ConfirmationPopupComponent implements OnInit, OnDestroy {
    @Input() message = 'Are you sure?';
    @Output() decision = new EventEmitter<boolean>();

    /**
     * Sets the overflow-hidden class on the body when component is initialized.
     * This is necessary to prevent the user from scrolling the page while the popup is open.
     */
    ngOnInit(): void {
        document.body.classList.add('overflow-hidden');
    }

    /**
     * Removes the overflow-hidden class from the body when the component is destroyed.
     * This restores the user's ability to scroll the page after the popup is closed.
     */
    ngOnDestroy(): void {
        document.body.classList.remove('overflow-hidden');
    }

    /**
     * Called when the user clicks outside of the popup.
     * Emits `false` to the `decision` output to cancel the popup.
     * @param event The event that triggered this function.
     */
    protected onBackdropClick(event: MouseEvent) {
        this.decision.emit(false);
    }

    @HostListener('window:keydown.escape')
    onEscape() {
        this.decision.emit(false); // cancel on ESC
    }
}
