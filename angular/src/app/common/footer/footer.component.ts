import { Component, OnInit, Input } from '@angular/core';

import { environment } from './../../../environments/environment';
import { ArrayUtil } from '../../common/utility/array';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // 노출 여부
  baseUrl: string = environment.baseUrl;

  @Input()
  pType: number = 0;

  // UTIL
  arrayUtil: any = ArrayUtil;

  constructor() { }

  ngOnInit() {
  }

}
