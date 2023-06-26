import { Component, EventEmitter, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/sharp-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  faMagnifyingGlass: IconProp = faMagnifyingGlass;
  isInputFocused: boolean = false;

  @Output() searchTerm = new EventEmitter<string>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTerm.emit(filterValue.trim().toLowerCase());
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }
}
