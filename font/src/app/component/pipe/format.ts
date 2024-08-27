import { DatePipe } from '@angular/common';
export class formatDateTime {
  constructor(private datePipe: DatePipe) {}
  formatDate(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
  }
}
