import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import { Role } from '../../shared/Role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl+ environment.UserapiUrl;
  private roleApiUrl = environment.apiUrl+ environment.roleApiUrl;

  constructor(private http: HttpClient) {}

  // Get All Users */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Create User 
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /// Update User 
  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  /// Delete User 
  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleApiUrl);
  }


  // Create Role 
  createRole(roleName: string): Observable<Role> {
    return this.http.post<Role>(this.roleApiUrl, { roleName });
  }
}
