import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Interview } from '../../shared/models/interview';
import { ScheduleInterview } from '../../shared/models/schedule-interview';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiUrl = environment.apiUrl+environment.interviewApiUrl;

  constructor(private http: HttpClient) { }

  getAllInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.apiUrl}/GetAll`);
}

 getInterviewsByCandidateId(): Observable<Interview[]> {
  return this.http.get<Interview[]>(`${this.apiUrl}/GetInterviewCandidateId`);
}
getInterviewsByPanelMember(): Observable<Interview[]> {
  return this.http.get<Interview[]>(`${this.apiUrl}/GetInterviewsByPanelMember`);
}

lockSlot(payload: { slotId: string }): Observable<any> {

  return this.http.put<any>(`${this.apiUrl}/LockSlot`, payload);
}
scheduleInterview(model: ScheduleInterview): Observable<{ interviewId: string }> {
  const url = `${this.apiUrl}/ScheduleInterview`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post<{ interviewId: string }>(url, model, { headers });
}
updateInterviewStatus(interviewId: string, status: string): Observable<any> {
  const params = new HttpParams().set('interviewId', interviewId);
  return this.http.put(`${this.apiUrl}/UpdateStatus`, { status }, { params });
}

getInterviewBySlotId(slotId :string):Observable<Interview>{
  return this.http.get<Interview>(`${this.apiUrl}/GetInterviewBySlotId/${slotId}`);
}

} 
