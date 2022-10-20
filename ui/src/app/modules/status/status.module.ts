import { NgModule } from '@angular/core';
import localeRo from '@angular/common/locales/ro';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { StatusComponent } from './status.component';
import { StatusService } from './status-service.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleComponent } from './schedule/schedule.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleService } from './schedule/schedule.service';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

registerLocaleData(localeRo);

@NgModule({
  declarations: [StatusComponent, ScheduleComponent],
  imports: [
    AngularSvgIconModule.forRoot(), 
    HttpClientModule, 
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [StatusService, ScheduleService],
})
export class StatusModule {}
