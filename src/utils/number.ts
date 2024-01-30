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

export const formatNumber = (num: number) => {
  const str = num.toString();

  const parts = str.split('.');

  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return parts.join('.');
};

export const formatNumberWithSuffix = (number: number): string => {
  if (number === 0) {
    return '0';
  }

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const suffixIndex = Math.floor(Math.log10(number) / 3);
  const formattedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(0);
  return formattedNumber + suffixes[suffixIndex];
};

export const convertNumberToString = (num: number): string => {
  if (num > 99) {
    return '99+';
  } else {
    return num.toString();
  }
};
