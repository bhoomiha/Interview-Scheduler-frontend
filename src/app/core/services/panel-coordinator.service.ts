import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapPanelMembers } from '../../shared/models/mapped-panel-members';
import { PanelWindow } from '../../shared/models/panel-window';
import { PanelMembers } from '../../shared/models/panelmembers';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../shared/models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class PanelCoordinatorService {
  private readonly apiUrl = environment.apiUrl+ environment.panelCoordinatorApiUrl;

  constructor(private readonly http: HttpClient) {}


  getAllPanelMembers(): Observable<PanelMembers[]> {
    return this.http.get<PanelMembers[]>(`${this.apiUrl}/GetAllPanelMembers`);
  }

  getAllMappedPanelMembers(): Observable<MapPanelMembers[]> {
    return this.http.get<MapPanelMembers[]>(`${this.apiUrl}/GetAllMappedPanelMembers`);
  }
  
  mapPanelMembers(mapPanelMember: MapPanelMembers): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/MapPanelMember`, mapPanelMember);
  }

  unMapPanelMembers(panelMemberName: string): Observable<unknown> {
    const url = `${this.apiUrl}/UnMapPanelMember?panelMemberName=${encodeURIComponent(panelMemberName)}`;
    return this.http.post(url, {}); // Empty body as API doesn't expect one
  }
  
  

  allocatePanelWindow(panel: PanelWindow): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.apiUrl}/AllocatePanelWindow`, panel);
  }

  getAllPanelWindows(): Observable<PanelWindow[]> {
    return this.http.get<PanelWindow[]>(`${this.apiUrl}/AllPanelWindows`);
  }

  getPanelWindow(panelWindowId: string | undefined): Observable<PanelWindow> {
    if (!panelWindowId) {
      throw new Error('panelWindowId is required');
    }
    return this.http.get<PanelWindow>(`${this.apiUrl}/PanelWindow`, { params: { panelWindowId } });
  }
  

}
