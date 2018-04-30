import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function appendCSSAddress(cssAddressList: string[]) {
  for (let i = 0;i < cssAddressList.length;++i) {
    let elem: any = document.createElement('link');
    let cssAddress: string = cssAddressList[i];
    elem.setAttribute("href", cssAddress);
    elem.setAttribute("rel", "stylesheet");
    elem.setAttribute("type", "text/css");
    document.head.appendChild(elem);
  }
}

function appendJsAddress(jsAddressList: string[]) {
  for (let i = 0;i < jsAddressList.length;++i) {
    let elem: any = document.createElement('script');
    let cssAddress: string = jsAddressList[i];
    elem.setAttribute("src", cssAddress);
    document.head.appendChild(elem);
  }
}

appendCSSAddress([
  environment.baseUrl + '/static/external/semantic/semantic.min.css'
]);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
