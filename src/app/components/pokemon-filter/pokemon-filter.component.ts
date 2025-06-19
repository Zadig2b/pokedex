import { Component, Output, EventEmitter, signal, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-filter.component.html'
})
export class PokemonFilterComponent {
  // Liste des types reçue depuis le parent
  @Input() types: string[] = [];

  // Signaux internes
  readonly search = signal('');
  readonly selectedType = signal('');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  @Output() filterChanged = new EventEmitter<{
    search: string;
    selectedType: string;
    sortOrder: 'asc' | 'desc';
  }>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.emitChange();
  }

  onTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedType.set(value);
    this.emitChange();
  }

  onSort(order: 'asc' | 'desc') {
    this.sortOrder.set(order);
    this.emitChange();
  }

  private emitChange() {
    this.filterChanged.emit({
      search: this.search(),
      selectedType: this.selectedType(),
      sortOrder: this.sortOrder(),
    });
  }
}
