/* eslint-disable no-undef */
// https://codepen.io/dimaslanjaka/pen/LYegjaV
// data timezone load https://momentjs.com/timezone/docs/#/data-loading/
// list timezone https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// require('moment')
// require('moment/min/moment-with-locales');
// require('moment-timezone/builds/moment-timezone-with-data.min');
// const moment = require('moment-timezone');

const moment = require('moment-timezone');

/**
 * start moment timezone script
 */
export function momentTimezonePlayground() {
  if (location.host.includes('cdpn')) console.clear();
}

/**
 * moment format
 * @param {Date|string|number} dateInput
 * @param {string} [custom_pattern]
 * @param {string} [custom_timezone]
 * @returns
 */
export function moment_format(dateInput, custom_pattern, custom_timezone) {
  /**
   * @type {Date}
   */
  let date;
  if (isNumeric(dateInput)) {
    date = moment(dateInput).toDate();
  }
  if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  }
  let value = '';
  if (typeof custom_pattern === 'string' && custom_pattern.length > 0) {
    value = custom_pattern;
  } else if (custom_pattern.value && custom_pattern.value.length > 0) {
    value = custom_pattern.value;
  }
  const date_timezone = document.getElementById('date-timezone');
  let timezone = date_timezone.value.trim();
  if (typeof custom_timezone === 'string' && custom_timezone.length > 0) {
    timezone = custom_timezone;
  }
  return moment(date).tz(timezone).format(value);
}

/**
 * set datetime-local
 * @param {HTMLInputElement} element
 * @param {Date} date
 */
export function setDateLocalValue(element, date) {
  /*const new_date = new Date(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
	const isoString = new_date.toISOString();
	const value = isoString.substring(0, ((isoString.indexOf('T') | 0) + 6) | 0);
	console.log('set value', { isoString, value });*/
  const value = moment_format(date, 'YYYY-MM-DD HH:mm:ss');
  console.log('set value', { value });
  // const nodeName = element.tagName.toLowerCase();
  // if (nodeName === 'select' || (nodeName === 'input' && element.type === 'file')) {
  //   // IE9-IE11, non-IE
  //   // Dispatch change.
  //   const event = new Event('change', { bubbles: true });
  //   event.dispatchEvent(event);
  // }
  element.value = value;
}

export function isNumeric(str) {
  return parseFloat(str) === parseFloat(str);
}

/**
 * Get client side timezone offset from UTC or GMT (for example, UTC+01)
 *
 * @returns {{ offset: string|undefined, timeZone: string|undefined }} (+|-)HH:mm - Where `HH` is 2 digits hours and `mm` 2 digits minutes.
 * @example
 * // From Indian/Reunion with UTC+4
 * // '+04:00'
 * getTimeZone()
 */
export function getTimeZoneOffset() {
  const result = {
    timeZone: undefined,
    offset: undefined
  };
  try {
    result.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (_) {
    //
  }
  const offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
  result.offset = (offset < 0 ? '+' : '-') + ('00' + Math.floor(o / 60)).slice(-2) + ':' + ('00' + (o % 60)).slice(-2);
  return result;
}
