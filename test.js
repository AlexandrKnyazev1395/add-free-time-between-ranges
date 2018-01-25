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
      "dateEnd": "2018-01-26T14:36:44.063Z",
    },
    {
      "id": "4",
      "dateStart": "2018-01-27T15:00:00.654Z",
      "dateEnd": "2018-01-27T17:00:00.654Z",
    }
]
const rangeHourStart = 8;
const rangeHourEnd = 23;

const options = {
  rangeHourStart,
  rangeHourEnd,
  timeSlots
}

const timeSlotsWithFreeTime = addFreeTimeToRange(options)