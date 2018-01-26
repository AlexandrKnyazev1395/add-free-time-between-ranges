const addFreeTimeToRange = require('./index.js').addFreeTimeToRange;

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
const rangeHourStart = 8;
const rangeHourEnd = 23;
const isSplitByHour = true;

const options = {
  rangeHourStart,
  rangeHourEnd,
  timeSlots,
  isSplitByHour
}

const timeSlotsWithFreeTime = addFreeTimeToRange(options);
console.log(timeSlotsWithFreeTime);