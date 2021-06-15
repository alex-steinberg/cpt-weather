export type TempUnit = 'metric' | 'imperial';

export interface UiState {
  unit: TempUnit;
}

export interface TempToggleEvent {
  detail: GenericEvent;
}

interface GenericEvent {
  value: any;
}
