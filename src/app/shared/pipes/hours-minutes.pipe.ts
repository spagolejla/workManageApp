import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutes'
})
export class HoursMinutesPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value && isNaN(value) || value && value < 0) {
      return 'Invalid';
    }

    if (value) {
      const hours = Math.floor(value);
      const minutes = Math.round((value - hours) * 60);
  
      return `${hours} hours ${minutes} minutes`;
    }

    return '0 hours'
 
  }

}
