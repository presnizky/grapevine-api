import moment from "moment";

export function getPreviousPaymentDate(nextPaymentDate: Date, interval: string): Date {
    const today = new Date();
    const timeDiff = today.getTime() - nextPaymentDate.getTime(); // time difference in milliseconds
    let elapsedIntervals: number;
    switch (interval) {
      case 'monthly':
        elapsedIntervals = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)); // time difference in months
        return new Date(nextPaymentDate.setMonth(nextPaymentDate.getMonth() - elapsedIntervals));
      case 'quarterly':
        elapsedIntervals = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 3)); // time difference in quarters
        return new Date(nextPaymentDate.setMonth(nextPaymentDate.getMonth() - elapsedIntervals * 3));
      case 'annual':
        elapsedIntervals = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365)); // time difference in years
        return new Date(nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() - elapsedIntervals));
      default:
        throw new Error('Invalid interval provided. Must be "monthly", "quarterly", or "annual".');
    }
}

export function generateNextPaymentDates(startDate: Date, interval: string, numberOfDates: number = 1): Date[] {
    const paymentDates: Date[] = [];
    const today = new Date();
    let date = new Date(startDate);

    for (let i = 0; i < numberOfDates; i++) {
      date = incrementDate(date, interval);
      paymentDates.push(date);
    }
  
    return paymentDates;
  }

export function incrementDate(date: Date, interval: string): Date {
    const nextDate = new Date(date);
  
    switch (interval) {
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;
      case 'annual':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }
  
    return nextDate;
  }

  export function isSameDate(date1: Date, date2: Date): boolean {
    const moment1 = moment(date1);
    const moment2 = moment(date2);
    return moment1.isSame(moment2, 'day') && moment1.isSame(moment2, 'month') && moment1.isSame(moment2, 'year');
  }
  