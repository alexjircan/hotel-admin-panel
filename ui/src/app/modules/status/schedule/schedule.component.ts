import { Component, OnInit } from '@angular/core';
import { Subject, map, Observable } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ApiService } from 'src/app/core/api.service';
import { ScheduleService } from './schedule.service';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    }
  ]
})
export class ScheduleComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  refresh = new Subject<void>();

  viewDate: Date = new Date();

  locale: string = 'Ro';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  events$: Observable<CalendarEvent[]> | undefined;

  activeDayIsOpen: boolean = true;

  constructor(private $service: ScheduleService) { 
  }

  ngOnInit(): void {
    this.events$ = this.$service.getEvents();
  }


  createEvent(events: CalendarEvent[]): void {
    const newEvent: CalendarEvent = {
      title: 'Eveniment nou',
      start: startOfDay( new Date() ),
      end: endOfDay( new Date() ),
    }
    this.$service.createEvent(newEvent).subscribe((event: CalendarEvent) => {
      events.push(event);
      this.refreshView();
    })
  }

  deleteEvent(events: CalendarEvent[], event: CalendarEvent): void {
    
  }

  updateEvent(event: CalendarEvent):void {
    this.$service.updateEvent(event).subscribe((resp) => {
      if( resp.status !== 'Updated' ) console.error("Error: ", resp.status);
    });
  }

  refreshView(): void{
    this.refresh.next();
  }

  toDate(val: any) {
    return new Date(val);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log("okok");
  }
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
