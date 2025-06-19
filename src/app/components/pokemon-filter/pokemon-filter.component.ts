import { Component, Output, EventEmitter, signal, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Composant de filtre pour la liste de Pokémons.
 * Permet de rechercher par nom, filtrer par type et trier par ordre alphabétique.
 */
@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-filter.component.html'
})
export class PokemonFilterComponent {
  /**
   * Liste des types de Pokémons disponible pour le filtre.
   * Reçue depuis le composant parent.
   */
  @Input() types: string[] = [];

  /** Signal contenant le texte de recherche saisi. */
  readonly search = signal('');

  /** Signal du type actuellement sélectionné. */
  readonly selectedType = signal('');

  /** Signal de l'ordre de tri sélectionné ('asc' ou 'desc'). */
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  /**
   * Événement émis à chaque changement de filtre (recherche, type ou tri).
   * @event
   */
  @Output() filterChanged = new EventEmitter<{
    search: string;
    selectedType: string;
    sortOrder: 'asc' | 'desc';
  }>();

  /**
   * Gère la mise à jour du texte de recherche et émet l'événement de filtre.
   * @param event Événement de saisie sur le champ texte
   */
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.emitChange();
  }

  /**
   * Gère la sélection d'un type et émet l'événement de filtre.
   * @param event Événement de sélection sur le select
   */
  onTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedType.set(value);
    this.emitChange();
  }

  /**
   * Gère la sélection de l'ordre de tri et émet l'événement de filtre.
   * @param order Ordre de tri sélectionné : 'asc' ou 'desc'
   */
  onSort(order: 'asc' | 'desc') {
    this.sortOrder.set(order);
    this.emitChange();
  }

  /**
   * Émet l'événement `filterChanged` avec les valeurs actuelles des filtres.
   * Méthode appelée en interne après chaque modification.
   */
  private emitChange() {
    this.filterChanged.emit({
      search: this.search(),
      selectedType: this.selectedType(),
      sortOrder: this.sortOrder(),
    });
  }
}
