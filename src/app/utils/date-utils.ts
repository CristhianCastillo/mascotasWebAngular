import {DateConvert} from '@models/DateConvert';
import {HourConvert} from '@models/HourConvert';

export class DateUtils {

  static dateJsonToDate(jsonDate: any): Date {
      return new Date(Date.UTC(jsonDate.year, jsonDate.month - 1, jsonDate.day, 1, 0, 0, 0));
  }

  static dateHourToDate(jsonDate: any, jsonHour: any): Date {
    return new Date(Date.UTC(jsonDate.year, jsonDate.month - 1, jsonDate.day, jsonHour.hour, jsonHour.minute, 0, 0));
  }

  static dateStringToDate(date: string): Date {
    return new Date(date);
  }

  static hourConvertToDateString(hour: HourConvert): string {
    let date: Date = new Date(Date.UTC(2000, 2, 2, hour.hour, hour.minute, 0, 0));
    return date.toISOString().slice(11, 16);
  }

  static dateToDateConvert(date: Date): DateConvert {
    let dateConvert: DateConvert = new DateConvert();
    dateConvert.year = date.getUTCFullYear();
    dateConvert.month = (date.getUTCMonth() + 1);
    dateConvert.day = date.getUTCDate();
    return dateConvert;
  }

  static dateStringToHourConvert(date: string): HourConvert {
    let hourConvert: HourConvert = new HourConvert();
    let hora: string[] = date.split(' ');
    let parts: string[] = hora[1].split(':');
    hourConvert.hour = Number(parts[0]);
    hourConvert.minute = Number(parts[1]);
    return hourConvert;
  }

  static dateStringToHourString(date: string): string {
    return date.slice(11, 16);
  }
}
