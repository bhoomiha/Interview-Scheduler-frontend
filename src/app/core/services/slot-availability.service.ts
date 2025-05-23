import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SlotTA } from '../../shared/models/slotTA';

@Injectable({
  providedIn: 'root'
})
export class SlotAvailabilityService {
  private readonly apiUrl = 'https://localhost:5001/api/SlotAvailability'
  
  constructor(private http: HttpClient) { }
      getAllSlot():Observable<SlotTA[]>{
        return this.http.get<SlotTA[]>(`${this.apiUrl}/AllSlots`);
      }

      // updateSlotStatus(slotId: string, status: string): Observable<any> {
      //   return this.http.patch(`${this.apiUrl}/UpdateSlotStatus?slotId=${slotId}&status=${status}`, {}); 
      // }

      updateSlotStatus(slotId: string, status: string): Observable<unknown> {
        return this.http.patch(`${this.apiUrl}/UpdateSlotStatus?slotId=${slotId}&status=${status}`, {}, {
          responseType: 'text' as 'json' //  Tell Angular to treat text as JSON to suppress error
        });
      }
      
}
