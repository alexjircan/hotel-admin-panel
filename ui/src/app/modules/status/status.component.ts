import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusService } from './status-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  public temperature$: Observable<number> | undefined;
  constructor(
    public $service: StatusService,
  ) { 
  }

  ngOnInit(): void {
    this.temperature$ =  this.$service.getTemperature();
  }
}
