import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpUtil } from '../common/utility/http';

@Injectable()
export class StatusService {
  url: string = environment.baseUrl + '/api/status';

  constructor(private http: HttpClient) {
  }

  get(rParams: Object) {
    return this.http.get(this.url, {params: HttpUtil.objToParams(rParams)});
  }
}
