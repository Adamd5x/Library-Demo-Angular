import { Component,
         Input,
         OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { NavigationCancel,
         NavigationEnd,
         NavigationError,
         NavigationStart,
         Router } from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {

  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOngoing = false;

  constructor(public loadingService: LoadingService,
              private router: Router){}

  ngOnInit(): void {
    if (this.detectRoutingOngoing) {
      this.router.events.subscribe(
        event => {
          if (event instanceof NavigationStart) {
            this.loadingService.loadingOn();
          } else if (event instanceof NavigationEnd ||
                     event instanceof NavigationError ||
                     event instanceof NavigationCancel
          ) {
            this.loadingService.loadingOff();
          }
        }
      );
    }
  }
}
