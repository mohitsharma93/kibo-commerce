import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-filter-input',
    standalone: true,
    templateUrl: './filter-input.component.html',
    imports: [CommonModule, FormsModule],
    host: {
        'data-testid': 'filter-input-component',
    },
})
export class FilterInputComponent {
    // …
    // public searchTerm: string = '';

    public searchTerm = signal('');

    protected emitSearchTerm() {
        // Emit the search term to the parent component
        // This could be done using an EventEmitter or a service
        console.log('Search Term:', this.searchTerm);
    }
}