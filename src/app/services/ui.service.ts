import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TempUnit, UiState } from '../models/ui.model';
import { map } from 'rxjs/operators';

let state: UiState = {
  unit: 'C',
};

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private storageKey = 'ui_state';
  private store: BehaviorSubject<UiState> = new BehaviorSubject<UiState>(state);
  tempUnitState$: Observable<TempUnit> = this.store
    .asObservable()
    .pipe(map((state) => state.unit));

  constructor() {
    this.initState();
  }

  initState(): void {
    const uiState = window.localStorage.getItem(this.storageKey);
    if (uiState) {
      state = JSON.parse(uiState);
      this.store.next(state);
    }
  }

  updateUnits(newUnit: TempUnit): void {
    state = { ...state, unit: newUnit };
    this.store.next(state);
    window.localStorage.setItem(this.storageKey, JSON.stringify(state));
  }
}
