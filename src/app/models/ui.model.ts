export type TempUnit = 'C' | 'F';

export interface UiState {
  unit: TempUnit;
}

export interface TempToggleEvent {
  detail: GenericEvent;
}

interface GenericEvent {
  value: any;
}
