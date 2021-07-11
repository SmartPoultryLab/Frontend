
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, ViewChild, OnInit, forwardRef, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.scss'],
})
export class MultiselectAutocompleteComponent implements OnInit {
  @Input() allValues: string[]=[];
  @Input() name:string ="";
  @Input() selectedValues:string[] =[];
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  valuesCtrl = new FormControl();
  filteredValues: Observable<string[]>;
  @Output() onDataChanged = new EventEmitter<any>();
  @ViewChild('valueInput', {static: false}) valueInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor() {
    this.filteredValues = this.valuesCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.allValues.slice()));
  }

  ngOnInit(): void {

    }
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        const newvalue = value.trim()
        this.selectedValues.push(newvalue);
        this.onDataChanged.emit(this.selectedValues);
        console.log('here')
        this.allValues = this.remove_from_array(newvalue,this.allValues)

      }
      if (input) {
        input.value = '';
      }
      this.valuesCtrl.setValue(null);
    }
  }

  remove(value: string): void {
    const index = this.selectedValues.indexOf(value);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    }
    this.onDataChanged.emit(this.selectedValues);
    this.allValues.push(value);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedValues.push(event.option.viewValue);
    this.allValues = this.remove_from_array(event.option.viewValue,this.allValues)
    this.onDataChanged.emit(this.selectedValues);
    this.valueInput.nativeElement.value = '';
    this.valuesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allValues.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private remove_from_array(item,array):[]{
    return array.filter(obj => obj !== item);
  }

}
