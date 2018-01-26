const addFreeTimeBetweenRanges = require('./index.js').addFreeTimeBetweenRanges;

const timeSlots = [
    {
      "id": "1",
      "dateStart": "2018-01-26T10:06:44.063Z",
      "dateEnd": "2018-01-26T12:06:44.063Z",
    },
    {
      "id": "2",
      "dateStart": "2018-01-26T13:06:44.063Z",
      "dateEnd": "2018-01-26T14:06:44.063Z",
    },
    {
      "id": "3",
      "dateStart": "2018-01-26T14:06:44.063Z",
      "dateEnd": "2018-01-26T14:36:44.063Z",
    },
    {
      "id": "4",
      "dateStart": "2018-01-26T15:00:00.063Z",
      "dateEnd": "2018-01-26T17:00:00.063Z",
    }
]
const rangeDateStart = new Date(new Date().setHours(8,0,0,0)).toISOString();
const rangeDateEnd = new Date(new Date().setHours(23,0,0,0)).toISOString();
const isSplitByHour = true;

const options = {
  rangeDateStart,
  rangeDateEnd,
  timeSlots,
  isSplitByHour
}

const timeSlotsWithFreeTime = addFreeTimeBetweenRanges(options);
console.log(timeSlotsWithFreeTime);