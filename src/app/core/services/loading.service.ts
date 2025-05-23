import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = signal<boolean>(false); // Using Angular signals

  show(): void {
    this.loading.set(true);  //  Set loading to true
  }

  hide(): void {
    this.loading.set(false); // Set loading to false
  }

  get isLoading(): Signal<boolean> {
    return this.loading.asReadonly(); // : Provide read-only access
  }
}
