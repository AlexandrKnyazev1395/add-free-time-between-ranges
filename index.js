const calculateFreeTime = require('./calculateFreeTime');
const sortByDate = require('./sortByDate')

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
      freeSlotsByHour
    } = calculateFreeTime(new Date(rangeDateStart), new Date(rangeDateEnd), isSplitByHour);
    slotsWithFreeTime.push({
      isFree: true,
      totalDurationInHours,
      freeSlotsByHour,
      freeSlotDateStart,
      freeSlotDateEnd,
    })
    return slotsWithFreeTime;
  }

  const sortedTimeSlots = sortByDate(timeSlots);

  for (let i = 0; i < sortedTimeSlots.length; i++) {
    const slot = sortedTimeSlots[i];
    const slotDateStart = new Date(slot.dateStart);
    const slotDateEnd = new Date(slot.dateEnd);
    if (i === 0) {
      const dayDateStart = new Date(new Date(slot.dateStart).setHours(rangeHourStart, 0, 0));
      if (slotDateStart > dayDateStart) {
        const {
          totalDurationInHours,
          freeSlotsByHour
        } = calculateFreeTime(dayDateStart, slotDateStart, isSplitByHour);
        slotsWithFreeTime.push({
          isFree: true,
          totalDurationInHours,
          freeSlotsByHour,
          freeSlotDateStart,
          freeSlotDateEnd,
        })
      }
    }
    else {
      const previousSlot = sortedTimeSlots[i - 1];
      const previousDateEnd = new Date(previousSlot.dateEnd);
      if (previousDateEnd.getTime() !== slotDateStart.getTime()) {
        const {
          totalDurationInHours,
          freeSlotsByHour
        } = calculateFreeTime(previousDateEnd, slotDateStart, isSplitByHour);
        slotsWithFreeTime.push({
          isFree: true,
          totalDurationInHours,
          freeSlotsByHour,
          freeSlotDateStart,
          freeSlotDateEnd,
        })
      }
    }
    slot.durationInHours = (slotDateEnd - slotDateStart) / 1000 / 60 / 60;
    slotsWithFreeTime.push(slot);

    if (i === sortedTimeSlots.length - 1) {
      const dayDateEnd = new Date(new Date(slot.dateEnd).setHours(rangeHourEnd, 0, 0))
      if (slotDateEnd < dayDateEnd) {
        const {
          totalDurationInHours,
          freeSlotsByHour
        } = calculateFreeTime(slotDateEnd, dayDateEnd, isSplitByHour);
        slotsWithFreeTime.push({
          isFree: true,
          totalDurationInHours,
          freeSlotsByHour,
          freeSlotDateStart,
          freeSlotDateEnd,
        })
      }
    }
  }
  return slotsWithFreeTime;
}

module.exports.addFreeTimeBetweenRanges = addFreeTimeBetweenRanges;