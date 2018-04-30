import { Component } from '@angular/core';

import { StatusService } from './service/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StatusService
  ]
})
export class AppComponent {
  pType: number = 0;
  constructor(
    private statusService: StatusService
  ) {
    statusService.get({}).subscribe(data => {
      console.log(data);
    });
  }
}
