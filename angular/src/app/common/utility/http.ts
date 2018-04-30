import { HttpParams } from '@angular/common/http';

export class HttpUtil {
  public static objToParams(obj: Object): HttpParams {
    let params: HttpParams = new HttpParams();
    let keys: string[] = Object.keys(obj);
    for (let i = 0;i < keys.length;++i) {
      let key: string = keys[i];
      let value = obj[key];
      params = params.set(key, value);
    }
    return params;
  }
}
