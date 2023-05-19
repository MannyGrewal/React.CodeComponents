import { IDocumentCardActionsProps } from '@fluentui/react';
import moment, { Moment } from 'moment';
import { IAction } from '../utils/interfaces';

export const getFormattedDate = (date: Date): string => {
  const now: Moment = moment();
  let formattedTime: string;

  if (now.diff(date, 'months') < 3) {
    formattedTime = moment(date).fromNow();
  } else {
    formattedTime = moment(date).format('MMM D, YYYY');
  }
  return formattedTime;
};

export const getDuration = (startDate: Date, endDate: Date): string => {
  const start = moment(startDate);
  const end = moment(endDate);
  const diff = moment.duration(end.diff(start));
  return diff.humanize();
};

export const formatDateTime = (date: Date, onlyDatePart?: boolean): string => {

  const formattedTime = onlyDatePart ? moment(date).format('MMM Do') : moment(date).format('MMM D, YYYY h:mm A');
  return formattedTime;
};


export const findMinMaxDates = (items: IAction[]): { minDate: Date | null; maxDate: Date | null } => {
  if (items.length === 0) {
    return { minDate: null, maxDate: null };
  }

  if (items.length === 1) {
    return { minDate: items[0].time, maxDate: items[0].time };
  }

  return items.reduce(
    (result, item) => {
      if (item.time < result.minDate) {
        result.minDate = item.time;
      }

      if (item.time > result.maxDate) {
        result.maxDate = item.time;
      }

      return result;
    },
    { minDate: items[0].time, maxDate: items[0].time }
  );
}