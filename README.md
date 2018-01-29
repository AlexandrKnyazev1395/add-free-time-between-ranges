# add-free-time-between-ranges
The module is needed to find free time between some ranges of dates lying within one day, between the specified hours.

````
npm install --save add-free-time-between-ranges
````

CommonJS:
````
const addFreeTimeBetweenRanges = require('add-free-time-between-ranges').addFreeTimeBetweenRanges;
````

or in ES6
````
import { addFreeTimeBetweenRanges } from 'add-free-time-between-ranges'
````

You need to provide in function these arguments: 

1) timeSlots - this is array contains elements which have dateStart and dateEnd properties in ISOString format.

````
const timeSlots = [
    {
      "id": "1",
      "dateStart": "2018-01-28T10:06:44.063Z",
      "dateEnd": "2018-01-28T12:06:44.063Z",
    },
    {
      "id": "2",
      "dateStart": "2018-01-28T13:06:44.063Z",
      "dateEnd": "2018-01-26814:06:44.063Z",
    },
    {
      "id": "3",
      "dateStart": "2018-01-28T14:06:44.063Z",
      "dateEnd": "2018-01-28T14:36:44.063Z",
    },
    {
      "id": "4",
      "dateStart": "2018-01-28T15:00:00.063Z",
      "dateEnd": "2018-01-28T17:00:00.063Z",
    }
]

````

2) RangeDateStart and rangeDateEnd - borders dates of day. For example, in code our borders are 8 and 23 hours. Between these hours our timeSlots are located.

````
const rangeDateStart = new Date(new Date().setHours(8,0,0,0)).toISOString();
const rangeDateEnd = new Date(new Date().setHours(23,0,0,0)).toISOString();
````

3) Is spit by hour - set true if you want free time be divided by hour.
````
const isSplitByHour = true;
````

So, we send this object to function:
````
const options = {
  rangeDateStart,
  rangeDateEnd,
  timeSlots,
  isSplitByHour
}
const timeSlotsWithFreeTime = addFreeTimeBetweenRanges(options);
console.log(timeSlotsWithFreeTime);

//output array with free time elements between sended time slots

````

You can find example of using in test.js
