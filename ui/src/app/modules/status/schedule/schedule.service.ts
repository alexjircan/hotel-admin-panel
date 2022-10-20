import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/api.service";
import {map, tap} from 'rxjs';
import { CalendarEvent } from "angular-calendar";

@Injectable({
    providedIn: 'root',
})
export class ScheduleService{
    constructor(private $api: ApiService) { }

    createEvent(event: CalendarEvent){
      return this.$api.post('/create-event', event).pipe(
        map( (result: CalendarEvent) => {
          return {
            id: result.id,
            title: result.title,
            start: new Date(result.start),
            end: new Date(result.end || new Date()),
          }
        }  )
      );
    }

    updateEvent(event: CalendarEvent){
      return this.$api.post('/update-event', event);
    }

    getEvents(){
        return this.$api.get('/events').pipe(
          map((results: any[]) => {
            return results.map( (result: any) => {
              return {
                id: result.id,
                title: result.title,
                start: new Date( result.start ),
                end: new Date(result.end || new Date()),
              };
            });
          }),
          tap(results => results.sort((a , b) => new Date(a.start).getTime() - new Date(b.start).getTime()))
        );
      }
}