import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, tap, map} from 'rxjs/operators';
import { Platform } from '@ionic/angular';


const JWT_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  token : string;
  _storage: Storage;

  private user = new BehaviorSubject(null);

  constructor(private http : HttpClient) {
              

   }


  uploadPhofilephoto(param: any){
    
    return this.http.post(`${environment.apiUrl}/upload-profile-photo`, {file : param});
  }
  
}
