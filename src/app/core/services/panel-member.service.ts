import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PanelWindow } from '../../shared/models/panel-window';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SlotDetails } from '../../shared/models/slot-details';
import { CreateSlotDTO, Slot } from '../../shared/models/slot';

@Injectable({
  providedIn: 'root'
})
export class PanelMemberService {
  private readonly apiUrl = environment.apiUrl+environment.panelMemberApiUrl; 

  constructor(private readonly http: HttpClient) {}

  createSlot(slot: CreateSlotDTO): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/CreateSlot`, slot);
  }


  getSlots(): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiUrl}/GetSlots`);
  }

  getPanelWindows(): Observable<PanelWindow[]> {
    return this.http.get<PanelWindow[]>(`${this.apiUrl}/GetPanelWindow`);
  } 

}
