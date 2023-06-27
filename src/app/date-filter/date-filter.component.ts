import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { faXmark } from '@fortawesome/sharp-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['date-filter.component.sass'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    FontAwesomeModule
  ],
})
export class DateFilterComponent {
  faXmark: IconProp = faXmark;
  // faTimes: IconProp = faTimes;
  
  @Output() closeAppEvent = new EventEmitter<void>();

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  closeApplication() {
    this.closeAppEvent.emit();
  }

  clearFilter() {
    this.range.reset();
  }
}
