import { Component, OnInit, HostListener, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from '../../../environments/environment';
import { ArrayUtil } from '../../common/utility/array';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('focusSearch', [
      state('focus', style({
        width: '180px'
      })),
      state('blur', style({
        width: '120px'
      })),
      transition('* => *', animate(100))
    ]),
    trigger('scrollOffset', [
      state('up', style({
        height: '60px',
        display: 'block'
      })),
      state('down', style({
        height: '0px',
        opacity: 0,
        display: 'none'
      })),
      transition('* => *', animate(100))
    ]),
  ]
})
export class NavbarComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  @Input()
  pType: number = 0;

  focusSearchState: string = 'blur'; // focus or blur
  scrollOffsetState: string = 'up'; // up or down
  prevScrollOffset: number = 0;

  // UTIL
  arrayUtil: any = ArrayUtil;

  constructor() { }

  ngOnInit() {
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event: any) {
    let scrollOffset: number = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    if (this.prevScrollOffset <= scrollOffset) {
      this.scrollOffsetState = 'down';
    } else {
      this.scrollOffsetState = 'up';
    }
    this.prevScrollOffset = scrollOffset;
  }

}
