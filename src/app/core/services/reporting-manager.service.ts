import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SlotDetails } from '../../shared/models/slot-details';
import { BaseResponse } from '../../shared/models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportingManagerService {

  private readonly apiUrl = environment.apiUrl+ environment.reportingManagerApiUrl;

  constructor(private readonly http: HttpClient) { }

  getTeamMembersSlot(): Observable<SlotDetails[]> {
    return this.http.get<SlotDetails[]>(`${this.apiUrl}/reporting-manager`);
  }
  
  updateSlotStatus(slotId: string, status: string): Observable<BaseResponse> {
    return this.http.put<BaseResponse>(`${this.apiUrl}/ApproveSlot?SlotId=${slotId}`, { status });
  }
}
