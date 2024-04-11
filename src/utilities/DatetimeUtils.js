
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const date = new Date();
const Today = date.toLocaleDateString('en-US', {
  weekday: 'long',
});
const MonthYear = date.toLocaleDateString('en-US', {
  day:'2-digit',
  month: 'short',
  year:'numeric'
});

const getWeekDays=()=> {
  const dayInAWeek = new Date().getDay();
  const days = DAYS.slice(dayInAWeek, DAYS.length).concat(
    DAYS.slice(0, dayInAWeek)
  );
  return days;
}

const getDayMonthFromDate=()=> {
  const month = MONTHS[date.getMonth()].slice(0, 3);
  const day = date.getUTCDate();

  return day + ' ' + month;
}

const transformDateFormat=()=> {
  const month = date.toLocaleString('en-US', { month: '2-digit' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const newFormatDate = year.toString().concat('-', month, '-', day, ' ', time);
  return newFormatDate;
}
export {Today,MonthYear,getWeekDays,getDayMonthFromDate,transformDateFormat}



