import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryStatistics } from '../models/stat-model';
import { StateService } from '@root/shared/services/state.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {

  statData: LibraryStatistics | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private stateService: StateService) {}

  ngOnInit(): void {
    this.activatedRoute
        .data
        .subscribe(({data}) => {
          this.statData = data;
          this.stateService.setValue(this.statData?.total ?? 0);
        } )
  }
}
