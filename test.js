const addFreeTimeBetweenRanges = require('./index.js').addFreeTimeBetweenRanges;

const timeSlots = [
    {
      "id": "1",
      "dateStart": "2018-01-25T10:06:44.063Z",
      "dateEnd": "2018-01-25T12:06:44.063Z",
    },
    {
      "id": "2",
      "dateStart": "2018-01-25T13:06:44.063Z",
      "dateEnd": "2018-01-25T14:06:44.063Z",
    },
    {
      "id": "3",
      "dateStart": "2018-01-25T14:06:44.063Z",
      "dateEnd": "2018-01-25T14:36:44.063Z",
    },
    {
      "id": "4",
      "dateStart": "2018-01-25T15:00:00.063Z",
      "dateEnd": "2018-01-25T17:00:00.063Z",
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