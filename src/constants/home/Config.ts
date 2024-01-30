// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const AWAY_FROM = (distance: string) =>
  __('%s away from', [distance], languageCode);

export const NEW_STORIES = __('New stories', [], languageCode);

export const CURRENTLY_ONLINE = __('Currently online: ', [], languageCode);

export const MUTUAL = __('Mutual', [], languageCode);

export const NEW = __('New', [], languageCode);

export const SECOND_AGO = (second: number) =>
  __('%d second ago', [second], languageCode);

export const SECONDS_AGO = (seconds: number) =>
  __('%d seconds ago', [seconds], languageCode);

export const MINUTE_AGO = (minute: number) =>
  __('%d minute ago', [minute], languageCode);

export const MINUTES_AGO = (minutes: number) =>
  __('%d minutes ago', [minutes], languageCode);

export const HOUR_AGO = (hour: number) =>
  __('%d hour ago', [hour], languageCode);

export const HOURS_AGO = (hours: number) =>
  __('%d hours ago', [hours], languageCode);

export const DAY_AGO = (day: number) => __('%d day ago', [day], languageCode);

export const DAYS_AGO = (days: number) =>
  __('%d days ago', [days], languageCode);

export const WEEK_AGO = (week: number) =>
  __('%d week ago', [week], languageCode);

export const WEEKS_AGO = (weeks: number) =>
  __('%d weeks ago', [weeks], languageCode);

export const MONTH_AGO = (month: number) =>
  __('%d month ago', [month], languageCode);

export const MONTHS_AGO = (months: number) =>
  __('%d months ago', [months], languageCode);

export const YEAR_AGO = (year: number) =>
  __('%d year ago', [year], languageCode);

export const YEARS_AGO = (years: number) =>
  __('%d years ago', [years], languageCode);

export const UPLOAD_UP_TO_MAX_IMAGES = __(
  'Upload up to 9 images',
  [],
  languageCode,
);
