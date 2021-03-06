import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {QueryAdressInterface} from '../../interfaces/query-adress.interface';
import {RequestAdress} from '../../models/request-adress.model';
import {AuthService} from '../../app/auth/auth.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * creates header with current session bearer token authorization
   */
  public static createHeaderToken(): {headers: HttpHeaders} {
    console.log('token', DataService.getUserToken());
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
  }


  /**
   * makes request to the back-end server with given path
   * @param path
   * @param headers
   */
  public get(path: string[], headers?) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    console.log('Query(get) to: ' + query);
    console.log('Query(get) header: ', headers);
    if (headers) {
      return this.http.get(query, headers);
    } else {
      return this.http.get(query);
    }
  }

  /**
   * makes PUT request to the back-server with given params
   * @param path: string[]
   * @param obj: JSON object
   * @param httpOptions: JSON headers
   */
  public put<T>(path: string[], obj: T, httpOptions) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    console.log('Query(put) to: ' + query);
    console.log('Query(put) header: ', httpOptions);
    console.log('Query(put) object:');
    console.log(obj);
    console.log(JSON.stringify(obj));
    return this.http.put(query, obj, httpOptions);
  }

  public delete<T>(path: string[], httpOptions) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    console.log('Query(delete) to: ' + query);
    console.log('Query(delete) header: ', httpOptions);
    return this.http.delete(query, httpOptions);
  }

  /**
   * makes post request to the back-end server with given path
   * and send data, stored in the @object
   * @param path
   * @param obj
   * @param httpOptions
   */
  public post<T>(path: string[], obj: T, httpOptions) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    console.log('Query(post) to: ' + query);
    console.log('Query(post) header: ', httpOptions);
    console.log('Query(post) object:');
    console.log(obj);
    console.log(JSON.stringify(obj));
    return this.http.post(query, obj, httpOptions);
  }

  /**
   *
   * @param adr
   */
  private buildRequest(adr: QueryAdressInterface): string {
    let res;
    if (adr.port) {
      res = adr.host + ':' + adr.port;
    } else {
      res = adr.host;
    }
    adr.path.forEach(
      (section) => {
        res += '/' + section;
      }
    );
    return res;
  }
}
