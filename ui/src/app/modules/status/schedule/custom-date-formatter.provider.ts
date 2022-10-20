import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    const stringDate = formatDate(date, 'EEEE', locale as string);
    return stringDate.charAt(0).toUpperCase() + stringDate.slice(1);
  }
}