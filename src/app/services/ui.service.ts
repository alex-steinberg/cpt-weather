import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TempUnit, UiState } from '../models/ui.model';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

let state: UiState = {
  unit: 'metric',
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

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
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

  async showAlert(options: {
    header?: string;
    message: string;
    buttons: any[];
  }): Promise<any> {
    const { header, message, buttons = ['OK'] } = options;
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });

    await alert.present();

    return alert;
  }

  async showToast(options: {
    header?: string;
    message: string;
    duration?: number;
    buttons?: any[];
    position?: 'top' | 'bottom' | 'middle';
  }): Promise<any> {
    const {
      header,
      message,
      position = 'top',
      buttons = null,
      duration = 0, // Ionic default
    } = options;
    return await this.toastController.create({
      header,
      message,
      position,
      buttons,
      duration,
      color: 'primary',
    });
  }
}
