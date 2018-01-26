const calculateFreeTime = require('./calculateFreeTime');

function addFreeTimeBetweenRanges(params) {
  const {
    rangeDateStart,
    rangeDateEnd,
    timeSlots,
    isSplitByHour
  } = params;

  const rangeHourStart = new Date(rangeDateStart).getHours();
  const rangeHourEnd =  new Date(rangeDateEnd).getHours();

  let slotsWithFreeTime = [];
  if(!timeSlots.length) {
    const {
      totalDurationInHours,
      freeSlots
    } = calculateFreeTime(new Date(rangeDateStart), new Date(rangeDateEnd), isSplitByHour);
    slotsWithFreeTime.push({
      isFree: true,
      totalDurationInHours,
      freeSlots
    })
    return slotsWithFreeTime;
  }

  for (let i = 0; i < timeSlots.length; i++) {
    const slot = timeSlots[i];
    const slotDateStart = new Date(slot.dateStart);
    const slotDateEnd = new Date(slot.dateEnd);
    if (i === 0) {
      const dayDateStart = new Date(new Date(slot.dateStart).setHours(rangeHourStart, 0, 0));
      if (slotDateStart > dayDateStart) {
        const {
          totalDurationInHours,
          freeSlots
        } = calculateFreeTime(dayDateStart, slotDateStart, isSplitByHour);
        slotsWithFreeTime.push({
          isFree: true,
          totalDurationInHours,
          freeSlots
        })
      }
    }
    else {
      const previousSlot = timeSlots[i - 1];
      const previousDateEnd = new Date(previousSlot.dateEnd);
      if (previousDateEnd.getTime() !== slotDateStart.getTime()) {
        const {
          totalDurationInHours,
          freeSlots
        } = calculateFreeTime(previousDateEnd, slotDateStart, isSplitByHour);
        slotsWithFreeTime.push({
          isFree: true,
          totalDurationInHours,
          freeSlots
        })
      }
    }
    slot.durationInHours = (slotDateEnd - slotDateStart) / 1000 / 60 / 60;
    slotsWithFreeTime.push(slot);

    if (i === timeSlots.length - 1) {
      const dayDateEnd = new Date(new Date(slot.dateEnd).setHours(rangeHourEnd, 0, 0))
      if (slotDateEnd < dayDateEnd) {
        const {
          totalDurationInHours,
          freeSlots
        } = calculateFreeTime(slotDateEnd, dayDateEnd, isSplitByHour);
        slotsWithFreeTime.push({
          isFree: true,
          totalDurationInHours,
          freeSlots
        })
      }
    }
  }
  return slotsWithFreeTime;
}

module.exports.addFreeTimeBetweenRanges = addFreeTimeBetweenRanges;